import urllib.request, re, json

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=KlGoz_Yl0_s',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    with urllib.request.urlopen(req) as res:
        html = res.read().decode('utf-8', errors='ignore')
        times = re.findall(r'(\d+:\d+|\d+:\d+:\d+)', html)
        print("Found timestamps:", set(times[:30]))
except Exception as e:
    print("Error:", e)
