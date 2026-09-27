import urllib.request, re, json

# Search if any comment has timestamps in the continuation or initial data
req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req) as res:
    html = res.read().decode('utf-8', errors='ignore')

# Check for comments in initialData
comment_texts = re.findall(r'"content":\{"runs":\[\{"text":"(.*?)"\}\]', html)
print(f"Found {len(comment_texts)} comment runs")
with open('comments.txt', 'w', encoding='utf-8') as f:
    for c in comment_texts:
        f.write(c + '\n')
