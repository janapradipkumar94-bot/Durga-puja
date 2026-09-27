import wave, struct, math, random, os

os.makedirs('songs', exist_ok=True)
sr = 44100

def write_wav(filename, dur, left, right):
    total_samples = int(sr * dur)
    max_amp = max(max(abs(x) for x in left[:total_samples]), max(abs(x) for x in right[:total_samples]), 0.001)
    scale_factor = 28000.0 / max_amp

    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sr)
        frames = bytearray()
        for i in range(total_samples):
            l_val = int(max(-32767, min(32767, left[i] * scale_factor)))
            r_val = int(max(-32767, min(32767, right[i] * scale_factor)))
            frames.extend(struct.pack('<hh', l_val, r_val))
        wav_file.writeframes(frames)
    print(f"Generated {filename} ({dur}s)")

# 1. "পালকিতে বউ চলে যায় হায়রে" (Palkite Bou Chole Jay - Festive Bengali Rhythm)
def gen_palki():
    dur = 52.0
    total = int(sr * dur)
    left = [0.0] * total
    right = [0.0] * total

    # Dholak / Folk rhythm (92 bpm)
    beat_samples = int(sr * (60.0 / 92.0))
    for b in range(0, total, beat_samples):
        b_idx = (b // beat_samples) % 4
        # Bass thud on 0 and 2
        if b_idx in [0, 2]:
            blen = min(int(sr * 0.35), total - b)
            for s in range(blen):
                t = s / sr
                val = math.sin(2 * math.pi * 90.0 * math.exp(-t * 9.0) * t) * math.exp(-t * 8.0) * 0.35
                left[b + s] += val * 0.5
                right[b + s] += val * 0.5
        # Snare/rim on 1 and 3 + swing
        for offset in [0, int(beat_samples * 0.5)]:
            pos = b + offset
            if pos < total:
                slen = min(int(sr * 0.12), total - pos)
                for s in range(slen):
                    t = s / sr
                    noise = (random.random() * 2.0 - 1.0) * math.exp(-t * 32.0) * 0.12
                    left[pos + s] += noise * 0.6
                    right[pos + s] += noise * 0.4

    # Melody (Catchy folk tune in C major)
    scale = {'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23, 'G': 392.00, 'A': 440.00, 'B': 493.88, 'C2': 523.25, 'D2': 587.33}
    notes = [
        ('G', 1.2), ('A', 1.0), ('G', 1.0), ('E', 1.5), ('G', 1.8), ('C2', 2.0),
        ('C2', 1.5), ('B', 1.0), ('A', 1.5), ('G', 2.5),
        ('A', 1.2), ('G', 1.0), ('F', 1.2), ('E', 1.8), ('D', 2.0), ('C', 3.0),
        ('E', 1.5), ('G', 1.5), ('A', 2.0), ('C2', 2.5), ('D2', 1.8), ('C2', 3.2),
        ('A', 1.5), ('C2', 1.5), ('G', 2.0), ('E', 2.0), ('D', 2.0), ('C', 4.0)
    ]
    cur = int(sr * 2.0)
    for n, ndur in notes:
        freq = scale[n]
        nsamp = int(sr * ndur)
        for s in range(nsamp):
            idx = cur + s
            if idx >= total: break
            t = s / sr
            vib = 1.0 + 0.012 * math.sin(2 * math.pi * 5.6 * t)
            env = min(1.0, s / (sr * 0.08)) * min(1.0, (nsamp - s) / (sr * 0.15))
            lead = (0.5 * math.sin(2 * math.pi * freq * vib * t) +
                    0.3 * math.sin(4 * math.pi * freq * vib * t) +
                    0.2 * math.sin(6 * math.pi * freq * vib * t)) * env * 0.28
            left[idx] += lead * 0.65
            right[idx] += lead * 0.35
        cur += nsamp - int(sr * 0.04)

    write_wav('songs/palkite_bou_chole_jay.wav', dur, left, right)

# 2. "ময়না শুধু বলে যাব চলে" (Moyna Shudhu Bole - Emotional Melodic Ballad)
def gen_moyna():
    dur = 50.0
    total = int(sr * dur)
    left = [0.0] * total
    right = [0.0] * total

    # Tanpura & soft ambient guitar-style arpeggios
    scale = {'D': 293.66, 'E': 329.63, 'Fs': 369.99, 'G': 392.00, 'A': 440.00, 'B': 493.88, 'Cs': 554.37, 'D2': 587.33}
    for i in range(0, total, int(sr * 0.5)):
        step = (i // int(sr * 0.5)) % 6
        chord_note = [scale['D'], scale['Fs'], scale['A'], scale['D2'], scale['A'], scale['Fs']][step]
        for s in range(min(int(sr * 1.8), total - i)):
            t = s / sr
            env = math.exp(-t * 2.8)
            val = math.sin(2 * math.pi * chord_note * t) * env * 0.15
            pan = 0.3 if step % 2 == 0 else 0.7
            left[i + s] += val * (1.0 - pan)
            right[i + s] += val * pan

    # Melodic flute phrase
    melody = [
        ('A', 1.8), ('B', 1.2), ('A', 1.5), ('Fs', 2.0), ('D', 2.5),
        ('Fs', 1.5), ('G', 1.2), ('A', 2.0), ('D2', 3.0),
        ('D2', 1.8), ('Cs', 1.5), ('B', 2.0), ('A', 2.5),
        ('G', 1.5), ('Fs', 1.8), ('E', 2.0), ('D', 3.5),
        ('Fs', 1.5), ('A', 1.5), ('B', 2.0), ('D2', 2.5), ('A', 3.5)
    ]
    cur = int(sr * 2.5)
    for n, ndur in melody:
        freq = scale[n]
        nsamp = int(sr * ndur)
        for s in range(nsamp):
            idx = cur + s
            if idx >= total: break
            t = s / sr
            vib = 1.0 + 0.015 * math.sin(2 * math.pi * 5.0 * t)
            env = min(1.0, s / (sr * 0.15)) * min(1.0, (nsamp - s) / (sr * 0.2))
            lead = (0.55 * math.sin(2 * math.pi * freq * vib * t) +
                    0.28 * math.sin(4 * math.pi * freq * vib * t) +
                    0.15 * math.sin(6 * math.pi * freq * vib * t)) * env * 0.26
            left[idx] += lead * 0.55
            right[idx] += lead * 0.45
        cur += nsamp - int(sr * 0.05)

    write_wav('songs/moyna_shudhu_bole.wav', dur, left, right)

# 3. "মহিষাসুরমর্দিনী — চণ্ডীপাঠ ও মহামায়া স্তব" (Mahalaya Invocation)
def gen_mahalaya():
    dur = 55.0
    total = int(sr * dur)
    left = [0.0] * total
    right = [0.0] * total

    # Shankha (Conch shell) blow at start and end
    for start_t in [1.5, 42.0]:
        start_samp = int(sr * start_t)
        slen = int(sr * 7.5)
        for s in range(min(slen, total - start_samp)):
            t = s / sr
            pitch = 415.0 + math.sin(t * 1.2) * 8.0 + (5.0 if t > 2.0 else 0)
            env = min(1.0, t / 1.5) * math.exp(-max(0.0, t - 4.5) * 0.8)
            val = (0.5 * math.sin(2 * math.pi * pitch * t) +
                   0.3 * math.sin(4 * math.pi * pitch * t) +
                   0.15 * math.sin(6 * math.pi * pitch * t) +
                   (random.random() * 2.0 - 1.0) * 0.06) * env * 0.30
            left[start_samp + s] += val * 0.5
            right[start_samp + s] += val * 0.5

    # Temple Bells
    for bt in [2.0, 12.0, 24.0, 36.0, 48.0]:
        b_idx = int(sr * bt)
        for s in range(min(int(sr * 4.0), total - b_idx)):
            t = s / sr
            env = math.exp(-t * 1.2)
            val = (0.4 * math.sin(2 * math.pi * 1050 * t) + 0.3 * math.sin(2 * math.pi * 2100 * t)) * env * 0.16
            left[b_idx + s] += val * 0.55
            right[b_idx + s] += val * 0.45

    # Chandi Stotra drone in Sanskrit Bhairavi (Sa - Pa - Sa low)
    for i in range(0, total, int(sr * 1.8)):
        base = 138.59 # Db2
        for s in range(min(int(sr * 4.0), total - i)):
            t = s / sr
            env = math.exp(-t * 0.8) * (1.0 - math.exp(-t * 8.0))
            val = (0.4 * math.sin(2 * math.pi * base * t) +
                   0.3 * math.sin(2 * math.pi * base * 2 * t) +
                   0.2 * math.sin(2 * math.pi * base * 3 * t)) * env * 0.22
            left[i + s] += val * 0.5
            right[i + s] += val * 0.5

    write_wav('songs/mahalaya_abahon.wav', dur, left, right)

gen_palki()
gen_moyna()
gen_mahalaya()
