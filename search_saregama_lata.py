import urllib.request, re, json, sys

sys.stdout.reconfigure(encoding='utf-8')

songs_to_find = [
    'Ja Re Ja Re Ure Ja Re Pakhi Lata Mangeshkar Saregama Bengali',
    'Aakash Pradip Jwole Lata Mangeshkar Saregama Bengali',
    'Na Mon Lage Na Lata Mangeshkar Saregama Bengali',
    'Ogo Aar Kichhu To Noy Lata Mangeshkar Saregama Bengali',
    'Saat Bhai Champa Jagore Lata Mangeshkar Saregama Bengali',
    'Aaj Noy Gungun Gunjan Prem Lata Mangeshkar Saregama Bengali',
    'O Palash O Shimul Lata Mangeshkar Saregama Bengali'
]

found = {}

for q in songs_to_find:
    url = f"https://www.youtube.com/results?search_query={q.replace(' ', '+')}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        matches = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        for vid in matches[:5]:
            if vid not in found:
                found[vid] = q
    except Exception as e:
        print(f"Error {q}: {e}")

print(f"Found {len(found)} candidate video IDs. Checking titles...")

verified = []
for vid in found.keys():
    try:
        url = f"https://www.youtube.com/watch?v={vid}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        title_m = re.search(r'<title>(.*?)</title>', html)
        title = title_m.group(1).replace(' - YouTube', '').strip() if title_m else ''
        
        len_m = re.search(r'"lengthSeconds":"(\d+)"', html)
        dur = int(len_m.group(1)) if len_m else 0

        # Check embeddable
        req_emb = urllib.request.Request(f"https://www.youtube.com/embed/{vid}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_emb) as resp_emb:
            emb_html = resp_emb.read().decode('utf-8', errors='ignore')
            embeddable = 'UNPLAYABLE' not in emb_html

        if embeddable and ('Lata' in title or 'লতা' in title or 'Saregama' in title):
            print(f"[{vid}] ({dur}s, OK): {title}")
            verified.append({'videoId': vid, 'title': title, 'duration': dur})
    except Exception as e:
        pass

with open('lata_puja_songs.json', 'w', encoding='utf-8') as f:
    json.dump(verified, f, ensure_ascii=False, indent=2)
print(f"Total verified songs: {len(verified)}")
