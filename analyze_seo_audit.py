import csv
import json
from collections import defaultdict, Counter
from urllib.parse import urlparse

# Read the CSV file
data = []
html_pages = []
redirects = {}

with open('internal_all.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)
        content_type = row.get('Content Type', '')
        status_code = row.get('Status Code', '')
        address = row.get('Address', '').strip('"')
        
        # Filter HTML pages (exclude images, CSS, etc.)
        if 'text/html' in content_type and status_code == '200':
            html_pages.append(row)
        
        # Track redirects
        if status_code == '301' or status_code == '302':
            redirect_url = row.get('Redirect URL', '').strip('"')
            if redirect_url:
                redirects[address] = redirect_url

# Analysis functions
def analyze_thin_content():
    thin_pages = []
    for page in html_pages:
        word_count = page.get('Word Count', '').strip()
        address = page.get('Address', '').strip('"')
        if word_count and word_count.isdigit():
            word_count = int(word_count)
            if word_count < 300 and word_count > 0:
                text_ratio = page.get('Text Ratio', '').strip()
                h1 = page.get('H1-1', '').strip('"')
                h2 = page.get('H2-1', '').strip('"')
                thin_pages.append({
                    'url': address,
                    'word_count': word_count,
                    'text_ratio': text_ratio,
                    'h1': h1 if h1 else 'MISSING',
                    'h2': h2 if h2 else 'MISSING',
                    'title': page.get('Title 1', '').strip('"'),
                    'meta_desc': page.get('Meta Description 1', '').strip('"')[:100]
                })
    return sorted(thin_pages, key=lambda x: x['word_count'])

def analyze_duplicates():
    titles = defaultdict(list)
    meta_descs = defaultdict(list)
    
    for page in html_pages:
        title = page.get('Title 1', '').strip('"').strip()
        meta_desc = page.get('Meta Description 1', '').strip('"').strip()
        url = page.get('Address', '').strip('"')
        
        if title:
            titles[title].append(url)
        if meta_desc:
            meta_descs[meta_desc].append(url)
    
    duplicate_titles = {k: v for k, v in titles.items() if len(v) > 1}
    duplicate_meta_descs = {k: v for k, v in meta_descs.items() if len(v) > 1}
    
    return duplicate_titles, duplicate_meta_descs

def analyze_internal_links():
    high_outlinks = []
    orphaned = []
    low_inlinks = []
    
    for page in html_pages:
        url = page.get('Address', '').strip('"')
        outlinks = page.get('Outlinks', '').strip()
        inlinks = page.get('Inlinks', '').strip()
        unique_inlinks = page.get('Unique Inlinks', '').strip()
        crawl_depth = page.get('Crawl Depth', '').strip()
        title = page.get('Title 1', '').strip('"')
        
        if outlinks and outlinks.isdigit():
            outlinks = int(outlinks)
            if outlinks > 100:
                high_outlinks.append({
                    'url': url,
                    'outlinks': outlinks,
                    'unique_outlinks': page.get('Unique Outlinks', '').strip()
                })
        
        if unique_inlinks and unique_inlinks.isdigit():
            unique_inlinks = int(unique_inlinks)
            if unique_inlinks == 0:
                orphaned.append({
                    'url': url,
                    'title': title,
                    'crawl_depth': crawl_depth
                })
            elif unique_inlinks < 3:
                low_inlinks.append({
                    'url': url,
                    'unique_inlinks': unique_inlinks,
                    'crawl_depth': crawl_depth,
                    'title': title
                })
    
    return high_outlinks, orphaned, low_inlinks

def analyze_redirects():
    redirect_chains = []
    redirect_loops = []
    temp_redirects = []
    slow_redirects = []
    
    for page in data:
        status_code = page.get('Status Code', '').strip()
        redirect_type = page.get('Redirect Type', '').strip()
        response_time = page.get('Response Time', '').strip()
        url = page.get('Address', '').strip('"')
        redirect_url = page.get('Redirect URL', '').strip('"')
        
        if status_code == '302':
            temp_redirects.append({
                'url': url,
                'redirect_url': redirect_url,
                'response_time': response_time
            })
        
        if response_time and response_time.replace('.', '').isdigit():
            rt = float(response_time)
            if rt > 0.5:
                slow_redirects.append({
                    'url': url,
                    'response_time': rt,
                    'redirect_url': redirect_url
                })
    
    # Check for redirect loops
    for url, redirect_url in redirects.items():
        if redirect_url in redirects and redirects[redirect_url] == url:
            redirect_loops.append({
                'url1': url,
                'url2': redirect_url
            })
    
    return redirect_chains, redirect_loops, temp_redirects, slow_redirects

def analyze_404s():
    not_found = []
    for page in data:
        status_code = page.get('Status Code', '').strip()
        if status_code == '404':
            not_found.append({
                'url': page.get('Address', '').strip('"'),
                'inlinks': page.get('Inlinks', '').strip()
            })
    return not_found

def analyze_meta_descriptions():
    missing = []
    too_short = []
    too_long = []
    duplicate_meta = []
    
    meta_desc_counts = Counter()
    
    for page in html_pages:
        url = page.get('Address', '').strip('"')
        meta_desc = page.get('Meta Description 1', '').strip('"').strip()
        meta_desc_length = page.get('Meta Description 1 Length', '').strip()
        title = page.get('Title 1', '').strip('"')
        
        if not meta_desc:
            missing.append({
                'url': url,
                'title': title
            })
        else:
            meta_desc_counts[meta_desc] += 1
            
            if meta_desc_length and meta_desc_length.isdigit():
                length = int(meta_desc_length)
                if length < 120:
                    too_short.append({
                        'url': url,
                        'length': length,
                        'meta_desc': meta_desc
                    })
                elif length > 160:
                    too_long.append({
                        'url': url,
                        'length': length,
                        'meta_desc': meta_desc
                    })
    
    # Find duplicates
    for meta_desc, count in meta_desc_counts.items():
        if count > 1:
            urls = [p.get('Address', '').strip('"') for p in html_pages if p.get('Meta Description 1', '').strip('"').strip() == meta_desc]
            duplicate_meta.append({
                'meta_desc': meta_desc[:150],
                'count': count,
                'urls': urls[:5]
            })
    
    return missing, too_short, too_long, duplicate_meta

# Run all analyses
print("Analyzing SEO data...")
thin_content = analyze_thin_content()
duplicate_titles, duplicate_meta_descs = analyze_duplicates()
high_outlinks, orphaned, low_inlinks = analyze_internal_links()
redirect_chains, redirect_loops, temp_redirects, slow_redirects = analyze_redirects()
not_found = analyze_404s()
missing_meta, too_short_meta, too_long_meta, duplicate_meta = analyze_meta_descriptions()

# Compile results
results = {
    'summary': {
        'total_urls': len(data),
        'html_pages': len(html_pages),
        'thin_content_pages': len(thin_content),
        'duplicate_titles': len(duplicate_titles),
        'duplicate_meta_descriptions': len(duplicate_meta_descs),
        'high_outlink_pages': len(high_outlinks),
        'orphaned_pages': len(orphaned),
        'low_inlink_pages': len(low_inlinks),
        'temp_redirects': len(temp_redirects),
        'slow_redirects': len(slow_redirects),
        '404_errors': len(not_found),
        'missing_meta_descriptions': len(missing_meta),
        'too_short_meta_descriptions': len(too_short_meta),
        'too_long_meta_descriptions': len(too_long_meta)
    },
    'thin_content': thin_content,
    'duplicate_titles': {k: v for k, v in list(duplicate_titles.items())[:10]},
    'duplicate_meta_descriptions': {k: v[:5] for k, v in list(duplicate_meta_descs.items())[:10]},
    'high_outlinks': high_outlinks,
    'orphaned_pages': orphaned,
    'low_inlinks': low_inlinks,
    'temp_redirects': temp_redirects,
    'slow_redirects': slow_redirects,
    '404_errors': not_found,
    'missing_meta_descriptions': missing_meta,
    'too_short_meta_descriptions': too_short_meta,
    'too_long_meta_descriptions': too_long_meta,
    'duplicate_meta_descriptions_list': duplicate_meta
}

# Save to JSON
with open('seo_audit_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print(f"Analysis complete!")
print(f"  - Thin content pages: {len(thin_content)}")
print(f"  - Duplicate titles: {len(duplicate_titles)}")
print(f"  - Orphaned pages: {len(orphaned)}")
print(f"  - Missing meta descriptions: {len(missing_meta)}")
print(f"  - Too long meta descriptions: {len(too_long_meta)}")
print("Results saved to seo_audit_results.json")
