import wave, struct, math, random, os

songs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'songs')
os.makedirs(songs_dir, exist_ok=True)
sr = 44100

def write_wav_file(filename, dur, left, right):
    total = int(sr * dur)
    max_amp = max(max(abs(x) for x in left[:total]), max(abs(x) for x in right[:total]), 0.001)
    scale_factor = 28000.0 / max_amp
    full_path = os.path.join(songs_dir, filename)

    with wave.open(full_path, 'w') as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(sr)
        frames = bytearray()
        for i in range(total):
            l = int(max(-32767, min(32767, left[i] * scale_factor)))
            r = int(max(-32767, min(32767, right[i] * scale_factor)))
            frames.extend(struct.pack('<hh', l, r))
        f.writeframes(frames)
    print(f"Successfully saved {full_path} ({os.path.getsize(full_path)} bytes)")

# 1. Bajlo Tomar Alor Benu (50s)
def create_bajlo():
    dur = 50.0
    tot = int(sr * dur)
    left = [0.0] * tot
    right = [0.0] * tot

    # Tanpura
    pitches = [392.00, 261.63, 261.63, 130.81]
    for i in range(0, tot, int(sr * 1.5)):
        p = pitches[(i // int(sr * 1.5)) % 4]
        for s in range(min(int(sr * 4.0), tot - i)):
            t = s / sr
            env = math.exp(-t * 0.9)
            val = (0.4 * math.sin(2 * math.pi * p * t) + 0.25 * math.sin(4 * math.pi * p * t)) * env * 0.2
            left[i + s] += val * 0.5
            right[i + s] += val * 0.5

    # Shehnai/flute melody
    notes = [
        (392.00, 2.0), (440.00, 1.5), (392.00, 1.5), (349.23, 1.5), (329.63, 2.0), (293.66, 1.5), (261.63, 3.0),
        (329.63, 1.5), (349.23, 1.5), (392.00, 2.0), (440.00, 2.0), (523.25, 2.5), (493.88, 1.5), (440.00, 1.5), (392.00, 3.0),
        (523.25, 2.0), (587.33, 1.5), (523.25, 2.0), (493.88, 1.5), (440.00, 2.0), (392.00, 2.0), (349.23, 1.5), (329.63, 2.5),
        (293.66, 1.5), (329.63, 1.5), (349.23, 1.5), (392.00, 2.0), (329.63, 2.0), (293.66, 2.0), (261.63, 4.0)
    ]
    cur = int(sr * 2.0)
    for freq, ndur in notes:
        ns = int(sr * ndur)
        for s in range(ns):
            idx = cur + s
            if idx >= tot: break
            t = s / sr
            vib = 1.0 + 0.015 * math.sin(2 * math.pi * 5.2 * t)
            env = min(1.0, s / (sr * 0.1)) * min(1.0, (ns - s) / (sr * 0.15))
            lead = (0.55 * math.sin(2 * math.pi * freq * vib * t) + 0.3 * math.sin(4 * math.pi * freq * vib * t)) * env * 0.28
            left[idx] += lead * 0.6
            right[idx] += lead * 0.4
        cur += ns - int(sr * 0.04)

    write_wav_file('bajlo_tomar_alor_benu.wav', dur, left, right)

# 2. Dhaker Taale Kasher Bone (48s)
def create_dhak():
    dur = 48.0
    tot = int(sr * dur)
    left = [0.0] * tot
    right = [0.0] * tot

    # Festive Dhaak (84 bpm)
    beat = int(sr * (60.0 / 84.0))
    for b in range(0, tot, beat):
        bidx = (b // beat) % 4
        if bidx in [0, 2]:
            for s in range(min(int(sr * 0.4), tot - b)):
                t = s / sr
                val = math.sin(2 * math.pi * 88.0 * math.exp(-t * 8.0) * t) * math.exp(-t * 7.0) * 0.35
                left[b + s] += val * 0.5
                right[b + s] += val * 0.5
        for s in range(min(int(sr * 0.15), tot - b)):
            t = s / sr
            noise = (random.random() * 2.0 - 1.0) * math.exp(-t * 30.0) * 0.14
            left[b + s] += noise * 0.6
            right[b + s] += noise * 0.4

    # Flute
    notes = [
        (293.66, 1.5), (329.63, 1.5), (369.99, 2.0), (440.00, 2.0), (493.88, 1.5), (440.00, 2.0), (369.99, 1.5), (293.66, 3.0),
        (440.00, 1.5), (493.88, 1.5), (587.33, 2.5), (587.33, 1.5), (493.88, 1.5), (440.00, 2.0), (392.00, 1.5), (369.99, 3.0),
        (369.99, 1.5), (440.00, 1.5), (493.88, 2.0), (587.33, 2.0), (659.25, 2.0), (587.33, 2.5), (493.88, 1.5), (440.00, 3.0),
        (440.00, 1.5), (392.00, 1.5), (369.99, 2.0), (329.63, 2.0), (293.66, 4.0)
    ]
    cur = int(sr * 2.5)
    for freq, ndur in notes:
        ns = int(sr * ndur)
        for s in range(ns):
            idx = cur + s
            if idx >= tot: break
            t = s / sr
            vib = 1.0 + 0.015 * math.sin(2 * math.pi * 5.5 * t)
            env = min(1.0, s / (sr * 0.1)) * min(1.0, (ns - s) / (sr * 0.15))
            lead = (0.55 * math.sin(2 * math.pi * freq * vib * t) + 0.3 * math.sin(4 * math.pi * freq * vib * t)) * env * 0.28
            left[idx] += lead * 0.6
            right[idx] += lead * 0.4
        cur += ns - int(sr * 0.04)

    write_wav_file('dhaker_taale_kasher_bone.wav', dur, left, right)

# 3. Mahalaya Abahon (55s)
def create_mahalaya():
    dur = 55.0
    tot = int(sr * dur)
    left = [0.0] * tot
    right = [0.0] * tot

    # Shankha at start & end
    for st in [1.5, 42.0]:
        samp = int(sr * st)
        slen = int(sr * 7.5)
        for s in range(min(slen, tot - samp)):
            t = s / sr
            pitch = 415.0 + math.sin(t * 1.2) * 8.0 + (5.0 if t > 2.0 else 0)
            env = min(1.0, t / 1.5) * math.exp(-max(0.0, t - 4.5) * 0.8)
            val = (0.5 * math.sin(2 * math.pi * pitch * t) +
                   0.3 * math.sin(4 * math.pi * pitch * t) +
                   (random.random() * 2.0 - 1.0) * 0.06) * env * 0.30
            left[samp + s] += val * 0.5
            right[samp + s] += val * 0.5

    # Temple Bells
    for bt in [2.0, 14.0, 26.0, 38.0, 50.0]:
        bidx = int(sr * bt)
        for s in range(min(int(sr * 4.0), tot - bidx)):
            t = s / sr
            env = math.exp(-t * 1.2)
            val = (0.4 * math.sin(2 * math.pi * 1050 * t) + 0.3 * math.sin(2 * math.pi * 2100 * t)) * env * 0.16
            left[bidx + s] += val * 0.55
            right[bidx + s] += val * 0.45

    # Sanskrit Chandi drone
    for i in range(0, tot, int(sr * 1.8)):
        base = 138.59
        for s in range(min(int(sr * 4.0), tot - i)):
            t = s / sr
            env = math.exp(-t * 0.8) * (1.0 - math.exp(-t * 8.0))
            val = (0.4 * math.sin(2 * math.pi * base * t) + 0.3 * math.sin(2 * math.pi * base * 2 * t)) * env * 0.22
            left[i + s] += val * 0.5
            right[i + s] += val * 0.5

    write_wav_file('mahalaya_abahon.wav', dur, left, right)

print("Starting generation...")
create_bajlo()
create_dhak()
create_mahalaya()
print("All complete!")
