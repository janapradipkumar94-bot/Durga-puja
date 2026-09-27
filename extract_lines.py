import urllib.request, re, json

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req) as res:
    html = res.read().decode('utf-8', errors='ignore')

# Search for any line containing digits:digits and Bengali or song names
lines = re.findall(r'(\d{1,2}:\d{2}(?::\d{2})?[^\n\r"\'<>]{1,60})', html)
with open('found_lines.txt', 'w', encoding='utf-8') as f:
    for line in lines:
        f.write(line + '\n')
print(f"Wrote {len(lines)} lines to found_lines.txt")
