import wave, struct, math, random, os

os.makedirs('songs', exist_ok=True)
sr = 44100

def create_song(filename, dur, scale_freqs, phrase_pattern, tempo_bpm=76, dhaak_style='festive'):
    total_samples = int(sr * dur)
    left = [0.0] * total_samples
    right = [0.0] * total_samples

    # 1. Tanpura drone (Sa - Pa - Sa)
    Sa = scale_freqs['Sa']
    Pa = scale_freqs['Pa']
    pitches = [Pa, Sa, Sa, Sa * 0.5]
    strum_interval = int(sr * 1.5)
    for i in range(0, total_samples, strum_interval):
        strum_idx = (i // strum_interval) % 4
        base_freq = pitches[strum_idx]
        decay_samples = min(int(sr * 4.2), total_samples - i)
        pan = 0.35 if strum_idx % 2 == 0 else 0.65
        for s in range(decay_samples):
            idx = i + s
            t = s / sr
            env = math.exp(-t * 0.9) * (1.0 - math.exp(-t * 12.0))
            val = (0.36 * math.sin(2 * math.pi * base_freq * t) +
                   0.24 * math.sin(4 * math.pi * base_freq * t) +
                   0.18 * math.sin(6 * math.pi * base_freq * t) +
                   0.12 * math.sin(8 * math.pi * base_freq * t))
            gain = val * env * 0.20
            left[idx] += gain * (1.0 - pan)
            right[idx] += gain * pan

    # 2. Dhaak & Kashi (Festive beats)
    beat_samples = int(sr * (60.0 / tempo_bpm))
    for b in range(0, total_samples, beat_samples):
        beat_in_bar = (b // beat_samples) % 4
        t_sec = b / sr
        fade = min(1.0, max(0.0, (t_sec - 2.0) / 3.0))
        if fade <= 0: continue

        # Dhaak (beats 0 and 2)
        if beat_in_bar in [0, 2]:
            dhaak_len = min(int(sr * 0.45), total_samples - b)
            freq_start = 82.0 if beat_in_bar == 0 else 94.0
            for s in range(dhaak_len):
                idx = b + s
                t = s / sr
                f = freq_start * math.exp(-t * 7.5)
                env = math.exp(-t * 6.0)
                val = math.sin(2 * math.pi * f * t) * env * 0.28 * fade
                left[idx] += val * 0.5
                right[idx] += val * 0.5

        # Kashi / bell strike (beats 1, 3 and off-beats)
        if beat_in_bar in [1, 3]:
            kashi_len = min(int(sr * 0.2), total_samples - b)
            for s in range(kashi_len):
                idx = b + s
                t = s / sr
                env = math.exp(-t * 28.0)
                val = (math.sin(2 * math.pi * 1420 * t) * 0.45 + (random.random() * 2.0 - 1.0) * 0.55) * env * 0.13 * fade
                left[idx] += val * 0.65
                right[idx] += val * 0.35

    # 3. Flute / Shehnai melody
    current_sample = int(sr * 2.5)
    for phrase in phrase_pattern:
        for note_name, note_dur in phrase:
            pitch = scale_freqs[note_name]
            note_samples = int(sr * note_dur)
            for s in range(note_samples):
                idx = current_sample + s
                if idx >= total_samples: break
                t = s / sr
                vib = 1.0 + 0.016 * math.sin(2 * math.pi * 5.4 * t)
                freq = pitch * vib
                att = min(1.0, s / (sr * 0.12))
                rel = min(1.0, (note_samples - s) / (sr * 0.16))
                env = att * rel
                val = (0.55 * math.sin(2 * math.pi * freq * t) +
                       0.30 * math.sin(4 * math.pi * freq * t) +
                       0.15 * math.sin(6 * math.pi * freq * t))
                lead = val * env * 0.27
                left[idx] += lead
                right[idx] += lead
            current_sample += note_samples - int(sr * 0.04)

    # 4. Temple brass bell
    for bt in [2.0, 16.0, 30.0, 44.0]:
        b_idx = int(sr * bt)
        if b_idx >= total_samples: continue
        bell_len = min(int(sr * 4.5), total_samples - b_idx)
        for s in range(bell_len):
            idx = b_idx + s
            t = s / sr
            env = math.exp(-t * 1.1)
            bval = (0.4 * math.sin(2 * math.pi * 880 * t) +
                    0.3 * math.sin(2 * math.pi * 1760 * t) +
                    0.2 * math.sin(2 * math.pi * 2640 * t)) * env * 0.18
            left[idx] += bval * 0.5
            right[idx] += bval * 0.5

    # 5. Normalization & Write WAV
    max_amp = max(max(abs(x) for x in left), max(abs(x) for x in right), 0.001)
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

# Generate Song 2: "বাজলো তোমার আলোর বেণু" (Bajlo Tomar Alor Benu)
scale1 = {
    'Sa': 261.63, 'Re': 293.66, 'Ga': 329.63, 'Ma': 349.23,
    'Pa': 392.00, 'Dha': 440.00, 'Ni': 493.88, 'Sa2': 523.25, 'Re2': 587.33
}
phrases_benu = [
    [('Pa', 2.0), ('Dha', 1.5), ('Pa', 1.5), ('Ma', 1.5), ('Ga', 2.0), ('Re', 1.5), ('Sa', 3.0)],
    [('Ga', 1.5), ('Ma', 1.5), ('Pa', 2.0), ('Dha', 2.0), ('Sa2', 2.5), ('Ni', 1.5), ('Dha', 1.5), ('Pa', 3.0)],
    [('Sa2', 2.0), ('Re2', 1.5), ('Sa2', 2.0), ('Ni', 1.5), ('Dha', 2.0), ('Pa', 2.0), ('Ma', 1.5), ('Ga', 2.5)],
    [('Re', 1.5), ('Ga', 1.5), ('Ma', 1.5), ('Pa', 2.0), ('Ga', 2.0), ('Re', 2.0), ('Sa', 4.0)]
]
create_song('songs/bajlo_tomar_alor_benu.wav', 50.0, scale1, phrases_benu, tempo_bpm=72)

# Generate Song 3: "ঢাকের তালে কাশের বনে — শারদ আবাহন"
scale2 = {
    'Sa': 293.66, 'Re': 329.63, 'Ga': 369.99, 'Ma': 392.00,
    'Pa': 440.00, 'Dha': 493.88, 'Ni': 554.37, 'Sa2': 587.33, 'Re2': 659.25
}
phrases_dhaak = [
    [('Sa', 1.5), ('Re', 1.5), ('Ga', 2.0), ('Pa', 2.0), ('Dha', 1.5), ('Pa', 2.0), ('Ga', 1.5), ('Sa', 3.0)],
    [('Pa', 1.5), ('Dha', 1.5), ('Sa2', 2.5), ('Sa2', 1.5), ('Dha', 1.5), ('Pa', 2.0), ('Ma', 1.5), ('Ga', 3.0)],
    [('Ga', 1.5), ('Pa', 1.5), ('Dha', 2.0), ('Sa2', 2.0), ('Re2', 2.0), ('Sa2', 2.5), ('Dha', 1.5), ('Pa', 3.0)],
    [('Pa', 1.5), ('Ma', 1.5), ('Ga', 2.0), ('Re', 2.0), ('Sa', 4.0)]
]
create_song('songs/dhaker_taale_kasher_bone.wav', 48.0, scale2, phrases_dhaak, tempo_bpm=80)
