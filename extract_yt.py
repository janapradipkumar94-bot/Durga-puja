import urllib.request, re

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    with urllib.request.urlopen(req) as res:
        html = res.read().decode('utf-8', errors='ignore')
        matches = re.findall(r'"shortDescription":"(.*?)"', html)
        if matches:
            with open('yt_desc.txt', 'w', encoding='utf-8') as f:
                f.write(matches[0])
            print("Wrote yt_desc.txt")
except Exception as e:
    print("Error:", e)
