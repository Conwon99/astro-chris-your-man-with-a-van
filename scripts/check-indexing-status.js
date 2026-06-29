const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load service account credentials
const credentialsPath = path.join(__dirname, '..', 'service-account-key.json');

if (!fs.existsSync(credentialsPath)) {
  console.error('❌ Error: service-account-key.json not found!');
  console.error('Please place your service account key file in the project root.');
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Your Search Console property URL
const siteUrl = 'https://chrisyourmanwithavan.com';

// URLs to check (you can also read from sitemap.xml)
const urlsToCheck = [
  'https://chrisyourmanwithavan.com/',
  'https://chrisyourmanwithavan.com/services',
  'https://chrisyourmanwithavan.com/locations',
  'https://chrisyourmanwithavan.com/contact',
  'https://chrisyourmanwithavan.com/locations/cumnock',
  'https://chrisyourmanwithavan.com/locations/ayr',
  'https://chrisyourmanwithavan.com/locations/kilmarnock',
  'https://chrisyourmanwithavan.com/locations/irvine',
  'https://chrisyourmanwithavan.com/locations/troon',
  'https://chrisyourmanwithavan.com/locations/prestwick',
  'https://chrisyourmanwithavan.com/locations/saltcoats',
  'https://chrisyourmanwithavan.com/locations/girvan',
  'https://chrisyourmanwithavan.com/locations/dalrymple',
  'https://chrisyourmanwithavan.com/locations/mauchline',
  'https://chrisyourmanwithavan.com/locations/kirkconnel',
  'https://chrisyourmanwithavan.com/locations/sanquhar',
  'https://chrisyourmanwithavan.com/locations/mossblown',
  'https://chrisyourmanwithavan.com/locations/ardrossan',
  'https://chrisyourmanwithavan.com/locations/auchinleck',
  'https://chrisyourmanwithavan.com/locations/beith',
  'https://chrisyourmanwithavan.com/locations/dalry',
  'https://chrisyourmanwithavan.com/locations/darvel',
  'https://chrisyourmanwithavan.com/locations/galston',
  'https://chrisyourmanwithavan.com/locations/maybole',
  'https://chrisyourmanwithavan.com/locations/newmilns',
  'https://chrisyourmanwithavan.com/locations/patna',
  'https://chrisyourmanwithavan.com/locations/dalmellington',
  'https://chrisyourmanwithavan.com/services/small-removals',
  'https://chrisyourmanwithavan.com/services/courier',
  'https://chrisyourmanwithavan.com/services/waste-removal',
  'https://chrisyourmanwithavan.com/services/collection-and-delivery',
  'https://chrisyourmanwithavan.com/services/end-of-tenancy',
  'https://chrisyourmanwithavan.com/services/flat-pack-assembly',
];

async function checkIndexingStatus() {
  try {
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient,
    });

    console.log('🔍 Checking indexing status...\n');
    console.log(`Site: ${siteUrl}\n`);

    const results = {
      indexed: [],
      notIndexed: [],
      errors: [],
    };

    // Check each URL (with delay to respect rate limits)
    for (let i = 0; i < urlsToCheck.length; i++) {
      const url = urlsToCheck[i];
      
      try {
        const response = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl,
          },
        });

        const inspectionResult = response.data.inspectionResult;
        const indexStatus = inspectionResult.indexStatusResult;

        if (indexStatus) {
          const verdict = indexStatus.verdict || 'UNKNOWN';
          const coverageState = indexStatus.coverageState || 'UNKNOWN';

          if (verdict === 'PASS' || coverageState === 'SUBMITTED_AND_INDEXED') {
            results.indexed.push(url);
            console.log(`✅ INDEXED: ${url}`);
          } else {
            results.notIndexed.push({
              url,
              verdict,
              coverageState,
              lastCrawlTime: indexStatus.lastCrawlTime,
            });
            console.log(`❌ NOT INDEXED: ${url}`);
            console.log(`   Status: ${verdict} | Coverage: ${coverageState}`);
          }
        } else {
          results.notIndexed.push({ url, reason: 'No index status available' });
          console.log(`⚠️  UNKNOWN: ${url}`);
        }

        // Rate limiting: Wait 1 second between requests
        if (i < urlsToCheck.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        results.errors.push({ url, error: error.message });
        console.error(`✗ Error checking ${url}:`, error.message);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Indexed: ${results.indexed.length}`);
    console.log(`❌ Not Indexed: ${results.notIndexed.length}`);
    console.log(`✗ Errors: ${results.errors.length}`);
    console.log(`📄 Total: ${urlsToCheck.length}`);

    if (results.notIndexed.length > 0) {
      console.log('\n📋 URLs NOT INDEXED (request indexing for these):');
      results.notIndexed.forEach((item, index) => {
        console.log(`${index + 1}. ${item.url}`);
        if (item.verdict) console.log(`   → ${item.verdict} | ${item.coverageState}`);
      });
    }

    if (results.errors.length > 0) {
      console.log('\n⚠️  ERRORS:');
      results.errors.forEach((item) => {
        console.log(`- ${item.url}: ${item.error}`);
      });
    }

    // Save results to file
    const resultsPath = path.join(__dirname, '..', 'indexing-status-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${resultsPath}`);

  } catch (error) {
    console.error('\n❌ Authentication error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure service-account-key.json is in the project root');
    console.error('2. Verify the service account email has access to Search Console');
    console.error('3. Check that the Search Console API is enabled in Google Cloud');
    process.exit(1);
  }
}

checkIndexingStatus();

