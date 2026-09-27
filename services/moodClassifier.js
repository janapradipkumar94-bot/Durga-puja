/**
 * MoodClassifier Service
 * Analyzes Bengali and English song titles, artists, categories, and tags
 * to compute comprehensive mood, tempo, energy, and suitability scores.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MoodClassifier = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Comprehensive Bengali & English Lexicon for Mood & Theme Detection
  const LEXICON = {
    devotional: [
      'পূজা', 'পুজো', 'শারদ', 'আগমনী', 'আবাহন', 'চণ্ডীপাঠ', 'মহিষাসুরমর্দিনী', 'স্তোত্র', 'স্তব',
      'মা দুর্গা', 'দুগ্গা', 'উমা', 'ভবানী', 'শ্যামাসংগীত', 'জবা', 'সাধ না মিটিলো', 'বীরেন্দ্রকৃষ্ণ',
      'শঙ্খ', 'আরতি', 'অঞ্জলি', 'সন্ধিপূজা', 'দেবী', 'দশপ্রহরণধারিণী', 'নমস্তে', 'অয়িগিরি',
      'কালিকাপ্রসাদ', 'ভক্তিময়', 'prarthana', 'puja', 'pujo', 'agomoni', 'chandi', 'stotram', 'bhakti'
    ],
    peaceful: [
      'শান্ত', 'স্নিগ্ধ', 'ভোর', 'প্রভাত', 'ধ্যান', 'নীরব', 'সুদূর', 'মেঘমালা', 'আলোক', 'বেণু',
      'রবীন্দ্রসংগীত', 'ঘুম', 'নিস্তব্ধ', 'আকাশ', 'শিশির', 'কাশফুল', 'শান্তির', 'স্নেহ', 'প্রশান্তি',
      'peaceful', 'calm', 'serene', 'spiritual', 'morning', 'soothing', 'meditative', 'soft'
    ],
    romantic: [
      'ভালোবাসা', 'প্রেম', 'রোমান্টিক', 'তুমি', 'চোখে চোখে', 'কাছে', 'প্রিয়তমা', 'মন বলছে', 'হৃদয়',
      'চাঁদ', 'জোছনা', 'মিলন', 'অনুরাগ', 'সোহাগ', 'চলার পথে', 'আধা আলো', 'রেশমি', 'সন্ধ্যাবেলায়',
      'love', 'romantic', 'chokhe', 'tumi', 'mon bolche', 'priyotama', 'sweetheart', 'darling'
    ],
    emotional: [
      'বৃষ্টি', 'মেঘলা', 'মেঘপিয়ন', 'চৈতালি', 'স্মৃতি', 'ফেলে আসা', 'হারিয়ে', 'বিরহ', 'বেদনা',
      'কষ্ট', 'অশ্রু', 'একা', 'ডাকছে পাখি', 'পাখির গান', 'বউ কথা কও', 'ছেড়ে', 'স্মৃতিচারণ',
      'sad', 'emotional', 'melancholy', 'memory', 'tears', 'rain', 'lonely', 'deep'
    ],
    energetic: [
      'ঢাক', 'কাঁসর', 'নাচ', 'কোমর', 'উৎসব', 'ধামাকা', 'আনন্দ', 'রসগোল্লা', 'ড্যান্স', 'উল্লাস',
      'বাজা', 'তালে', 'জয় দুগ্গা', 'বলো দুগ্গা', 'মাইকী', 'উৎসবের', 'কমর',
      'energetic', 'dance', 'dhak', 'festive', 'celebration', 'fast', 'baja', 'dhamaka'
    ],
    nostalgic: [
      'পুরনো', 'অতীত', 'ছোটবেলা', 'স্মৃতির', 'সপ্তমী', 'কালজয়ী', 'চিরসবুজ', 'নস্টালজিয়া', 'হারানো দিন',
      'মিতা চ্যাটার্জী', 'হেমন্ত', 'মান্না দে', 'সন্ধ্যা মুখোপাধ্যায়', 'লতা মঙ্গেশকর', 'কিশোর কুমার',
      'nostalgic', 'golden era', 'classic', 'old days', 'memories', 'retro'
    ]
  };

  // Artist Affinity Mapping
  const ARTIST_AFFINITY = {
    'বীরেন্দ্রকৃষ্ণ ভদ্র': { devotional: 98, peaceful: 95, morning: 95, lateNight: 30, energy: 60 },
    'সুপ্রীতি ঘোষ': { devotional: 95, peaceful: 92, morning: 95, energy: 45 },
    'লতা মঙ্গেশকর': { peaceful: 85, romantic: 80, nostalgic: 90, devotional: 75, energy: 45 },
    'শ্রীকান্ত আচার্য': { peaceful: 90, emotional: 92, lateNight: 95, night: 90, romantic: 85, energy: 35 },
    'মিতা চ্যাটার্জী': { morning: 85, energetic: 75, nostalgic: 85, midday: 80, energy: 65 },
    'আশা ভোঁসলে': { romantic: 92, evening: 90, night: 85, nostalgic: 85, energy: 60 },
    'কিশোর কুমার': { nostalgic: 90, romantic: 88, midday: 80, evening: 85, energy: 65 },
    'কুমার শানু': { romantic: 90, emotional: 85, evening: 85, night: 88, energy: 50 },
    'অরিজিৎ সিং': { emotional: 90, devotional: 85, evening: 85, night: 85, energy: 65 },
    'শ্রেয়া ঘোষাল': { devotional: 90, romantic: 90, energetic: 80, morning: 85, energy: 70 },
    'মোনালী ঠাকুর': { energetic: 85, morning: 85, midday: 80, romantic: 75, energy: 75 },
    'দোহার': { energetic: 88, devotional: 85, midday: 85, folk: 95, energy: 80 },
    'হেমন্ত মুখোপাধ্যায়': { devotional: 92, peaceful: 90, morning: 85, nostalgic: 95, energy: 40 },
    'মান্না দে': { peaceful: 85, nostalgic: 92, midday: 85, devotional: 80, energy: 50 },
    'স্বাগতালক্ষ্মী দাশগুপ্ত': { devotional: 98, peaceful: 95, morning: 95, energy: 45 },
    'ইমন চক্রবর্তী': { devotional: 92, energetic: 80, morning: 85, energy: 75 },
    'পণ্ডিত তুষার দত্ত': { devotional: 98, peaceful: 95, morning: 95, lateNight: 60, energy: 55 }
  };

  /**
   * Calculate text occurrence weight
   */
  function scoreKeywords(text, keywords) {
    if (!text) return 0;
    const lower = text.toLowerCase();
    let matches = 0;
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        matches++;
      }
    }
    return Math.min(100, matches * 32);
  }

  /**
   * Primary Classification Function
   * Computes normalized scores for all moods and time slots
   */
  function analyzeSong(song) {
    if (!song) return null;

    const title = song.name || song.title || '';
    const artist = song.artist || '';
    const category = song.category || song.genre || '';
    const combinedText = `${title} ${artist} ${category}`;

    // Base keyword scores
    let devScore = scoreKeywords(combinedText, LEXICON.devotional);
    let peaceScore = scoreKeywords(combinedText, LEXICON.peaceful);
    let romScore = scoreKeywords(combinedText, LEXICON.romantic);
    let emoScore = scoreKeywords(combinedText, LEXICON.emotional);
    let nrgScore = scoreKeywords(combinedText, LEXICON.energetic);
    let nosScore = scoreKeywords(combinedText, LEXICON.nostalgic);

    // Apply artist affinity boosts
    for (const [artistKey, aff] of Object.entries(ARTIST_AFFINITY)) {
      if (artist.includes(artistKey) || title.includes(artistKey)) {
        if (aff.devotional) devScore = Math.max(devScore, aff.devotional);
        if (aff.peaceful) peaceScore = Math.max(peaceScore, aff.peaceful);
        if (aff.romantic) romScore = Math.max(romScore, aff.romantic);
        if (aff.emotional) emoScore = Math.max(emoScore, aff.emotional);
        if (aff.energy) nrgScore = Math.max(nrgScore, aff.energy);
        if (aff.nostalgic) nosScore = Math.max(nosScore, aff.nostalgic);
      }
    }

    // Default fallbacks if very low
    if (devScore < 20 && (category.includes('ভক্তি') || category.includes('পূজা') || category.includes('চণ্ডী'))) {
      devScore = 85;
    }
    if (romScore < 20 && (category.includes('রোমান্টিক') || category.includes('প্রেম'))) {
      romScore = 88;
    }
    if (nrgScore < 20 && (category.includes('নাচ') || category.includes('উৎসব') || category.includes('ঢাক'))) {
      nrgScore = 85;
    }
    if (nosScore < 20 && (category.includes('ক্লাসিক') || category.includes('চিরসবুজ') || artist.includes('মিতা'))) {
      nosScore = 80;
    }

    // Derive Energy & Tempo
    let energy = Math.round((nrgScore * 0.7) + (romScore * 0.15) - (peaceScore * 0.2) + 20);
    energy = Math.max(15, Math.min(95, energy));
    const tempo = energy > 70 ? 'fast' : (energy > 40 ? 'medium' : 'slow');

    // Calculate Time Suitability Scores (0-100)
    // 1. Early Morning (4am-7am): Peaceful + Devotional
    const morningEarlyScore = Math.min(100, Math.round((devScore * 0.5) + (peaceScore * 0.5)));
    // 2. Morning (7am-11am): Fresh + Energetic + Positive + Devotional
    const morningScore = Math.min(100, Math.round((devScore * 0.35) + (nrgScore * 0.45) + (peaceScore * 0.2)));
    // 3. Midday (11am-3pm): Nostalgic + Classic + Moderate Energy
    const middayScore = Math.min(100, Math.round((nosScore * 0.5) + (romScore * 0.3) + (nrgScore * 0.2)));
    // 4. Afternoon (3pm-5:30pm): Relaxing + Emotional + Melodic
    const afternoonScore = Math.min(100, Math.round((peaceScore * 0.4) + (emoScore * 0.4) + (nosScore * 0.2)));
    // 5. Evening (5:30pm-8pm): Romantic + Warm + Modern Love
    const eveningScore = Math.min(100, Math.round((romScore * 0.65) + (emoScore * 0.2) + (nrgScore * 0.15)));
    // 6. Night (8pm-11pm): Romantic + Deep + Emotional + Classic
    const nightScore = Math.min(100, Math.round((romScore * 0.5) + (emoScore * 0.4) + (nosScore * 0.2)));
    // 7. Late Night (11pm-4am): Peaceful + Deep Melodies + Srikanta style + Slow acoustic
    const lateNightScore = Math.min(100, Math.round((peaceScore * 0.55) + (emoScore * 0.35) + ((100 - energy) * 0.2)));

    // Determine primary moods
    const moods = [];
    if (devScore >= 60) moods.push('devotional');
    if (peaceScore >= 55) moods.push('peaceful');
    if (romScore >= 60) moods.push('romantic');
    if (emoScore >= 55) moods.push('emotional');
    if (nrgScore >= 60) moods.push('energetic');
    if (nosScore >= 60) moods.push('nostalgic');
    if (moods.length === 0) moods.push('pleasant');

    // Determine suitable time slots
    const timeSuitability = [];
    if (morningEarlyScore >= 60) timeSuitability.push('earlyMorning');
    if (morningScore >= 60) timeSuitability.push('morning');
    if (middayScore >= 55) timeSuitability.push('midday');
    if (afternoonScore >= 55) timeSuitability.push('afternoon');
    if (eveningScore >= 60) timeSuitability.push('evening');
    if (nightScore >= 60) timeSuitability.push('night');
    if (lateNightScore >= 55) timeSuitability.push('lateNight');
    if (timeSuitability.length === 0) timeSuitability.push('midday', 'afternoon');

    // Language & Genre
    const language = 'Bengali';
    let genre = 'আধুনিক বাংলা গান';
    if (devScore > 75) genre = 'শারদীয় ভক্তিগীতি';
    else if (title.includes('রবীন্দ্র') || artist.includes('রবীন্দ্র') || category.includes('রবীন্দ্র')) genre = 'রবীন্দ্রসংগীত';
    else if (nrgScore > 70 && (title.includes('ঢাক') || title.includes('নাচ'))) genre = 'উৎসব ও নাচ';
    else if (romScore > 75) genre = 'রোমান্টিক বাংলা গান';
    else if (nosScore > 75) genre = 'বাংলা ক্লাসিক';
    else if (category.includes('লোক') || title.includes('লোক')) genre = 'বাংলা লোকসংগীত';

    return {
      title,
      artist,
      category,
      language,
      genre,
      mood: moods,
      energy,
      tempo,
      devotionalScore: Math.round(devScore),
      peacefulScore: Math.round(peaceScore),
      romanticScore: Math.round(romScore),
      emotionalScore: Math.round(emoScore),
      energeticScore: Math.round(nrgScore),
      nostalgicScore: Math.round(nosScore),
      earlyMorningScore: Math.round(morningEarlyScore),
      morningScore: Math.round(morningScore),
      middayScore: Math.round(middayScore),
      afternoonScore: Math.round(afternoonScore),
      eveningScore: Math.round(eveningScore),
      nightScore: Math.round(nightScore),
      lateNightScore: Math.round(lateNightScore),
      timeSuitability,
      isSmartEligible: true
    };
  }

  /**
   * Human-readable Bengali category suggestion for new uploads
   */
  function suggestCategory(songMeta) {
    if (!songMeta) return 'সাধারণ বাংলা গান';
    const primaryMood = songMeta.mood[0] || 'pleasant';
    const primarySlot = songMeta.timeSuitability[0] || 'midday';

    const slotNames = {
      earlyMorning: 'ভোরবেলা',
      morning: 'সকালবেলা',
      midday: 'দুপুরবেলা',
      afternoon: 'বিকেলবেলা',
      evening: 'সন্ধ্যাবেলা',
      night: 'রাত্রিবেলা',
      lateNight: 'গভীর রাত'
    };

    const moodNames = {
      devotional: 'শারদীয় ভক্তিমূলক',
      peaceful: 'শান্ত ও আধ্যাত্মিক',
      romantic: 'রোমান্টিক প্রেমের গান',
      emotional: 'আবেগঘন ও মেলোডি',
      energetic: 'উৎসব ও নাচের গান',
      nostalgic: 'কালজয়ী ক্লাসিক সুর',
      pleasant: 'মিষ্টি সুরের গান'
    };

    return {
      label: `${moodNames[primaryMood] || 'বাংলা গান'} (${slotNames[primarySlot] || 'সারাদিন'})`,
      genre: songMeta.genre,
      moods: songMeta.mood,
      timeSlots: songMeta.timeSuitability
    };
  }

  return {
    analyzeSong,
    suggestCategory,
    LEXICON,
    ARTIST_AFFINITY
  };
});
