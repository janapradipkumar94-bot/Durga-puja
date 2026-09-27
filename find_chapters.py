import urllib.request, re, json

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req) as res:
    html = res.read().decode('utf-8', errors='ignore')

# Look for chapter renderer or time markers
chapters = re.findall(r'(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—]?\s*([^\n\r<]{3,40})', html)
print("Chapters/Markers found:", len(chapters))
for c in chapters[:20]:
    print(c)
