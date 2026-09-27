import urllib.request, re, json

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req) as res:
    html = res.read().decode('utf-8', errors='ignore')

# Find ytInitialData
m = re.search(r'ytInitialData\s*=\s*({.*?});', html, re.DOTALL)
if m:
    data_str = m.group(1)
    # search for time markers or chapter titles
    chapters = re.findall(r'(\d+:\d+).*?([^\"]+)', data_str[:100000])
    print("Found in data_str:", len(chapters))
    with open('initial_data_sample.txt', 'w', encoding='utf-8') as f:
        # search specifically for "কথা হয়েছিল" or "ময়না"
        f.write("Matches for song names in html:\n")
        for s in ['কথা হয়েছিল', 'ময়না শুধু', 'একটু বসো', 'পালকিতে', 'বউ কথা', 'গোল্ড প্রিন্ট', 'তারে ভোলানো', 'দেশলাই', 'বন্ধ মনের', 'মাছের কাটা', 'তোল ছিন্ন', 'গৌর নিতাই']:
            pos = [m.start() for m in re.finditer(s, html)]
            f.write(f"{s}: positions {pos}\n")
            for p in pos:
                f.write(f"Context: {html[max(0, p-100):min(len(html), p+150)]}\n\n")
print("Done writing initial_data_sample.txt")
