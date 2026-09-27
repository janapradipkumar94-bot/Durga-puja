import wave, struct, math, random, os, array

os.makedirs('songs', exist_ok=True)
sr = 44100
dur = 55.0 # 55 seconds of serene music
total_samples = int(sr * dur)

left = [0.0] * total_samples
right = [0.0] * total_samples

# 1. Tanpura drone across the whole track
tanpura_pitches = [196.00, 261.63, 261.63, 130.81] # Pa, Sa, Sa, Sa_low
strum_interval = int(sr * 1.6)
for i in range(0, total_samples, strum_interval):
    strum_idx = (i // strum_interval) % 4
    base_freq = tanpura_pitches[strum_idx]
    decay_samples = min(int(sr * 4.5), total_samples - i)
    pan = 0.35 if strum_idx % 2 == 0 else 0.65
    for s in range(decay_samples):
        idx = i + s
        t = s / sr
        env = math.exp(-t * 0.85) * (1.0 - math.exp(-t * 15.0))
        val = (0.35 * math.sin(2 * math.pi * base_freq * t) +
               0.25 * math.sin(4 * math.pi * base_freq * t) +
               0.20 * math.sin(6 * math.pi * base_freq * t) +
               0.12 * math.sin(8 * math.pi * base_freq * t))
        gain = val * env * 0.22
        left[idx] += gain * (1.0 - pan)
        right[idx] += gain * pan

# 2. Traditional Dhaak Rhythm (soft, festive, slow tempo 72 bpm)
beat_samples = int(sr * (60.0 / 72.0))
for b in range(0, total_samples, beat_samples):
    beat_in_bar = (b // beat_samples) % 4
    t_sec = b / sr
    fade = min(1.0, max(0.0, (t_sec - 3.5) / 3.0))
    if fade <= 0: continue

    # Bass Dhaak hit
    if beat_in_bar in [0, 2]:
        dhaak_len = min(int(sr * 0.5), total_samples - b)
        freq_start = 85.0 if beat_in_bar == 0 else 96.0
        for s in range(dhaak_len):
            idx = b + s
            t = s / sr
            f = freq_start * math.exp(-t * 8.0)
            env = math.exp(-t * 6.5)
            val = math.sin(2 * math.pi * f * t) * env * 0.30 * fade
            left[idx] += val * 0.5
            right[idx] += val * 0.5

    # Rim stick / Kashi hit on beats 1 and 3
    if beat_in_bar in [1, 3]:
        stick_len = min(int(sr * 0.15), total_samples - b)
        for s in range(stick_len):
            idx = b + s
            t = s / sr
            env = math.exp(-t * 35.0)
            val = (math.sin(2 * math.pi * 1250 * t) * 0.4 + (random.random() * 2.0 - 1.0) * 0.6) * env * 0.12 * fade
            left[idx] += val * 0.6
            right[idx] += val * 0.4

# 3. Flute / Shehnai Melodic Line (Agomoni in Bhairav / Bilawal)
Sa = 261.63; Re = 277.18; Ga = 329.63; Ma = 349.23; Pa = 392.00; Dha = 415.30; Ni = 493.88; Sa2 = 523.25; Re2 = 554.37

melody_phrases = [
    [(Sa, 2.0), (Re, 1.0), (Ga, 2.0), (Ma, 1.5), (Pa, 2.5), (Ma, 1.0), (Ga, 1.5), (Re, 1.5), (Sa, 3.0)],
    [(Pa, 2.0), (Dha, 1.5), (Ni, 1.5), (Sa2, 3.0), (Ni, 1.0), (Dha, 1.5), (Pa, 2.5), (Ma, 1.5), (Ga, 2.0), (Re, 1.5), (Sa, 3.0)],
    [(Ma, 1.5), (Pa, 1.5), (Dha, 2.0), (Ni, 1.0), (Sa2, 2.0), (Re2, 2.0), (Sa2, 3.0), (Ni, 1.5), (Dha, 1.5), (Pa, 3.0)],
    [(Ga, 2.0), (Ma, 1.5), (Pa, 2.0), (Dha, 1.0), (Pa, 1.5), (Ma, 1.5), (Ga, 2.0), (Re, 2.0), (Sa, 4.0)]
]

current_sample = int(sr * 3.5)
for phrase in melody_phrases:
    for pitch, note_dur in phrase:
        note_samples = int(sr * note_dur)
        for s in range(note_samples):
            idx = current_sample + s
            if idx >= total_samples: break
            t = s / sr
            vib = 1.0 + 0.015 * math.sin(2 * math.pi * 5.2 * t)
            freq = pitch * vib
            att = min(1.0, s / (sr * 0.15))
            rel = min(1.0, (note_samples - s) / (sr * 0.18))
            env = att * rel
            val = (0.55 * math.sin(2 * math.pi * freq * t) +
                   0.28 * math.sin(4 * math.pi * freq * t) +
                   0.12 * math.sin(6 * math.pi * freq * t))
            lead = val * env * 0.28
            left[idx] += lead
            right[idx] += lead
        current_sample += note_samples - int(sr * 0.05)

# 4. Temple Bell resonance
bell_times = [2.5, 17.5, 32.0, 47.0]
for bt in bell_times:
    b_idx = int(sr * bt)
    bell_len = min(int(sr * 4.0), total_samples - b_idx)
    for s in range(bell_len):
        idx = b_idx + s
        t = s / sr
        env = math.exp(-t * 1.5)
        val = (0.50 * math.sin(2 * math.pi * 523.25 * t) +
               0.30 * math.sin(2 * math.pi * 659.25 * t) +
               0.20 * math.sin(2 * math.pi * 783.99 * t)) * env * 0.22
        left[idx] += val * 0.4
        right[idx] += val * 0.6

# Normalize
max_val = max(max(map(abs, left)), max(map(abs, right)), 0.001)
scaling = 30000.0 / max_val

# Fast write with array.array
raw_frames = array.array('h')
for i in range(total_samples):
    fade_out = 1.0
    if i > total_samples - int(sr * 3.0):
        fade_out = (total_samples - i) / (sr * 3.0)
    l_sample = int(left[i] * scaling * fade_out)
    r_sample = int(right[i] * scaling * fade_out)
    l_sample = max(-32768, min(32767, l_sample))
    r_sample = max(-32768, min(32767, r_sample))
    raw_frames.append(l_sample)
    raw_frames.append(r_sample)

out_file = 'songs/mita_chatterjee_mayer_agomoni.wav'
with wave.open(out_file, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sr)
    wf.writeframes(raw_frames.tobytes())

print(f'Done! Created {out_file}, size: {os.path.getsize(out_file)} bytes')
