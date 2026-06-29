import type { APIRoute } from 'astro';

// In-memory cache for reviews
interface CachedReviews {
  reviews: any[];
  timestamp: number;
}

let reviewsCache: CachedReviews | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Extract business information from Google Maps URL
 * Supports both regular Maps URLs and share links with kgmid parameter
 */
function extractBusinessInfoFromUrl(url: string): { name: string; location?: string } {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    
    // Extract business name from 'q' parameter or URL path
    let name = params.get('q') || '';
    
    // If no 'q' parameter, try to extract from path
    if (!name && urlObj.pathname.includes('/place/')) {
      const pathMatch = urlObj.pathname.match(/\/place\/([^/]+)/);
      if (pathMatch) {
        name = decodeURIComponent(pathMatch[1].replace(/\+/g, ' '));
      }
    }
    
    // Extract kgmid if present (Knowledge Graph ID)
    const kgmid = params.get('kgmid');
    
    // If we have a kgmid but no name or name is too generic, use default business name
    // Generic names like "Chris" or single words are not specific enough
    if (kgmid && (!name || name.length < 10 || name.split(' ').length < 2)) {
      name = 'Chris Your Man with a Van';
    }
    
    // Extract location from URL - 'hl' parameter is language code, not location
    // For the URL provided, location is implicitly Cumnock
    const location = 'Cumnock';
    
    return {
      name: name || 'Chris Your Man with a Van',
      location: location
    };
  } catch (error) {
    // Fallback to default
    return {
      name: 'Chris Your Man with a Van',
      location: 'Cumnock'
    };
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check cache first
    if (reviewsCache && Date.now() - reviewsCache.timestamp < CACHE_DURATION) {
      return new Response(JSON.stringify({
        success: true,
        reviews: reviewsCache.reviews,
        cached: true
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // 1 hour client cache
        }
      });
    }

    const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
    let placeId = import.meta.env.GOOGLE_PLACE_ID;
    const mapsUrl = import.meta.env.GOOGLE_MAPS_URL;

    console.log('API Configuration:', {
      hasApiKey: !!apiKey,
      hasPlaceId: !!placeId,
      hasMapsUrl: !!mapsUrl,
      mapsUrl: mapsUrl ? mapsUrl.substring(0, 50) + '...' : null
    });

    if (!apiKey) {
      console.error('GOOGLE_PLACES_API_KEY is not set');
      return new Response(JSON.stringify({
        success: false,
        error: 'API key not configured',
        reviews: []
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If Place ID is not set, try to get it from Google Maps URL or text search
    if (!placeId) {
      let searchQuery = 'Chris Your Man with a Van Cumnock';
      
      // If Google Maps URL is provided, extract business info from it
      if (mapsUrl) {
        const businessInfo = extractBusinessInfoFromUrl(mapsUrl);
        if (businessInfo.location) {
          searchQuery = `${businessInfo.name} ${businessInfo.location}`;
        } else {
          searchQuery = `${businessInfo.name} Cumnock`;
        }
      }
      
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`;
      
      try {
        const searchResponse = await fetch(searchUrl);
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          
          // Check for API errors
          if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
            console.error('Places API search error:', searchData.status, searchData.error_message);
            throw new Error(`Places API search error: ${searchData.status} - ${searchData.error_message || 'Unknown error'}`);
          }
          
          if (searchData.results && searchData.results.length > 0) {
            placeId = searchData.results[0].place_id;
            console.log('Found Place ID:', placeId, 'for query:', searchQuery);
          } else {
            console.warn('No results found for search query:', searchQuery);
          }
        } else {
          console.error('Places API search HTTP error:', searchResponse.status, searchResponse.statusText);
        }
      } catch (searchError: any) {
        console.error('Error during Places API search:', searchError);
        // Continue to throw error if we can't find place ID
      }
    }

    if (!placeId) {
      throw new Error('Place ID not found. Please check your GOOGLE_MAPS_URL or set GOOGLE_PLACE_ID environment variable.');
    }

    // Fetch reviews from Google Places API using Place Details
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`;
    
    const response = await fetch(placeDetailsUrl);
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Format reviews from Google Places API
    const formattedReviews = (data.result?.reviews || []).map((review: any) => ({
      name: review.author_name || 'Anonymous',
      rating: review.rating || 5,
      text: review.text || '',
      time: review.time || Date.now(),
      relativeTimeDescription: review.relative_time_description || '',
      profilePhotoUrl: review.profile_photo_url || null
    }));

    // Update cache
    reviewsCache = {
      reviews: formattedReviews,
      timestamp: Date.now()
    };

    return new Response(JSON.stringify({
      success: true,
      reviews: formattedReviews,
      cached: false,
      totalRating: data.result?.rating,
      totalReviews: data.result?.user_ratings_total
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // 1 hour client cache
      }
    });

  } catch (error: any) {
    console.error('Error fetching Google reviews:', error);
    
    // Return empty reviews on error (component will fallback to static reviews)
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to fetch reviews',
      reviews: []
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

