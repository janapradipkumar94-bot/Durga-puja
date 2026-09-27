/**
 * Durga Puja Music Player - Single Songs & Raju Mistri Playlist Architecture
 * Built-in Library with Every Single Song Listed Individually
 * Zero-Touch Auto-Play, Floating Glassmorphism Player Pill, Live 3-Bar Equalizer
 * Queue Drawer & Full HTML5 Audio + YouTube Integration
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Core Audio & Player Elements
  const audio = document.getElementById('mainAudioElement');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIconWrap = document.getElementById('playIconWrap');
  const playBtnCaption = document.getElementById('playBtnCaption');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const repeatBtn = document.getElementById('repeatBtn');
  const repeatLabel = document.getElementById('repeatLabel');
  
  // Center Card Scrubber & Time
  const seekBar = document.getElementById('seekBar');
  const seekFill = document.getElementById('seekFill');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');
  const totalDurationDisplay = document.getElementById('totalDurationDisplay');
  
  // Volume Controls
  const volumeBar = document.getElementById('volumeBar');
  const volumeFill = document.getElementById('volumeFill');
  const volumePercent = document.getElementById('volumePercent');
  const muteToggleBtn = document.getElementById('muteToggleBtn');
  const volIcon = document.getElementById('volIcon');
  
  // Center Card Track Meta & Visuals
  const currentTrackTitle = document.getElementById('currentTrackTitle');
  const currentTrackMeta = document.getElementById('currentTrackMeta');
  const trackSourceBadge = document.getElementById('trackSourceBadge');
  const playbackStatusDot = document.getElementById('playbackStatusDot');
  const playbackStatusLabel = document.getElementById('playbackStatusLabel');
  const vinylDisc = document.getElementById('vinylDisc');
  const musicWaveBars = document.getElementById('musicWaveBars');
  
  // Add Song Buttons & Inputs
  const addSongsBtn = document.getElementById('addSongsBtn');
  const addMitaSongBtn = document.getElementById('addMitaSongBtn');
  const addMitaYtBtn = document.getElementById('addMitaYtBtn');
  const toggleVideoBtn = document.getElementById('toggleVideoBtn');
  const ytPlayerContainer = document.getElementById('ytPlayerContainer');
  const audioFileInput = document.getElementById('audioFileInput');
  const dropZone = document.getElementById('dropZone');
  const playlistContainer = document.getElementById('playlistContainer');
  const emptyPlaylistMsg = document.getElementById('emptyPlaylistMsg');
  const playlistCount = document.getElementById('playlistCount');
  const clearPlaylistBtn = document.getElementById('clearPlaylistBtn');

  // Floating Player Pill & Queue Drawer (Raju Mistri System Elements)
  const musicPlayerPill = document.getElementById('musicPlayerPill');
  const pillArtWrapper = document.getElementById('pillArtWrapper');
  const pillArtIcon = document.getElementById('pillArtIcon');
  const pillEqualizer = document.getElementById('pillEqualizer');
  const pillTrackTitle = document.getElementById('pillTrackTitle');
  const pillArtistName = document.getElementById('pillArtistName');
  const pillProgressSlider = document.getElementById('pillProgressSlider');
  const pillProgressFill = document.getElementById('pillProgressFill');
  const pillProgressThumb = document.getElementById('pillProgressThumb');
  const pillCurrentTime = document.getElementById('pillCurrentTime');
  const pillTotalDuration = document.getElementById('pillTotalDuration');
  const pillPrevBtn = document.getElementById('pillPrevBtn');
  const pillPlayBtn = document.getElementById('pillPlayBtn');
  const pillPlayIcon = document.getElementById('pillPlayIcon');
  const pillNextBtn = document.getElementById('pillNextBtn');
  const pillQueueBtn = document.getElementById('pillQueueBtn');
  const playlistDrawer = document.getElementById('playlistDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerCount = document.getElementById('drawerCount');
  const drawerTrackList = document.getElementById('drawerTrackList');
  const autoplayPrompt = document.getElementById('autoplayPrompt');
  const touchStartBtn = document.getElementById('touchStartBtn');

  // Interactive Tools & Extras
  const toastMessage = document.getElementById('toastMessage');
  const shankhaBtn = document.getElementById('shankhaBtn');
  const ambientToggleBtn = document.getElementById('ambientToggleBtn');
  const playDemoChantBtn = document.getElementById('playDemoChantBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');

  // ==========================================
  // Preloaded Built-in Song Library (Every Single Song Listed Individually)
  // Ready to play immediately without user uploads
  // ==========================================
  const PRESET_SONGS = [
    // --- 1. Mita Chatterjee - Palki Te Bou Chole Jai (Official Video Song XDO1lj8y7wg) & Atlantis Hits ---
    {
      id: 'mita-yt-palki-official',
      name: 'পালকিতে বউ চলে যায় — মিতা চ্যাটার্জী (অফিসিয়াল ভিডিও)',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'XDO1lj8y7wg',
      localFallbackUrl: 'songs/palkite_bou_chole_jay.wav',
      startTime: 0,
      duration: 297,
      icon: '👰',
      category: 'অফিসিয়াল ভিডিও গান',
      isPreset: true
    },
    {
      id: 'mita-yt-gold-shari',
      name: 'গোল্ড প্রিন্টের শাড়ি — মিতা চ্যাটার্জী (পালকিতে বউ চলে যায় অ্যালবাম)',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'xXO4farvRHg',
      startTime: 0,
      duration: 315,
      icon: '🥻',
      category: 'জনপ্রিয় গান',
      isPreset: true
    },
    {
      id: 'mita-yt-dakhina-samiran',
      name: 'দখিনা সমীরণে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'Q8olZDxEn9A',
      startTime: 0,
      duration: 295,
      icon: '🍃',
      category: 'মায়াবী সুর',
      isPreset: true
    },
    {
      id: 'mita-yt-mon-bolchhe',
      name: 'মন বলছে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'se4ZO4S6k_k',
      startTime: 0,
      duration: 285,
      icon: '💖',
      category: 'রোমান্টিক গান',
      isPreset: true
    },
    {
      id: 'mita-yt-tumi-asbe',
      name: 'তুমি আসবে বলে — মিতা চ্যাটার্জী (ভিডিও গান)',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'fiHymkWArCs',
      startTime: 0,
      duration: 310,
      icon: '🌷',
      category: 'ভিডিও গান',
      isPreset: true
    },
    {
      id: 'mita-yt-emon-madhur',
      name: 'এমন মধুর সন্ধ্যায় — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 't2fK09YTLs8',
      startTime: 0,
      duration: 275,
      icon: '🌙',
      category: 'মধুর সুর',
      isPreset: true
    },
    {
      id: 'mita-yt-alo-r-alo',
      name: 'আলো আর আলো দিয়ে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'Nes0JzRCDPA',
      startTime: 0,
      duration: 290,
      icon: '✨',
      category: 'অমর প্রেমের গান',
      isPreset: true
    },
    {
      id: 'mita-yt-bandhuya',
      name: 'বন্ধুরে (Bandhuya) — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'jiA5FsrwjSY',
      startTime: 0,
      duration: 305,
      icon: '🎶',
      category: 'সুপারহিট গান',
      isPreset: true
    },

    // --- 2. Classic Mita Chatterjee Evergreen Single Songs ---
    {
      id: 'mita-yt-katha',
      name: 'কথা হয়েছিল তবু কথা হল না — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 0,
      duration: 315,
      icon: '💬',
      category: 'অমর প্রেমের গান',
      isPreset: true
    },
    {
      id: 'mita-yt-moyna',
      name: 'ময়না শুধু বলে যাব চলে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      localFallbackUrl: 'songs/moyna_shudhu_bole.wav',
      startTime: 315,
      duration: 330,
      icon: '🕊️',
      category: 'জনপ্রিয় গান',
      isPreset: true
    },
    {
      id: 'mita-yt-ektu-boso',
      name: 'একটু বসো চলে যেওনা চলে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 645,
      duration: 325,
      icon: '🌷',
      category: 'মায়াবী সুর',
      isPreset: true
    },
    {
      id: 'mita-yt-bou-katha',
      name: 'বউ কথা কও ডাকছে পাখি — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 1295,
      duration: 325,
      icon: '🐦',
      category: 'পল্লী সুরের গান',
      isPreset: true
    },
    {
      id: 'mita-yt-tare-bholano',
      name: 'তারে ভোলানো গেলো না কিছুতে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 1940,
      duration: 325,
      icon: '🌹',
      category: 'মিষ্টি সুর',
      isPreset: true
    },
    {
      id: 'mita-yt-deshlai',
      name: 'একটা দেশলাই কাঠি জ্বালাও — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 2265,
      duration: 325,
      icon: '🔥',
      category: 'সুপারহিট একক গান',
      isPreset: true
    },
    {
      id: 'mita-yt-bondho-moner',
      name: 'বন্ধ মনের দুয়ার দিয়েছি খুলে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 2590,
      duration: 320,
      icon: '🚪',
      category: 'অনুভূতির গান',
      isPreset: true
    },
    {
      id: 'mita-yt-macher-kanta',
      name: 'মাছের কাটা খোপার কাটা কাটা — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 2910,
      duration: 320,
      icon: '🐟',
      category: 'লোক আঙ্গিকের গান',
      isPreset: true
    },
    {
      id: 'mita-yt-chhinna-beena',
      name: 'তোল ছিন্ন বীণা বাঁধো নতুন — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 3230,
      duration: 325,
      icon: '🪕',
      category: 'ভক্তি ও প্রার্থনার গান',
      isPreset: true
    },
    {
      id: 'mita-yt-gour-nitai',
      name: 'আছে গৌর নিতাই নদীয়াতে — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'KlGoz_Yl0_s',
      startTime: 3555,
      duration: 409,
      icon: '📿',
      category: 'ভক্তিগীতি',
      isPreset: true
    },

    // --- 3. Timeless Durga Puja Classics ---
    {
      id: 'mahalaya-abahon-birendra',
      name: 'মহিষাসুরমর্দিনী — বীরেন্দ্রকৃষ্ণ ভদ্র (পবিত্র চণ্ডীপাঠ ও আবাহন)',
      artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র (Birendra Krishna Bhadra)',
      isYoutube: true,
      videoId: 'YQyo8QeoYhc',
      localFallbackUrl: 'songs/mahalaya_abahon.wav',
      startTime: 0,
      duration: 5350,
      icon: '🔱',
      category: 'মহালয়া স্তব',
      isPreset: true
    },
    {
      id: 'bajlo-tomar-alor-benu',
      name: 'বাজলো তোমার আলোর বেণু — সুপ্রীতি ঘোষ',
      artist: 'সুপ্রীতি ঘোষ ও পঙ্কজ মল্লিক',
      isYoutube: true,
      videoId: '-Tmi0fPDf7s',
      localFallbackUrl: 'songs/bajlo_tomar_alor_benu.wav',
      startTime: 0,
      duration: 200,
      icon: '🪈',
      category: 'মহালয়া প্রভাতী সুর',
      isPreset: true
    },
    {
      id: 'dhaker-taale-kasher-bone',
      name: 'ঢাকের তালে কোমর দোলে — দেব ও শুভশ্রী (শারদ উৎসব)',
      artist: 'অভিজিৎ ভট্টাচার্য ও জিৎ গাঙ্গুলী',
      isYoutube: true,
      videoId: 'hbXuXt7gkFY',
      localFallbackUrl: 'songs/dhaker_taale_kasher_bone.wav',
      startTime: 0,
      duration: 250,
      icon: '🥁',
      category: 'উৎসবের ঢাক',
      isPreset: true
    },
    {
      id: 'online-agomoni-aalo',
      name: 'ওগো আমার আগমনী আলো — জয়তী চক্রবর্তী',
      artist: 'জয়তী চক্রবর্তী (Jayati Chakraborty)',
      isYoutube: true,
      videoId: 'bvij2HdGgv4',
      startTime: 0,
      duration: 275,
      icon: '🌸',
      category: 'আধুনিক আগমনী',
      isPreset: true
    },

    // --- 4. Timeless Puja Special Songs by Lata Mangeshkar (লতা মঙ্গেশকরের অমর পূজাগীতি) ---
    {
      id: 'lata-yt-oi-gacher-patai',
      name: 'ওই গাছের পাতায় রোদের ঝিকিমিকি — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও হেমন্ত মুখোপাধ্যায়',
      isYoutube: true,
      videoId: '1Ueysl9650U',
      startTime: 0,
      duration: 230,
      icon: '🍂',
      category: 'শরতের পুজো গান',
      isPreset: true
    },
    {
      id: 'lata-yt-ja-re-ja',
      name: 'যা রে যা রে উড়ে যা রে পাখি — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সলিল চৌধুরী',
      isYoutube: true,
      videoId: 'tOieYPnkalA',
      startTime: 0,
      duration: 200,
      icon: '🕊️',
      category: 'চিরসবুজ পুজো গান',
      isPreset: true
    },
    {
      id: 'lata-yt-akash-pradip',
      name: 'আকাশ প্রদীপ জ্বলে — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সতীনাথ মুখোপাধ্যায়',
      isYoutube: true,
      videoId: 'r_2z1ExB7Gg',
      startTime: 0,
      duration: 205,
      icon: '🪔',
      category: 'শারদ সন্ধ্যার গান',
      isPreset: true
    },
    {
      id: 'lata-yt-na-mon-lage',
      name: 'না মন লাগে না — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সলিল চৌধুরী',
      isYoutube: true,
      videoId: 'BNQVe70noWk',
      startTime: 0,
      duration: 215,
      icon: '🌸',
      category: 'অমর শারদ সুর',
      isPreset: true
    },
    {
      id: 'lata-yt-ogo-aar-kichhu',
      name: 'ওগো আর কিছু তো নয় — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সলিল চৌধুরী',
      isYoutube: true,
      videoId: 'P0efUdE58tE',
      startTime: 0,
      duration: 210,
      icon: '🌺',
      category: 'কালজয়ী পুজো সুর',
      isPreset: true
    },
    {
      id: 'lata-yt-saat-bhai-champa',
      name: 'সাত ভাই চম্পা জাগোরে — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সলিল চৌধুরী',
      isYoutube: true,
      videoId: 'smXMhhrfAy0',
      startTime: 0,
      duration: 215,
      icon: '🌼',
      category: 'ভোরের আগমনী সুর',
      isPreset: true
    },
    {
      id: 'lata-yt-aaj-noy-gungun',
      name: 'আজ নয় গুনগুন গুঞ্জন প্রেম — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর ও সলিল চৌধুরী',
      isYoutube: true,
      videoId: 'Tdhz8KbNOrw',
      startTime: 0,
      duration: 220,
      icon: '🎶',
      category: 'উৎসবের গান',
      isPreset: true
    },
    {
      id: 'lata-yt-palash-shimul',
      name: 'ও পলাশ ও শিমুল — লতা মঙ্গেশকর',
      artist: 'লতা মঙ্গেশকর',
      isYoutube: true,
      videoId: 'jdkIyPXhFmc',
      startTime: 0,
      duration: 205,
      icon: '🍁',
      category: 'শারদীয় গান',
      isPreset: true
    },

    // --- 5. Srikanta Acharya Spotify Popular Songs (শ্রীকান্ত আচার্যের সেরা গান) ---
    {
      id: 'srikanta-yt-KJTzTqSPHVc',
      name: 'বৃষ্টি তোমাকে দিলাম — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'KJTzTqSPHVc',
      startTime: 0,
      duration: 250,
      icon: '🌧️',
      category: 'আধুনিক অমর গান',
      isPreset: true
    },
    {
      id: 'srikanta-yt-oAmQ5XIE2RI',
      name: 'আমি খোলা জানালা তুমি — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'oAmQ5XIE2RI',
      startTime: 0,
      duration: 250,
      icon: '🪟',
      category: 'মায়াবী রোমান্টিক সুর',
      isPreset: true
    },
    {
      id: 'srikanta-yt-z9yP6z_pwb8',
      name: 'এক ঝাঁক পাখি — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'z9yP6z_pwb8',
      startTime: 0,
      duration: 250,
      icon: '🕊️',
      category: 'হৃদয়স্পর্শী গান',
      isPreset: true
    },
    {
      id: 'srikanta-yt-7SKm1t2iZcI',
      name: 'মেঘপিয়নের ব্যাগের ভেতর — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: '7SKm1t2iZcI',
      startTime: 0,
      duration: 250,
      icon: '✉️',
      category: 'তিতলি চলচ্চিত্রের গান',
      isPreset: true
    },
    {
      id: 'srikanta-yt-_mhRjySl484',
      name: 'চৈতালি বেলা শেষে — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: '_mhRjySl484',
      startTime: 0,
      duration: 250,
      icon: '🌅',
      category: 'শান্ত সন্ধ্যার সুর',
      isPreset: true
    },
    {
      id: 'srikanta-yt-R_nSCJwoI0A',
      name: 'আমার সারাটা দিন মেঘলা আকাশ — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'R_nSCJwoI0A',
      startTime: 0,
      duration: 250,
      icon: '☁️',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'srikanta-yt-WjfZEMFFYEM',
      name: 'যখন পড়বে না মোর পায়ের চিহ্ন — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'WjfZEMFFYEM',
      startTime: 0,
      duration: 250,
      icon: '🍂',
      category: 'রবীন্দ্রসংগীত',
      isPreset: true
    },
    {
      id: 'sp-yt-id5_3dKvEBg',
      name: 'ঢাক বাজা কাঁসর বাজা — শ্রেয়া ঘোষাল ও জিৎ গাঙ্গুলী',
      artist: 'শ্রেয়া ঘোষাল ও জিৎ গাঙ্গুলী (Shreya Ghoshal & Jeet Gannguli)',
      isYoutube: true,
      videoId: 'id5_3dKvEBg',
      startTime: 0,
      duration: 265,
      icon: '🥁',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-xlElO06nQy8',
      name: 'দুগ্গা এলো — মোনালী ঠাকুর',
      artist: 'মোনালী ঠাকুর (Monali Thakur)',
      isYoutube: true,
      videoId: 'xlElO06nQy8',
      startTime: 0,
      duration: 146,
      icon: '🌸',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-CHM3FZwAH0o',
      name: 'আইলো উমা বাড়িতে — অন্তরা নন্দী ও মনামী ঘোষ',
      artist: 'অন্তরা নন্দী ও মনামী ঘোষ (Antara Nandy & Monami Ghosh)',
      isYoutube: true,
      videoId: 'CHM3FZwAH0o',
      startTime: 0,
      duration: 232,
      icon: '💃',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-XyatKcoBrPw',
      name: 'বলো দুগ্গা এলো — সুনিধি চৌহান ও কৌশিক-গুড্ডু',
      artist: 'সুনিধি চৌহান (Sunidhi Chauhan)',
      isYoutube: true,
      videoId: 'XyatKcoBrPw',
      startTime: 0,
      duration: 199,
      icon: '🪔',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-ml81ICj5wr4',
      name: 'আমার দুগ্গা — মোনালী ঠাকুর',
      artist: 'মোনালী ঠাকুর (Monali Thakur)',
      isYoutube: true,
      videoId: 'ml81ICj5wr4',
      startTime: 0,
      duration: 199,
      icon: '🌼',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-sPuZ0Q3KDWo',
      name: 'দুগ্গা মা — অরিজিৎ সিং',
      artist: 'অরিজিৎ সিং (Arijit Singh)',
      isYoutube: true,
      videoId: 'sPuZ0Q3KDWo',
      startTime: 0,
      duration: 270,
      icon: '🔱',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-IISWE2RiDBU',
      name: 'বাজলো তোমার আলোর বেণু — দেবলীনা নন্দী',
      artist: 'দেবলীনা নন্দী (Debolinaa Nandy)',
      isYoutube: true,
      videoId: 'IISWE2RiDBU',
      startTime: 0,
      duration: 315,
      icon: '🪈',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-NAUA2LM9hZc',
      name: 'এলো যে মা — অভিজিৎ ভট্টাচার্য ও শ্রেয়া ঘোষাল',
      artist: 'অভিজিৎ ও শ্রেয়া ঘোষাল (Abhijeet & Shreya Ghoshal)',
      isYoutube: true,
      videoId: 'NAUA2LM9hZc',
      startTime: 0,
      duration: 307,
      icon: '🌺',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-rW4LMaA58P0',
      name: 'দুগ্গা এলো মা — রাহুল দত্ত ও অঙ্কিতা ভট্টাচার্য',
      artist: 'রাহুল দত্ত ও অঙ্কিতা ভট্টাচার্য (Rahul Dutta & Ankita Bhattacharyya)',
      isYoutube: true,
      videoId: 'rW4LMaA58P0',
      startTime: 0,
      duration: 262,
      icon: '🪷',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-FpM4yZfktnM',
      name: 'দুগ্গা মা আসছে — ইনফ্রা',
      artist: 'ইনফ্রা (Infra)',
      isYoutube: true,
      videoId: 'FpM4yZfktnM',
      startTime: 0,
      duration: 213,
      icon: '🌸',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-EZbQ-uaDbw4',
      name: 'একবার নাচো মা — দোহার ও কালিকাপ্রসাদ',
      artist: 'দোহার ও কালিকাপ্রসাদ (Dohar & Kalikaprasad)',
      isYoutube: true,
      videoId: 'EZbQ-uaDbw4',
      startTime: 0,
      duration: 333,
      icon: '🪕',
      category: 'লোকসংগীত ও পূজা',
      isPreset: true
    },
    {
      id: 'sp-yt-_N4JyMuZHws',
      name: 'দুগ্গা মা এসেছে — অন্তরা মিত্র ও ইন্দ্রদীপ দাশগুপ্ত',
      artist: 'অন্তরা মিত্র (Antara Mitra)',
      isYoutube: true,
      videoId: '_N4JyMuZHws',
      startTime: 0,
      duration: 215,
      icon: '✨',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-8Pz1G2CNmI8',
      name: 'দুগ্গা মায়ের জয় — অন্তরা মিত্র ও কৃষ্ণেন্দু রাজ',
      artist: 'অন্তরা মিত্র ও কৃষ্ণেন্দু রাজ (Antara Mitra)',
      isYoutube: true,
      videoId: '8Pz1G2CNmI8',
      startTime: 0,
      duration: 181,
      icon: '🔱',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-cAD7KutMTJw',
      name: 'বলো বলো দুগ্গা এলো — প্রমা দে',
      artist: 'প্রমা দে (Prama Dey)',
      isYoutube: true,
      videoId: 'cAD7KutMTJw',
      startTime: 0,
      duration: 232,
      icon: '🪔',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-xUMhpMmwAmM',
      name: 'ও মেনকা ও মেনকা — নন্দী সিস্টার্স (অন্তরা ও অঙ্কিতা)',
      artist: 'নন্দী সিস্টার্স (Antara & Ankita Nandy)',
      isYoutube: true,
      videoId: 'xUMhpMmwAmM',
      startTime: 0,
      duration: 195,
      icon: '🎶',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-hnkfDCbULxk',
      name: 'উমা আসে নতুন সাজে — অঙ্কিতা ভট্টাচার্য',
      artist: 'অঙ্কিতা ভট্টাচার্য (Ankita Bhattacharyya)',
      isYoutube: true,
      videoId: 'hnkfDCbULxk',
      startTime: 0,
      duration: 185,
      icon: '🌸',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-ExBSmXntUk0',
      name: 'জয় জয় দুর্গা মা — অভিজিৎ, জিৎ ও শান',
      artist: 'অভিজিৎ ভট্টাচার্য, জিৎ গাঙ্গুলী ও শান',
      isYoutube: true,
      videoId: 'ExBSmXntUk0',
      startTime: 0,
      duration: 208,
      icon: '🌺',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-qKP3ZKHDQuQ',
      name: 'দুগ্গা মা এলো ঘরে — দিলাসা চৌধুরী',
      artist: 'দিলাসা চৌধুরী (Dilasa Chowdhury)',
      isYoutube: true,
      videoId: 'qKP3ZKHDQuQ',
      startTime: 0,
      duration: 221,
      icon: '🌼',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-sfsgZfGEaHs',
      name: 'বলো দুগ্গা মা — দুর্নিবার সাহা ও শাশ্বতী ভট্টাচার্য',
      artist: 'দুর্নিবার সাহা ও শাশ্বতী ভট্টাচার্য',
      isYoutube: true,
      videoId: 'sfsgZfGEaHs',
      startTime: 0,
      duration: 277,
      icon: '🪔',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-_XrqelGDpUE',
      name: 'জয় দুগ্গা ঠাকুর — কেশব দে',
      artist: 'কেশব দে (Keshab Dey)',
      isYoutube: true,
      videoId: '_XrqelGDpUE',
      startTime: 0,
      duration: 222,
      icon: '🔱',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-CgkM9DWQZAs',
      name: 'অয়িগিরি নন্দিনী — নিশান সাহা (মহিষাসুরমর্দিনী স্তোত্রম)',
      artist: 'নিশান সাহা (Nishan Saha)',
      isYoutube: true,
      videoId: 'CgkM9DWQZAs',
      startTime: 0,
      duration: 297,
      icon: '🕉️',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt--6_X_R_mSa4',
      name: 'গৌরী এলো — জয় শংকর',
      artist: 'জয় শংকর (Joy Sankar)',
      isYoutube: true,
      videoId: '-6_X_R_mSa4',
      startTime: 0,
      duration: 341,
      icon: '🌸',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-JSLiAl8XImE',
      name: 'এলো রে এলো দুর্গা মা — রণবীর রায়',
      artist: 'রণবীর রায় (Ranvir Roy)',
      isYoutube: true,
      videoId: 'JSLiAl8XImE',
      startTime: 0,
      duration: 325,
      icon: '🪔',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-2d_d4Vr2iRk',
      name: 'দুগ্গা এলো আজ — পৌষালী সাহু ও শমিক গুহ রায়',
      artist: 'পৌষালী সাহু (Paushali Sahu)',
      isYoutube: true,
      videoId: '2d_d4Vr2iRk',
      startTime: 0,
      duration: 194,
      icon: '🌼',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-IVnQpMai-Uo',
      name: 'ও শিব নাচো রে — অর্কদীপ মিশ্র ও দ্য ফোক ডায়রিজ',
      artist: 'দ্য ফোক ডায়রিজ (The Folk Diaryz)',
      isYoutube: true,
      videoId: 'IVnQpMai-Uo',
      startTime: 0,
      duration: 221,
      icon: '🪘',
      category: 'লোকসংগীত ও পূজা',
      isPreset: true
    },
    {
      id: 'sp-yt-asdoVzpUFsE',
      name: 'গৌরী এলো দেখে যা লো (রক্তবীজ) — দোহার ও তীর্থ ভট্টাচার্য',
      artist: 'দোহার ও তীর্থ ভট্টাচার্য (Dohar)',
      isYoutube: true,
      videoId: 'asdoVzpUFsE',
      startTime: 0,
      duration: 236,
      icon: '🪘',
      category: 'লোকসংগীত ও পূজা',
      isPreset: true
    },
    {
      id: 'sp-yt-OWhOsOHQjY0',
      name: 'জাগো উমা — অনুপম রায় ও রূপঙ্কর বাগচী',
      artist: 'অনুপম রায় ও রূপঙ্কর বাগচী',
      isYoutube: true,
      videoId: 'OWhOsOHQjY0',
      startTime: 0,
      duration: 317,
      icon: '🌅',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-glcu1qrh17k',
      name: 'ও গৌরী — অঙ্কিতা ভট্টাচার্য',
      artist: 'অঙ্কিতা ভট্টাচার্য (Ankita Bhattacharyya)',
      isYoutube: true,
      videoId: 'glcu1qrh17k',
      startTime: 0,
      duration: 259,
      icon: '🌸',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-NCeETTswa8o',
      name: 'দুগ্গা মা এলো — লগ্নজিতা চক্রবর্তী ও বিশ্বজিৎ যশ',
      artist: 'লগ্নজিতা চক্রবর্তী (Lagnajita Chakraborty)',
      isYoutube: true,
      videoId: 'NCeETTswa8o',
      startTime: 0,
      duration: 287,
      icon: '🌺',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-n1LORkMSIV0',
      name: 'দুর্গে দুর্গে দুর্গতিনাশিনী — দেবলীনা নন্দী',
      artist: 'দেবলীনা নন্দী (Debolinaa Nandy)',
      isYoutube: true,
      videoId: 'n1LORkMSIV0',
      startTime: 0,
      duration: 222,
      icon: '🔱',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-X12ac5C_YfU',
      name: 'আজ বাজা তুই ঢাক — অমিত কুমার, হরিহরণ, শান ও কৌশিকী চক্রবর্তী',
      artist: 'অমিত কুমার, বিক্রম ঘোষ ও সহশিল্পীবৃন্দ',
      isYoutube: true,
      videoId: 'X12ac5C_YfU',
      startTime: 0,
      duration: 237,
      icon: '🥁',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-FFSaSllL6gE',
      name: 'জাগো তুমি জাগো — আগমনী গান',
      artist: 'লোপামুদ্রা মিত্র ও সহশিল্পী',
      isYoutube: true,
      videoId: 'FFSaSllL6gE',
      startTime: 0,
      duration: 144,
      icon: '🌅',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-Ez44dZdXDRk',
      name: 'বছর বছর আসতে হবে তোমায় দুর্গা মা — আকাশ ও হৈমন্তী',
      artist: 'আকাশ ও হৈমন্তী (Akassh & Haimanti)',
      isYoutube: true,
      videoId: 'Ez44dZdXDRk',
      startTime: 0,
      duration: 220,
      icon: '🌸',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-mDEzESGA0h8',
      name: 'চারপাশে আলো হোক — পণ্ডিত অজয় চক্রবর্তী, কৌশিকী ও নন্দী সিস্টার্স',
      artist: 'অজয় চক্রবর্তী, কৌশিকী চক্রবর্তী ও সুধীবৃন্দ',
      isYoutube: true,
      videoId: 'mDEzESGA0h8',
      startTime: 0,
      duration: 693,
      icon: '🪔',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-a_YEIp67cb4',
      name: 'এসো নব রূপে — অন্তরা নন্দী ও ঈশান মিত্র',
      artist: 'অন্তরা নন্দী ও ঈশান মিত্র (Antara Nandy & Ishan Mitra)',
      isYoutube: true,
      videoId: 'a_YEIp67cb4',
      startTime: 0,
      duration: 241,
      icon: '🌼',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-UFLBduyWmrg',
      name: 'ভুবনমোহিনী বন্দি তোমারে — রাঘব চট্টোপাধ্যায়',
      artist: 'রাঘব চট্টোপাধ্যায় (Raghab Chatterjee)',
      isYoutube: true,
      videoId: 'UFLBduyWmrg',
      startTime: 0,
      duration: 220,
      icon: '🪷',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-bQtuffhU6_4',
      name: 'এসো মা দুর্গা — শমিক গুহ রায় ও দেবাঞ্জলি চ্যাটার্জি',
      artist: 'শমিক গুহ রায় ও দেবাঞ্জলি চ্যাটার্জি',
      isYoutube: true,
      videoId: 'bQtuffhU6_4',
      startTime: 0,
      duration: 236,
      icon: '🌺',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-WXizPWL5nAg',
      name: 'একবার বিরাজো গো মা — অপরাজিতা চক্রবর্তী',
      artist: 'অপরাজিতা চক্রবর্তী (Aparajita Chakraborty)',
      isYoutube: true,
      videoId: 'WXizPWL5nAg',
      startTime: 0,
      duration: 488,
      icon: '🪷',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-I_5Pr9ytVB8',
      name: 'বাজলো তোমার আলোর বেণু — রত্না দাস',
      artist: 'রত্না দাস (Ratna Das)',
      isYoutube: true,
      videoId: 'I_5Pr9ytVB8',
      startTime: 0,
      duration: 278,
      icon: '🪈',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-rS9IrdIbW2c',
      name: 'অসতো মা সদগময় — অরিজিৎ সিং (খাদ)',
      artist: 'অরিজিৎ সিং ও ইন্দ্রদীপ দাশগুপ্ত',
      isYoutube: true,
      videoId: 'rS9IrdIbW2c',
      startTime: 0,
      duration: 318,
      icon: '🕉️',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-tXXwsHeS_T0',
      name: 'রূপং দেহি জয়ং দেহি — পণ্ডিত তুষার দত্ত (অর্গলা স্তোত্রম)',
      artist: 'পণ্ডিত তুষার দত্ত (Pandit Tushar Dutta)',
      isYoutube: true,
      videoId: 'tXXwsHeS_T0',
      startTime: 0,
      duration: 588,
      icon: '🔱',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-SQDammedcuk',
      name: 'মা গো তুই (দুর্গেশগড়ের গুপ্তধন) — মনোময় ও সোমচন্দা',
      artist: 'মনোময় ভট্টাচার্য ও বিক্রম ঘোষ',
      isYoutube: true,
      videoId: 'SQDammedcuk',
      startTime: 0,
      duration: 119,
      icon: '🌸',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-cCFkWJf7cvo',
      name: 'শঙ্খ বাজিয়ে মাকে ঘরে এনেছি — সন্ধ্যা মুখোপাধ্যায়',
      artist: 'সন্ধ্যা মুখোপাধ্যায় (Sandhya Mukherjee)',
      isYoutube: true,
      videoId: 'cCFkWJf7cvo',
      startTime: 0,
      duration: 226,
      icon: '🐚',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'sp-yt-uUgDWJn8d94',
      name: 'মায়ের পায়ের জবা হয়ে — কুমার শানু',
      artist: 'কুমার শানু (Kumar Sanu)',
      isYoutube: true,
      videoId: 'uUgDWJn8d94',
      startTime: 0,
      duration: 222,
      icon: '🌺',
      category: 'শ্যামাসংগীত',
      isPreset: true
    },
    {
      id: 'sp-yt-IXuu5W3jB9E',
      name: 'আমার সাধ না মিটিলো — কুমার শানু',
      artist: 'কুমার শানু (Kumar Sanu)',
      isYoutube: true,
      videoId: 'IXuu5W3jB9E',
      startTime: 0,
      duration: 263,
      icon: '🪔',
      category: 'শ্যামাসংগীত',
      isPreset: true
    },
    {
      id: 'sp-yt-IfSJy3_Lkuo',
      name: 'জাগো দুর্গা দশপ্রহরণধারিণী — দ্বিজেন মুখোপাধ্যায়',
      artist: 'দ্বিজেন মুখোপাধ্যায় (Dwijen Mukherjee)',
      isYoutube: true,
      videoId: 'IfSJy3_Lkuo',
      startTime: 0,
      duration: 107,
      icon: '🔱',
      category: 'মহালয়া ও চণ্ডীপাঠ',
      isPreset: true
    },
    {
      id: 'sp-yt-wpKThi5dZN0',
      name: 'এলো মা দুগ্গা ঠাকুর — সোনু নিগম ও মোনালী ঠাকুর',
      artist: 'সোনু নিগম, মোনালী ঠাকুর ও জিৎ গাঙ্গুলী',
      isYoutube: true,
      videoId: 'wpKThi5dZN0',
      startTime: 0,
      duration: 183,
      icon: '🥁',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-G7CdEseBpwc',
      name: 'ঢাক বাজা কোমর নাচা — জিৎ ও আকৃতি কক্কর',
      artist: 'আকৃতি কক্কর ও দেব নেগি',
      isYoutube: true,
      videoId: 'G7CdEseBpwc',
      startTime: 0,
      duration: 212,
      icon: '💃',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-ofvoICQ9Fs4',
      name: 'লুকোচুরি (বলো দুগ্গা মাইকি) — নাকাশ আজিজ ও নিকিতা গান্ধী',
      artist: 'নাকাশ আজিজ ও অরিন্দম',
      isYoutube: true,
      videoId: 'ofvoICQ9Fs4',
      startTime: 0,
      duration: 231,
      icon: '🎶',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'sp-yt-Xv9JcvNqmRM',
      name: 'জয় দুগ্গা ঠাকুর — শ্রী প্রীতম ও জলি দাস',
      artist: 'শ্রী প্রীতম ও জলি দাস',
      isYoutube: true,
      videoId: 'Xv9JcvNqmRM',
      startTime: 0,
      duration: 264,
      icon: '🌺',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'sp-yt-O0ktsguogfc',
      name: 'জয় জয় মা (অরুন্ধতী) — কৈলাশ খের ও জিৎ গাঙ্গুলী',
      artist: 'কৈলাশ খের (Kailash Kher)',
      isYoutube: true,
      videoId: 'O0ktsguogfc',
      startTime: 0,
      duration: 111,
      icon: '🔱',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-KR4m2FQvP-0',
      name: 'ওঁ আয়ুর্দেহি যশোদেহি — পণ্ডিত তুষার দত্ত',
      artist: 'পণ্ডিত তুষার দত্ত (Pandit Tushar Dutta)',
      isYoutube: true,
      videoId: 'KR4m2FQvP-0',
      startTime: 0,
      duration: 436,
      icon: '🕉️',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-o3HccF0qviA',
      name: 'ওঁ জয়ন্তং দেবী চামুণ্ডে — পণ্ডিত তুষার দত্ত',
      artist: 'পণ্ডিত তুষার দত্ত (Pandit Tushar Dutta)',
      isYoutube: true,
      videoId: 'o3HccF0qviA',
      startTime: 0,
      duration: 500,
      icon: '🕉️',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'sp-yt-qNWudfqgA9I',
      name: 'ও জোনাকি কি সুখে — শান',
      artist: 'শান (Shaan) • রবীন্দ্রসংগীত',
      isYoutube: true,
      videoId: 'qNWudfqgA9I',
      startTime: 0,
      duration: 213,
      icon: '✨',
      category: 'রবীন্দ্রসংগীত',
      isPreset: true
    },
    {
      id: 'sp-yt-FZAPuBEXMTA',
      name: 'জাগো মা (দেবী চৌধুরানী) — লগ্নজিতা চক্রবর্তী ও শিলাদিত্য চক্রবর্তী',
      artist: 'লগ্নজিতা চক্রবর্তী (Lagnajita Chakraborty)',
      isYoutube: true,
      videoId: 'FZAPuBEXMTA',
      startTime: 0,
      duration: 319,
      icon: '🌅',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'sp-yt-zyT1c-d7paE',
      name: 'নমো দুর্গে — পণ্ডিত তুষার দত্ত',
      artist: 'পণ্ডিত তুষার দত্ত (Pandit Tushar Dutta)',
      isYoutube: true,
      videoId: 'zyT1c-d7paE',
      startTime: 0,
      duration: 426,
      icon: '🔱',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'alb-yt-Qgvav0w0EFU',
      name: 'অয়িগিরি নন্দিনী — ইমন চক্রবর্তী',
      artist: 'ইমন চক্রবর্তী (Iman Chakraborty)',
      isYoutube: true,
      videoId: 'Qgvav0w0EFU',
      startTime: 0,
      duration: 239,
      icon: '🕉️',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'alb-yt-7_GfdfzBpCE',
      name: 'ভবানী দয়ানী — স্বাগতালক্ষ্মী দাশগুপ্ত',
      artist: 'স্বাগতালক্ষ্মী দাশগুপ্ত (Swagatalakshmi Dasgupta)',
      isYoutube: true,
      videoId: '7_GfdfzBpCE',
      startTime: 0,
      duration: 327,
      icon: '🌺',
      category: 'ভক্তিগীতি ও স্তোত্র',
      isPreset: true
    },
    {
      id: 'alb-yt-0XjWnpQgJbU',
      name: 'নমস্তে শরণ্যে শিবে সানুকম্পে (দুর্গাস্তবরাল) — হেমন্ত মুখোপাধ্যায়',
      artist: 'হেমন্ত মুখোপাধ্যায় (Hemanta Mukherjee)',
      isYoutube: true,
      videoId: '0XjWnpQgJbU',
      startTime: 0,
      duration: 158,
      icon: '🔱',
      category: 'মহালয়া ও চণ্ডীপাঠ',
      isPreset: true
    },
    {
      id: 'alb-yt-45O8KBhSZ0I',
      name: 'দুর্গে দুর্গে দুর্গতিনাশিনী (মূল গান) — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: '45O8KBhSZ0I',
      startTime: 0,
      duration: 309,
      icon: '🔱',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'alb-yt-aHfIYxs3X48',
      name: 'যা চণ্ডী মধুকৈটভাদিদৈত্যদলনী (চণ্ডী স্তোত্র) — সমবেত কণ্ঠ',
      artist: 'সমবেত কণ্ঠ (Chorus)',
      isYoutube: true,
      videoId: 'aHfIYxs3X48',
      startTime: 0,
      duration: 96,
      icon: '🕉️',
      category: 'মহালয়া ও চণ্ডীপাঠ',
      isPreset: true
    },
    {
      id: 'alb-yt-7_aEXtug_9A',
      name: 'মহাপ্রাণ জাগে — রাঘব চট্টোপাধ্যায়',
      artist: 'রাঘব চট্টোপাধ্যায় (Raghab Chatterjee)',
      isYoutube: true,
      videoId: '7_aEXtug_9A',
      startTime: 0,
      duration: 205,
      icon: '🌅',
      category: 'পূজার আগমনী',
      isPreset: true
    },
    {
      id: 'alb-yt-tbT_tzMzoH8',
      name: 'শরৎ এলো রে — হেমন্ত মুখোপাধ্যায়',
      artist: 'হেমন্ত মুখোপাধ্যায় (Hemanta Mukherjee)',
      isYoutube: true,
      videoId: 'tbT_tzMzoH8',
      startTime: 0,
      duration: 179,
      icon: '🌾',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'alb-yt-zpPLxp5Snl8',
      name: 'আগমণী গান শোনা যায় (আশ্বিন) — মান্না দে',
      artist: 'মান্না দে (Manna Dey)',
      isYoutube: true,
      videoId: 'zpPLxp5Snl8',
      startTime: 0,
      duration: 242,
      icon: '🪷',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'alb-yt-MhTknPwOXcs',
      name: 'মা দুর্গা আসছেন — রেমা লাহিড়ী ও বাপ্পি লাহিড়ী',
      artist: 'রেমা লাহিড়ী (Rema Lahiri)',
      isYoutube: true,
      videoId: 'MhTknPwOXcs',
      startTime: 0,
      duration: 317,
      icon: '🌸',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'alb-yt-o_z_4Mg6f6M',
      name: 'হৈ গো মা দুর্গা — লোপামুদ্রা মিত্র',
      artist: 'লোপামুদ্রা মিত্র (Lopamudra Mitra)',
      isYoutube: true,
      videoId: 'o_z_4Mg6f6M',
      startTime: 0,
      duration: 216,
      icon: '🌼',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'alb-yt-8P263Qt0Evc',
      name: 'জয় জয় দুগ্গা ঠাকুর মাইকী — মোনালী ঠাকুর',
      artist: 'মোনালী ঠাকুর (Monali Thakur)',
      isYoutube: true,
      videoId: '8P263Qt0Evc',
      startTime: 0,
      duration: 205,
      icon: '🥁',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'alb-yt-ZkywC2p1E6Q',
      name: 'আমার দুগ্গা এসেছে — আকৃতি কক্কর',
      artist: 'আকৃতি কক্কর (Akriti Kakar)',
      isYoutube: true,
      videoId: 'ZkywC2p1E6Q',
      startTime: 0,
      duration: 208,
      icon: '✨',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'old-yt-BdTXyOlllmA',
      name: 'রিমিঝিমি এই শ্রাবণে — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'BdTXyOlllmA',
      startTime: 0,
      duration: 290,
      icon: '🌧️',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-i4iRLhKiwiI',
      name: 'বন্ধ মনের দুয়ার দিয়েছি খুলে — আশা ভোঁসলে',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'i4iRLhKiwiI',
      startTime: 0,
      duration: 209,
      icon: '🚪',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-kB4I37w88Oc',
      name: 'চোখে চোখে কথা বলো — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'kB4I37w88Oc',
      startTime: 0,
      duration: 206,
      icon: '👀',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-JTRdFVja_dI',
      name: 'একটু বসো চলে যেও না — আশা ভোঁসলে (ত্রয়ী)',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle)',
      isYoutube: true,
      videoId: 'JTRdFVja_dI',
      startTime: 0,
      duration: 287,
      icon: '☕',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-ROqpnhTPCsE',
      name: 'আমি বাঁধবো না চুল — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'ROqpnhTPCsE',
      startTime: 0,
      duration: 225,
      icon: '🪮',
      category: 'মিতা চ্যাটার্জি',
      isPreset: true
    },
    {
      id: 'old-yt-ZeXY1vvOlEQ',
      name: 'ও সোনা রেশমি জোছনায় — মিতা চ্যাটার্জী ও সমাজ কুমার',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'ZeXY1vvOlEQ',
      startTime: 0,
      duration: 297,
      icon: '🌕',
      category: 'মিতা চ্যাটার্জি',
      isPreset: true
    },
    {
      id: 'old-yt-EEe4tVkaDWY',
      name: 'কথা হয়েছিল তবু কথা হল না — আশা ভোঁসলে (ত্রয়ী)',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle)',
      isYoutube: true,
      videoId: 'EEe4tVkaDWY',
      startTime: 0,
      duration: 182,
      icon: '💬',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-w1z0yPGlLwA',
      name: 'মহুয়ায় জমেছে আজ মৌ গো — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'w1z0yPGlLwA',
      startTime: 0,
      duration: 214,
      icon: '🍯',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-rvRjlAx9Izg',
      name: 'ফুলে গন্ধ নেই — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'rvRjlAx9Izg',
      startTime: 0,
      duration: 203,
      icon: '🥀',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-RJ7A3tOF8xA',
      name: 'আমি কলকাতার রসগোল্লা — কবিতা কৃষ্ণমূর্তি ও বাপ্পি লাহিড়ী',
      artist: 'কবিতা কৃষ্ণমূর্তি ও বাপ্পি লাহিড়ী (Bappi Lahiri)',
      isYoutube: true,
      videoId: 'RJ7A3tOF8xA',
      startTime: 0,
      duration: 370,
      icon: '🍬',
      category: 'উৎসব ও নাচ',
      isPreset: true
    },
    {
      id: 'old-yt-sCu1hKTjQRs',
      name: 'সন্ধ্যাবেলায় তুমি আমি — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'sCu1hKTjQRs',
      startTime: 0,
      duration: 210,
      icon: '🌇',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-EFWGMl3fnj4',
      name: 'বালিতে তোমার নাম লিখে দেবো — অলকা ইয়াগনিক ও বাপ্পি লাহিড়ী',
      artist: 'অলকা ইয়াগনিক ও বাপ্পি লাহিড়ী (Alka Yagnik & Bappi Lahiri)',
      isYoutube: true,
      videoId: 'EFWGMl3fnj4',
      startTime: 0,
      duration: 291,
      icon: '🏖️',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'old-yt-uBNSBgO-Imw',
      name: 'এমন মধুর সন্ধ্যায় — আশা ভোঁসলে ও আর ডি বর্মন (একান্ত আপন)',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'uBNSBgO-Imw',
      startTime: 0,
      duration: 343,
      icon: '🌆',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-xmDaDXi_h2A',
      name: 'বলবো না কথা — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'xmDaDXi_h2A',
      startTime: 0,
      duration: 340,
      icon: '🤫',
      category: 'মিতা চ্যাটার্জি',
      isPreset: true
    },
    {
      id: 'old-yt-XdMcMxNKcpg',
      name: 'আর কত রাত একা থাকব — আশা ভোঁসলে ও বাপ্পি লাহিড়ী',
      artist: 'আশা ভোঁসলে ও বাপ্পি লাহিড়ী (Asha Bhosle & Bappi Lahiri)',
      isYoutube: true,
      videoId: 'XdMcMxNKcpg',
      startTime: 0,
      duration: 373,
      icon: '🌙',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-vG7sbVFMxwQ',
      name: 'ভালো লাগছে ভালো লাগছে — শ্রীকান্ত আচার্য',
      artist: 'শ্রীকান্ত আচার্য (Srikanta Acharya)',
      isYoutube: true,
      videoId: 'vG7sbVFMxwQ',
      startTime: 0,
      duration: 230,
      icon: '🕊️',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'old-yt-yzh_haK8EqE',
      name: 'কিনে দে রেশমি চুড়ি — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee)',
      isYoutube: true,
      videoId: 'yzh_haK8EqE',
      startTime: 0,
      duration: 186,
      icon: '💫',
      category: 'মিতা চ্যাটার্জি',
      isPreset: true
    },
    {
      id: 'old-yt-nc2fBZ2IZ7s',
      name: 'এক টানেতে যেমন তেমন — কিশোর কুমার ও স্বপ্না চক্রবর্তী (ত্রয়ী)',
      artist: 'কিশোর কুমার ও আর ডি বর্মন (Kishore Kumar)',
      isYoutube: true,
      videoId: 'nc2fBZ2IZ7s',
      startTime: 0,
      duration: 288,
      icon: '🎉',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-dDyQG-rms6U',
      name: 'আধা আলো ছায়াতে — কিশোর কুমার ও আশা ভোঁসলে (কলঙ্কিনী কঙ্কাবতী)',
      artist: 'কিশোর কুমার ও আশা ভোঁসলে (Kishore Kumar & Asha Bhosle)',
      isYoutube: true,
      videoId: 'dDyQG-rms6U',
      startTime: 0,
      duration: 268,
      icon: '🌓',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-2Q0u8z8CsFk',
      name: 'তোমারই চলার পথে — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: '2Q0u8z8CsFk',
      startTime: 0,
      duration: 285,
      icon: '👣',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-QochLLjgLzA',
      name: 'আমার সপ্তমীর বিকেল — প্রাঞ্জল বক্সী',
      artist: 'প্রাঞ্জল বক্সী (Pranjal Bakshi)',
      isYoutube: true,
      videoId: 'QochLLjgLzA',
      startTime: 0,
      duration: 215,
      icon: '🏮',
      category: 'শারদীয় উৎসব',
      isPreset: true
    },
    {
      id: 'old-yt-pT09p4Jg8Go',
      name: 'সে তো এলো না — কিশোর কুমার ও আর ডি বর্মন',
      artist: 'কিশোর কুমার ও আর ডি বর্মন (Kishore Kumar & R. D. Burman)',
      isYoutube: true,
      videoId: 'pT09p4Jg8Go',
      startTime: 0,
      duration: 189,
      icon: '🍂',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-42MdR58bqJo',
      name: 'তারে ভোলানো গেল না কিছুতে — আশা ভোঁসলে (লালকুঠি)',
      artist: 'আশা ভোঁসলে (Asha Bhosle)',
      isYoutube: true,
      videoId: '42MdR58bqJo',
      startTime: 0,
      duration: 253,
      icon: '🥀',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-GdH3nlEraYg',
      name: 'মন বলছে কেউ আসবে — আশা ভোঁসলে ও আর ডি বর্মন (আপন আমার আপন)',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'GdH3nlEraYg',
      startTime: 0,
      duration: 212,
      icon: '🌸',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-dIivRZmtP1k',
      name: 'ও সঙ্গী ও সঙ্গী — মিতা চ্যাটার্জী',
      artist: 'মিতা চ্যাটার্জী (Mita Chatterjee) • Atlantis Music',
      isYoutube: true,
      videoId: 'dIivRZmtP1k',
      startTime: 0,
      duration: 308,
      icon: '🤝',
      category: 'মিতা চ্যাটার্জি',
      isPreset: true
    },
    {
      id: 'old-yt-g4Z7lV1Posg',
      name: 'একটা দেশলাই কাঠি জ্বালাও — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'g4Z7lV1Posg',
      startTime: 0,
      duration: 226,
      icon: '🔥',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-Cku1gdgTyRk',
      name: 'ফেলে আসা স্মৃতি আমার — অমিত কুমার ও লতা মঙ্গেশকর (শতরুপা)',
      artist: 'অমিত কুমার ও আর ডি বর্মন (Amit Kumar & R. D. Burman)',
      isYoutube: true,
      videoId: 'Cku1gdgTyRk',
      startTime: 0,
      duration: 327,
      icon: '📜',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-jYfFBcKbL_M',
      name: 'ময়না বলো তুমি — আশা ভোঁসলে ও আর ডি বর্মন',
      artist: 'আশা ভোঁসলে ও আর ডি বর্মন (Asha Bhosle & R. D. Burman)',
      isYoutube: true,
      videoId: 'jYfFBcKbL_M',
      startTime: 0,
      duration: 208,
      icon: '🦜',
      category: 'পূজার ক্লাসিক',
      isPreset: true
    },
    {
      id: 'old-yt-wxf1WZw6vL8',
      name: 'প্রিয়তমা মনে রেখো — কুমার শানু',
      artist: 'কুমার শানু (Kumar Sanu) • পুলক বন্দ্যোপাধ্যায়',
      isYoutube: true,
      videoId: 'wxf1WZw6vL8',
      startTime: 0,
      duration: 363,
      icon: '💌',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'old-yt-noGHRgAxtSM',
      name: 'তুমি আছো এত কাছে তাই — কুমার শানু',
      artist: 'কুমার শানু (Kumar Sanu) • অরূপ-প্রণয়',
      isYoutube: true,
      videoId: 'noGHRgAxtSM',
      startTime: 0,
      duration: 310,
      icon: '💖',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'old-yt-53yR4lPYA_8',
      name: 'পৃথিবী হারিয়ে গেল — মহম্মদ আজিজ ও বাপ্পি লাহিড়ী (গুরুদক্ষিণা)',
      artist: 'মহম্মদ আজিজ ও বাপ্পি লাহিড়ী (Mohammed Aziz)',
      isYoutube: true,
      videoId: '53yR4lPYA_8',
      startTime: 0,
      duration: 317,
      icon: '🌍',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
    {
      id: 'old-yt-ANr2Kk_CnFE',
      name: 'পৃথিবী বদলে গেছে — কিশোর কুমার',
      artist: 'কিশোর কুমার ও শ্যামল মিত্র (Kishore Kumar)',
      isYoutube: true,
      videoId: 'ANr2Kk_CnFE',
      startTime: 0,
      duration: 211,
      icon: '🌐',
      category: 'চিরসবুজ গান',
      isPreset: true
    },
  ];

  // Application State
  let playlist = []; // Array of song items
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let repeatMode = 'off'; // 'off' | 'all' | 'one'
  let isSeeking = false;
  let lastVolume = 0.85;

  // Smart Time-Based + Mood-Based Recommendation State
  let isSmartMode = true; // Enabled by default as primary experience
  let activeManualFilter = 'all';
  let manualSearchQuery = '';
  let pendingAutoCatSong = null;
  let pendingAutoCatResolve = null;

  // Smart Mood Hub Elements
  const smartModeToggleBtn = document.getElementById('smartModeToggleBtn');
  const smartModeIcon = document.getElementById('smartModeIcon');
  const smartModeText = document.getElementById('smartModeText');
  const hubGreetingTag = document.getElementById('hubGreetingTag');
  const hubSlotBadge = document.getElementById('hubSlotBadge');
  const hubMoodPill = document.getElementById('hubMoodPill');
  const hubBlendBadge = document.getElementById('hubBlendBadge');
  const openTimeSimBtn = document.getElementById('openTimeSimBtn');
  const timeSimulatorBar = document.getElementById('timeSimulatorBar');
  const openPrefsBtn = document.getElementById('openPrefsBtn');
  const openAdminBtn = document.getElementById('openAdminBtn');
  const manualToolbar = document.getElementById('manualToolbar');
  const manualSearchInput = document.getElementById('manualSearchInput');
  const playlistTitleText = document.getElementById('playlistTitleText');

  // Modal Dialogs Elements
  const preferenceModal = document.getElementById('preferenceModal');
  const closePrefModalBtn = document.getElementById('closePrefModalBtn');
  const savePrefBtn = document.getElementById('savePrefBtn');
  const resetPrefBtn = document.getElementById('resetPrefBtn');

  const adminDashboardModal = document.getElementById('adminDashboardModal');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
  const adminSongSearch = document.getElementById('adminSongSearch');
  const adminMoodFilter = document.getElementById('adminMoodFilter');
  const adminSongsTableBody = document.getElementById('adminSongsTableBody');

  const songEditModal = document.getElementById('songEditModal');
  const closeSongEditBtn = document.getElementById('closeSongEditBtn');
  const cancelSongEditBtn = document.getElementById('cancelSongEditBtn');
  const saveSongEditBtn = document.getElementById('saveSongEditBtn');

  const autoCategoryModal = document.getElementById('autoCategoryModal');
  const closeAutoCatBtn = document.getElementById('closeAutoCatBtn');
  const autoCatAcceptBtn = document.getElementById('autoCatAcceptBtn');
  const autoCatEditBtn = document.getElementById('autoCatEditBtn');
  const autoCatRejectBtn = document.getElementById('autoCatRejectBtn');

  // YouTube IFrame Player State
  let ytPlayer = null;
  let ytReady = false;
  let ytProgressInterval = null;
  let pendingTrackPlay = null;

  // Bengali numerals helper
  const toBengaliNumber = (num) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[d]);
  };

  // Time format helper (e.g. 3:45 or 0:00)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Helper to escape HTML strings safely
  const escapeHtml = (str) => {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Toast Notification helper
  let toastTimeout = null;
  const showToast = (message, duration = 3500) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toastMessage.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastMessage.classList.remove('show');
    }, duration);
  };

  // ==========================================
  // YouTube IFrame Player Integration
  // ==========================================
  const initYouTubePlayer = () => {
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  };

  window.onYouTubeIframeAPIReady = () => {
    try {
      ytPlayer = new YT.Player('ytPlayerFrame', {
        height: '100%',
        width: '100%',
        videoId: 'KlGoz_Yl0_s',
        playerVars: {
          'autoplay': 0,
          'controls': 1,
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 1,
          'enablejsapi': 1
        },
        events: {
          'onReady': () => {
            ytReady = true;
            try {
              ytPlayer.setVolume(Math.round(lastVolume * 100));
            } catch (e) {}
            if (pendingTrackPlay && playlist[currentIndex] === pendingTrackPlay.track) {
              const { track, autoPlay, startSec } = pendingTrackPlay;
              if (autoPlay) {
                ytPlayer.loadVideoById({
                  videoId: track.videoId,
                  startSeconds: startSec
                });
                updatePlayButtonState(true);
              } else {
                ytPlayer.cueVideoById({
                  videoId: track.videoId,
                  startSeconds: startSec
                });
                updatePlayButtonState(false);
              }
              pendingTrackPlay = null;
            }
          },
          'onStateChange': onYouTubeStateChange,
          'onError': (e) => {
            console.warn('YouTube Error:', e);
            const curTrack = playlist[currentIndex];
            if (curTrack && curTrack.localFallbackUrl) {
              console.log('Falling back to local audio for track:', curTrack.name);
              showToast(`স্থানীয় অডিওতে বাজানো হচ্ছে: ${curTrack.name}`);
              curTrack.isYoutube = false;
              curTrack.audioUrl = curTrack.localFallbackUrl;
              selectTrack(currentIndex, true);
              return;
            }
            playbackStatusDot.classList.remove('buffering', 'active');
            playbackStatusLabel.textContent = 'ইউটিউব সংযোগ সমস্যা';
            showToast('গানটি চালাতে সমস্যা হয়েছে। পরবর্তী গান বাজানো হচ্ছে...');
            setTimeout(() => {
              playNextTrack();
            }, 2500);
          }
        }
      });
    } catch (err) {
      console.warn('Error setting up YouTube player:', err);
    }
  };

  const onYouTubeStateChange = (event) => {
    if (event.data === 1) { // PLAYING
      updatePlayButtonState(true);
      startYouTubeProgressTracker();
    } else if (event.data === 2) { // PAUSED
      updatePlayButtonState(false);
      stopYouTubeProgressTracker();
    } else if (event.data === 0) { // ENDED
      stopYouTubeProgressTracker();
      if (repeatMode === 'one') {
        try {
          const track = playlist[currentIndex];
          ytPlayer.seekTo(track.startTime || 0);
          ytPlayer.playVideo();
        } catch (e) {}
      } else {
        playNextTrack();
      }
    } else if (event.data === 3) { // BUFFERING
      playbackStatusDot.classList.add('buffering');
      playbackStatusLabel.textContent = 'ইউটিউব বাফার হচ্ছে...';
    }
  };

  const startYouTubeProgressTracker = () => {
    stopYouTubeProgressTracker();
    ytProgressInterval = setInterval(() => {
      if (!ytPlayer || !ytReady || isSeeking) return;
      try {
        const cur = ytPlayer.getCurrentTime() || 0;
        const track = playlist[currentIndex];

        if (track && track.startTime !== undefined && track.duration > 0) {
          // Track is a single song slice within YouTube
          const startSec = track.startTime;
          const songDur = track.duration;
          const songCur = Math.max(0, cur - startSec);

          // Check if single song finished
          if (cur >= startSec + songDur) {
            if (repeatMode === 'one') {
              ytPlayer.seekTo(startSec, true);
            } else {
              playNextTrack();
            }
            return;
          }

          const percent = Math.min(100, Math.max(0, (songCur / songDur) * 100));

          // Center seekbar
          seekBar.value = percent;
          seekFill.style.width = `${percent}%`;
          currentTimeDisplay.textContent = formatTime(songCur);
          totalDurationDisplay.textContent = formatTime(songDur);

          // Floating pill scrubber
          if (pillProgressFill) pillProgressFill.style.width = `${percent}%`;
          if (pillProgressThumb) pillProgressThumb.style.left = `${percent}%`;
          if (pillProgressSlider) pillProgressSlider.value = percent;
          if (pillCurrentTime) pillCurrentTime.textContent = formatTime(songCur);
          if (pillTotalDuration) pillTotalDuration.textContent = formatTime(songDur);

        } else {
          // Full video playback
          const dur = ytPlayer.getDuration() || 0;
          if (dur > 0) {
            const percent = (cur / dur) * 100;
            seekBar.value = percent;
            seekFill.style.width = `${percent}%`;
            currentTimeDisplay.textContent = formatTime(cur);
            totalDurationDisplay.textContent = formatTime(dur);

            if (pillProgressFill) pillProgressFill.style.width = `${percent}%`;
            if (pillProgressThumb) pillProgressThumb.style.left = `${percent}%`;
            if (pillProgressSlider) pillProgressSlider.value = percent;
            if (pillCurrentTime) pillCurrentTime.textContent = formatTime(cur);
            if (pillTotalDuration) pillTotalDuration.textContent = formatTime(dur);
          }
        }
      } catch (e) {}
    }, 400);
  };

  const stopYouTubeProgressTracker = () => {
    if (ytProgressInterval) {
      clearInterval(ytProgressInterval);
      ytProgressInterval = null;
    }
  };

  // ==========================================
  // Storage & Playlist Management
  // ==========================================
  const loadSavedSongs = async () => {
    try {
      let restored = [];
      if (window.musicDB) {
        const storedRecords = await window.musicDB.getAllSongs();
        if (storedRecords && storedRecords.length > 0) {
          restored = storedRecords.map(rec => ({
            id: rec.id,
            name: rec.name,
            artist: rec.artist || (rec.isYoutube ? 'ইউটিউব গান' : (rec.isOnline ? 'অনলাইন গান' : 'অফলাইন গান')),
            blob: rec.blob,
            audioUrl: rec.audioUrl,
            isOnline: rec.isOnline,
            isYoutube: rec.isYoutube,
            videoId: rec.videoId,
            thumbnail: rec.thumbnail,
            objectUrl: rec.blob ? URL.createObjectURL(rec.blob) : null,
            duration: 0,
            icon: rec.isYoutube ? '📺' : (rec.isOnline ? '🌐' : '🎵')
          }));
        }
      }

      // Combine presets + user restored songs without duplicates
      const initialList = [...PRESET_SONGS];
      for (const item of restored) {
        const alreadyExists = initialList.some(p => 
          (p.id && p.id === item.id) || 
          p.name === item.name
        );
        if (!alreadyExists) {
          initialList.push(item);
        }
      }

      // Apply any Admin Overrides to songs
      if (window.AdminManager) {
        const overrides = window.AdminManager.getSongOverrides();
        initialList.forEach(t => {
          if (overrides[t.id]) {
            Object.assign(t, overrides[t.id]);
          }
        });
      }

      playlist = initialList;
      updateLiveHubUI();
      renderPlaylist();
      renderDrawerPlaylist();

      // Trigger automatic playback of the first single song on page load
      autoPlayFirstTrack();

    } catch (err) {
      console.warn('Error restoring songs from DB:', err);
      playlist = [...PRESET_SONGS];
      updateLiveHubUI();
      renderPlaylist();
      renderDrawerPlaylist();
      autoPlayFirstTrack();
    }
  };

  // Live Smart Mood Hub UI Updater
  const updateLiveHubUI = () => {
    if (!window.TimeBasedPlaylist) return;
    const slot = window.TimeBasedPlaylist.getActiveTimeSlot();
    const blend = window.TimeBasedPlaylist.getSlotBlendInfo();
    const timeStr = window.TimeBasedPlaylist.getCurrentTimeString();

    if (hubGreetingTag) {
      hubGreetingTag.textContent = `${slot.icon} ${slot.greeting} (${timeStr})`;
    }
    const hubSlotIcon = document.getElementById('hubSlotIcon');
    const hubSlotName = document.getElementById('hubSlotName');
    if (hubSlotIcon && hubSlotName) {
      hubSlotIcon.textContent = slot.icon;
      hubSlotName.textContent = `${slot.nameBn} (${slot.hours})`;
    } else if (hubSlotBadge) {
      hubSlotBadge.textContent = `${slot.icon} ${slot.nameBn} (${slot.name})`;
    }

    const hubMoodIcon = document.getElementById('hubMoodIcon');
    const hubMoodText = document.getElementById('hubMoodText');
    if (hubMoodIcon && hubMoodText) {
      hubMoodIcon.textContent = '❤️';
      hubMoodText.textContent = slot.moodsBn.slice(0, 3).join(' • ');
    } else if (hubMoodPill) {
      hubMoodPill.textContent = `❤️ ${slot.moodsBn.slice(0, 3).join(' • ')}`;
    }

    if (hubBlendBadge) {
      hubBlendBadge.style.display = 'inline-flex';
      if (blend.isTransitioning) {
        hubBlendBadge.textContent = `🌊 ট্রানজিশন: ${blend.label}`;
      } else {
        hubBlendBadge.textContent = `✨ ১০০% ${slot.nameBn} উপযোগী`;
      }
    }

    if (smartModeToggleBtn) {
      smartModeToggleBtn.classList.toggle('active', isSmartMode);
      smartModeToggleBtn.classList.toggle('smart-active', isSmartMode);
      smartModeToggleBtn.classList.toggle('manual-active', !isSmartMode);
      if (smartModeIcon) smartModeIcon.textContent = isSmartMode ? '⚡' : '🎵';
      if (smartModeText) smartModeText.textContent = isSmartMode ? 'স্মার্ট মোড (চালু)' : 'ম্যানুয়াল মোড';
    }

    if (manualToolbar) {
      manualToolbar.classList.toggle('hidden', isSmartMode);
      manualToolbar.style.display = isSmartMode ? 'none' : 'flex';
    }

    if (playlistTitleText) {
      playlistTitleText.textContent = isSmartMode 
        ? `✨ ${slot.nameBn} মেজাজভিত্তিক স্মার্ট প্লেলিস্ট` 
        : '📋 সাধারণ বাংলা গানের তালিকা (ম্যানুয়াল মোড)';
    }

    // Highlight simulated chip if any
    document.querySelectorAll('.sim-chip').forEach(chip => {
      const h = chip.getAttribute('data-hour');
      if (h === 'real') {
        chip.classList.toggle('active', !window.TimeBasedPlaylist.simulatedHour && window.TimeBasedPlaylist.simulatedHour !== 0);
      } else {
        chip.classList.toggle('active', window.TimeBasedPlaylist.simulatedHour === parseInt(h, 10));
      }
    });
  };

  // Periodically refresh the smart hub status every 30 seconds
  setInterval(updateLiveHubUI, 30000);

  // Clean filename to readable title
  const cleanTrackName = (filename) => {
    return filename
      .replace(/\.(mp3|wav|ogg|m4a|aac|flac)$/i, '')
      .replace(/^[0-9\s._-]+/, '')
      .replace(/[_]+/g, ' ')
      .trim();
  };

  // Prompt Admin / User confirmation for newly analyzed song
  const promptAutoCategoryReview = (songItem) => {
    return new Promise((resolve) => {
      if (!window.MoodClassifier || !autoCategoryModal) {
        resolve({ action: 'accept', song: songItem });
        return;
      }

      const analysis = window.MoodClassifier.analyzeSong(songItem);
      songItem.metadata = analysis;
      songItem.moods = analysis.mood;
      songItem.energy = analysis.energy;
      songItem.timeSuitability = analysis.timeSuitability;
      songItem.genre = analysis.genre;

      const autoCatSongTitle = document.getElementById('autoCatSongTitle');
      const autoCatArtistName = document.getElementById('autoCatArtistName');
      const autoCatSuggestedText = document.getElementById('autoCatSuggestedText');
      const autoCatTagsRow = document.getElementById('autoCatTagsRow');

      if (autoCatSongTitle) autoCatSongTitle.textContent = songItem.name;
      if (autoCatArtistName) {
        autoCatArtistName.textContent = `শিল্পী: ${songItem.artist || 'বাংলা শিল্পী'} • জনরা: ${analysis.genre} • শক্তি: ${toBengaliNumber(analysis.energy)}%`;
      }
      if (autoCatSuggestedText) {
        autoCatSuggestedText.textContent = window.MoodClassifier.getSuggestedCategoryString(songItem);
      }
      if (autoCatTagsRow) {
        autoCatTagsRow.innerHTML = '';
        analysis.mood.forEach(m => {
          const t = document.createElement('span');
          t.className = 'filter-chip active';
          t.textContent = m;
          autoCatTagsRow.appendChild(t);
        });
      }

      pendingAutoCatSong = songItem;
      pendingAutoCatResolve = resolve;
      autoCategoryModal.classList.remove('hidden');
    });
  };

  // Process added audio files with auto-categorization
  const handleFilesAdded = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList).filter(file => {
      return file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name);
    });

    if (filesArray.length === 0) {
      showToast('অনুগ্রহ করে সঠিক MP3 বা অডিও ফাইল বেছে নিন');
      return;
    }

    let addedCount = 0;
    for (const file of filesArray) {
      const cleanName = cleanTrackName(file.name);
      const exists = playlist.some(item => item.name === cleanName);
      if (!exists) {
        const tempItem = {
          name: cleanName,
          artist: 'আমার নিজস্ব একক গান',
          blob: file,
          duration: 0,
          icon: '🎵'
        };

        const result = await promptAutoCategoryReview(tempItem);
        if (result.action === 'accept') {
          let record = null;
          if (window.musicDB) {
            record = await window.musicDB.saveSong(file);
          }
          const finalItem = {
            ...result.song,
            id: record ? record.id : Date.now() + Math.random(),
            objectUrl: URL.createObjectURL(file)
          };
          playlist.push(finalItem);
          addedCount++;
        }
      }
    }

    renderPlaylist();
    renderDrawerPlaylist();

    if (addedCount > 0) {
      showToast(`${toBengaliNumber(addedCount)}টি নতুন গান বুদ্ধিমত্তার সাথে সংরক্ষিত হয়েছে 🎵`);
    } else {
      showToast('গান যোগ প্রক্রিয়া সম্পন্ন হয়েছে');
    }
  };

  // ==========================================
  // Render Main Page Playlist (Single Songs)
  // ==========================================
  const renderPlaylist = () => {
    if (playlistCount) {
      playlistCount.textContent = `${toBengaliNumber(playlist.length)} টি একক গান`;
    }

    if (playlist.length === 0) {
      if (emptyPlaylistMsg) emptyPlaylistMsg.style.display = 'block';
      playlistContainer.querySelectorAll('.playlist-item').forEach(el => el.remove());
      currentTrackTitle.textContent = 'কোনো গান বেছে নেওয়া হয়নি';
      currentTrackMeta.textContent = 'তালিকায় কোনো গান নেই';
      return;
    }

    if (emptyPlaylistMsg) emptyPlaylistMsg.style.display = 'none';

    // Remove old items
    const existingItems = playlistContainer.querySelectorAll('.playlist-item');
    existingItems.forEach(el => el.remove());

    let displayedTracks = playlist.map((track, idx) => ({ track, origIdx: idx }));

    // In Manual Mode, apply search and filter chips
    if (!isSmartMode) {
      if (manualSearchQuery) {
        const q = manualSearchQuery.toLowerCase();
        displayedTracks = displayedTracks.filter(({ track }) => {
          return (track.name && track.name.toLowerCase().includes(q)) ||
                 (track.artist && track.artist.toLowerCase().includes(q)) ||
                 (track.category && track.category.toLowerCase().includes(q));
        });
      }
      if (activeManualFilter && activeManualFilter !== 'all') {
        displayedTracks = displayedTracks.filter(({ track }) => {
          const cat = (track.category || '').toLowerCase();
          const name = (track.name || '').toLowerCase();
          const artist = (track.artist || '').toLowerCase();
          if (activeManualFilter === 'agomoni') return name.includes('আগমনী') || cat.includes('আগমনী') || cat.includes('পূজা');
          if (activeManualFilter === 'romantic') return name.includes('প্রেম') || cat.includes('রোমান্টিক') || name.includes('বউ') || name.includes('ভালোবাসা');
          if (activeManualFilter === 'peaceful') return name.includes('শান্ত') || name.includes('স্তোত্র') || name.includes('রবীন্দ্র');
          if (activeManualFilter === 'devotional') return cat.includes('ভক্তি') || name.includes('মা') || name.includes('মহালয়া');
          if (activeManualFilter === 'srikanto') return artist.includes('শ্রীকান্ত') || artist.includes('সৈকত') || artist.includes('হেমান্ত');
          if (activeManualFilter === 'mita') return artist.includes('মিতা') || artist.includes('mita');
          return true;
        });
      }
    }

    displayedTracks.forEach(({ track, origIdx }, displayIdx) => {
      const itemEl = document.createElement('div');
      itemEl.className = `playlist-item ${origIdx === currentIndex ? 'active' : ''}`;
      itemEl.setAttribute('role', 'listitem');
      itemEl.setAttribute('tabindex', '0');
      itemEl.setAttribute('aria-label', `একক গান ${origIdx + 1}: ${track.name}`);

      const trackTypeLabel = track.category 
        ? track.category 
        : (track.isYoutube ? '📺 ইউটিউব গান' : (track.isPreset ? '🌸 পূজার গান' : 'অফলাইন গান'));

      let compatBadge = '';
      if (isSmartMode && window.RecommendationEngine) {
        const scoreObj = window.RecommendationEngine.scoreTrack(track);
        const score = typeof scoreObj === 'object' && scoreObj !== null ? (scoreObj.finalScore || 50) : (scoreObj || 50);
        compatBadge = `<span class="smart-compat-pill" title="স্মার্ট মোড ম্যাচ">${toBengaliNumber(score)}% মিল</span>`;
      }

      itemEl.innerHTML = `
        <div class="item-index-bubble">${toBengaliNumber(displayIdx + 1)}</div>
        <div class="item-meta-group">
          <div class="item-name">${track.icon || '🎶'} ${escapeHtml(track.name)} ${compatBadge}</div>
          <div class="item-details">
            <span class="item-duration">${track.duration ? formatTime(track.duration) : 'একক গান'}</span>
            <span>• ${trackTypeLabel}</span>
          </div>
        </div>
        ${track.isPreset ? '' : `<button type="button" class="item-delete-btn" title="এই গানটি তালিকা থেকে সরান" aria-label="গানটি মুছুন">✕</button>`}
      `;

      // Click to play single song
      itemEl.addEventListener('click', (e) => {
        if (e.target.closest('.item-delete-btn')) return;
        selectTrack(origIdx, true);
      });

      // Keyboard enter/space to play
      itemEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectTrack(origIdx, true);
        }
      });

      // Delete non-preset user tracks
      const deleteBtn = itemEl.querySelector('.item-delete-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await removeTrack(origIdx);
        });
      }

      playlistContainer.appendChild(itemEl);
    });
  };

  // ==========================================
  // Render Raju Mistri Slide-Out Queue Drawer
  // ==========================================
  const renderDrawerPlaylist = () => {
    if (!drawerTrackList) return;
    if (drawerCount) drawerCount.textContent = toBengaliNumber(playlist.length);

    drawerTrackList.innerHTML = '';

    playlist.forEach((track, idx) => {
      const drawerItem = document.createElement('div');
      drawerItem.className = `drawer-track-item ${idx === currentIndex ? 'active' : ''}`;
      drawerItem.setAttribute('role', 'button');
      drawerItem.setAttribute('tabindex', '0');

      drawerItem.innerHTML = `
        <div class="track-item-left">
          <span class="track-num">${toBengaliNumber(idx + 1)}</span>
          <div class="track-item-info">
            <div class="track-item-title">${track.icon || '🌸'} ${escapeHtml(track.name)}</div>
            <div class="track-item-artist">${escapeHtml(track.artist || 'শারদীয় একক গান')}</div>
          </div>
        </div>
        <div class="track-item-duration">${track.duration ? formatTime(track.duration) : (track.isYoutube ? 'ভিডিও' : 'অডিও')}</div>
      `;

      drawerItem.addEventListener('click', () => {
        selectTrack(idx, true);
        playlistDrawer.classList.add('hidden');
      });

      drawerTrackList.appendChild(drawerItem);
    });
  };

  // Update Drawer active track highlight
  const updateDrawerActiveItem = () => {
    if (!drawerTrackList) return;
    const items = drawerTrackList.querySelectorAll('.drawer-track-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
      if (i === currentIndex) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };

  // Synchronize Single Songs Interactive Grid Chips
  const updateSingleSongChips = () => {
    const curTrack = playlist[currentIndex];
    if (!curTrack) return;

    document.querySelectorAll('.single-song-chip').forEach(chip => {
      const songId = chip.getAttribute('data-song-id');
      const chipTitle = chip.querySelector('.chip-name').textContent.trim();
      const isActive = (curTrack.id === songId || curTrack.name.includes(chipTitle));
      chip.classList.toggle('active', isActive);
      const indicator = chip.querySelector('.chip-play-indicator');
      if (indicator) {
        indicator.textContent = (isActive && isPlaying) ? '⏸' : '▶';
      }
    });
  };

  // Wire up Single Song Chips Click
  document.querySelectorAll('.single-song-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const songId = chip.getAttribute('data-song-id');
      const chipTitle = chip.querySelector('.chip-name').textContent.trim();

      const idx = playlist.findIndex(t => t.id === songId || t.name.includes(chipTitle));
      if (idx !== -1) {
        selectTrack(idx, true);
        showToast(`🎶 "${playlist[idx].name}" একক গানটি চলছে...`);
      }
    });
  });

  // Remove single track
  const removeTrack = async (index) => {
    const track = playlist[index];
    if (track && track.id && !track.isPreset && window.musicDB) {
      await window.musicDB.deleteSong(track.id);
    }
    if (track && track.objectUrl) {
      URL.revokeObjectURL(track.objectUrl);
    }

    const wasPlayingCurrent = (index === currentIndex);
    playlist.splice(index, 1);

    if (playlist.length === 0) {
      if (ytReady && ytPlayer) {
        try { ytPlayer.pauseVideo(); } catch (e) {}
      }
      audio.pause();
      audio.src = '';
      currentIndex = -1;
      updatePlayButtonState(false);
    } else if (wasPlayingCurrent) {
      currentIndex = Math.min(index, playlist.length - 1);
      selectTrack(currentIndex, isPlaying);
    } else if (index < currentIndex) {
      currentIndex--;
    }

    renderPlaylist();
    renderDrawerPlaylist();
    showToast('গানটি তালিকা থেকে সরানো হয়েছে');
  };

  // Clear playlist (leaves preset tracks intact)
  if (clearPlaylistBtn) {
    clearPlaylistBtn.addEventListener('click', async () => {
      const nonPresets = playlist.filter(t => !t.isPreset);
      if (nonPresets.length === 0) {
        showToast('তালিকায় শুধুমাত্র পূজার মূল একক গানগুলিই রয়েছে');
        return;
      }
      const confirmed = confirm('আপনি কি নিজস্ব গানগুলি মুছে পূজার মূল গানগুলিতে ফিরতে চান?');
      if (!confirmed) return;

      if (window.musicDB) {
        await window.musicDB.clearAllSongs();
      }
      playlist = [...PRESET_SONGS];
      currentIndex = 0;
      renderPlaylist();
      renderDrawerPlaylist();
      selectTrack(0, false);
      showToast('পূজার মূল গানগুলি পুনর্বহাল করা হয়েছে');
    });
  }

  // ==========================================
  // Playback Control Engine (Unified Audio + YouTube Single Songs)
  // ==========================================
  const selectTrack = (index, autoPlay = true) => {
    if (index < 0 || index >= playlist.length) return;

    currentIndex = index;
    const track = playlist[currentIndex];

    // Record listening history for smart recommendation scoring & anti-repetition
    if (window.ListeningHistory && track) {
      window.ListeningHistory.recordPlay(track);
    }

    // Reset progress scrubbers (both center card and pill)
    seekBar.value = 0;
    seekFill.style.width = '0%';
    currentTimeDisplay.textContent = '0:00';
    totalDurationDisplay.textContent = track.duration ? formatTime(track.duration) : '0:00';

    if (pillProgressFill) pillProgressFill.style.width = '0%';
    if (pillProgressThumb) pillProgressThumb.style.left = '0%';
    if (pillProgressSlider) pillProgressSlider.value = 0;
    if (pillCurrentTime) pillCurrentTime.textContent = '0:00';
    if (pillTotalDuration) pillTotalDuration.textContent = track.duration ? formatTime(track.duration) : (track.isYoutube ? 'ভিডিও' : '0:00');

    // Update center display metadata
    currentTrackTitle.textContent = track.name;
    currentTrackMeta.textContent = track.artist || 'শারদীয় পূজার একক গান';

    // Update floating pill metadata
    if (pillTrackTitle) pillTrackTitle.textContent = track.name;
    if (pillArtistName) pillArtistName.textContent = track.artist || 'শারদীয় পূজার একক গান';
    if (pillArtIcon) pillArtIcon.textContent = track.icon || (track.isYoutube ? '📺' : '🌸');

    // Update YouTube vs HTML5 Audio
    if (track.isYoutube) {
      audio.pause();
      audio.src = '';

      if (trackSourceBadge) trackSourceBadge.textContent = 'ইউটিউব একক গান 📺';
      if (toggleVideoBtn) toggleVideoBtn.style.display = 'inline-flex';

      const startSec = track.startTime || 0;
      if (ytReady && ytPlayer) {
        try {
          if (autoPlay) {
            ytPlayer.loadVideoById({
              videoId: track.videoId,
              startSeconds: startSec
            });
            updatePlayButtonState(true);
          } else {
            ytPlayer.cueVideoById({
              videoId: track.videoId,
              startSeconds: startSec
            });
            updatePlayButtonState(false);
          }
        } catch (e) {
          console.warn('YouTube load exception:', e);
        }
      } else {
        pendingTrackPlay = { track, autoPlay, startSec };
        setTimeout(() => {
          if (ytReady && ytPlayer && playlist[currentIndex] === track) {
            if (autoPlay) ytPlayer.loadVideoById({ videoId: track.videoId, startSeconds: startSec });
            else ytPlayer.cueVideoById({ videoId: track.videoId, startSeconds: startSec });
            pendingTrackPlay = null;
          }
        }, 1000);
      }
    } else {
      if (ytReady && ytPlayer) {
        try { ytPlayer.pauseVideo(); } catch (e) {}
      }
      stopYouTubeProgressTracker();

      if (toggleVideoBtn) toggleVideoBtn.style.display = 'none';
      if (ytPlayerContainer) ytPlayerContainer.classList.remove('show');

      audio.src = track.audioUrl || track.objectUrl;

      if (trackSourceBadge) {
        trackSourceBadge.textContent = track.isOnline ? 'অনলাইন স্ট্রিম 🌐' : (track.isPreset ? 'পূজার বিশেষ গান 🌸' : 'অফলাইন একক গান');
      }

      if (autoPlay) {
        playAudio();
      } else {
        updatePlayButtonState(false);
      }
    }

    // Update active highlight in main playlist list
    document.querySelectorAll('.playlist-item').forEach((el, i) => {
      el.classList.toggle('active', i === currentIndex);
      if (i === currentIndex) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Update active highlight in drawer
    updateDrawerActiveItem();

    // Update active chip in single songs grid
    updateSingleSongChips();
  };

  const playAudio = () => {
    if (currentIndex === -1 || playlist.length === 0) {
      if (playlist.length > 0) {
        selectTrack(0, true);
      } else {
        showToast('কোনো গান পাওয়া যায়নি');
      }
      return;
    }

    const track = playlist[currentIndex];
    if (track && track.isYoutube) {
      if (ytReady && ytPlayer) {
        try {
          ytPlayer.playVideo();
          updatePlayButtonState(true);
        } catch (e) {}
      }
      return;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updatePlayButtonState(true);
          if (autoplayPrompt) autoplayPrompt.style.display = 'none';
        })
        .catch(err => {
          console.warn('Audio play prevented by browser autoplay policy:', err);
          updatePlayButtonState(false);
          if (autoplayPrompt) {
            autoplayPrompt.style.display = 'flex';
          }
          setupFirstGestureUnlock();
        });
    }
  };

  const pauseAudio = () => {
    const track = playlist[currentIndex];
    if (track && track.isYoutube) {
      if (ytReady && ytPlayer) {
        try {
          ytPlayer.pauseVideo();
          updatePlayButtonState(false);
        } catch (e) {}
      }
      return;
    }
    audio.pause();
    updatePlayButtonState(false);
  };

  const togglePlayPause = () => {
    const track = playlist[currentIndex];
    if (track && track.isYoutube) {
      if (ytReady && ytPlayer) {
        try {
          const state = ytPlayer.getPlayerState();
          if (state === 1) { // Currently playing
            pauseAudio();
          } else {
            playAudio();
          }
        } catch (e) {
          playAudio();
        }
      }
      return;
    }

    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const playNextTrack = () => {
    if (playlist.length === 0) return;

    if (repeatMode === 'one') {
      selectTrack(currentIndex, true);
      return;
    }

    // SMART MODE AUTOMATIC SONG PROGRESSION
    if (isSmartMode && window.RecommendationEngine) {
      const curTrack = playlist[currentIndex];
      const nextTrack = window.RecommendationEngine.pickNextSmartTrack(playlist, curTrack ? curTrack.id : null);
      if (nextTrack) {
        const nextIdx = playlist.findIndex(t => t.id === nextTrack.id);
        if (nextIdx !== -1) {
          selectTrack(nextIdx, true);
          return;
        }
      }
    }

    // SMART WEIGHTED SHUFFLE OR PSEUDO-RANDOM
    if (isShuffle && playlist.length > 1) {
      if (window.SmartShuffle && window.RecommendationEngine) {
        const scored = window.RecommendationEngine.scoreLibrary(playlist);
        const nextTrack = window.SmartShuffle.weightedChoice(scored, [playlist[currentIndex]?.id]);
        if (nextTrack) {
          const nextIdx = playlist.findIndex(t => t.id === nextTrack.id);
          if (nextIdx !== -1) {
            selectTrack(nextIdx, true);
            return;
          }
        }
      }
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * playlist.length);
      } while (nextIdx === currentIndex);
      selectTrack(nextIdx, true);
      return;
    }

    if (currentIndex < playlist.length - 1) {
      selectTrack(currentIndex + 1, true);
    } else if (repeatMode === 'all') {
      selectTrack(0, true);
    } else {
      showToast('তালিকার শেষ গানে পৌঁছেছেন');
      pauseAudio();
    }
  };

  const playPrevTrack = () => {
    if (playlist.length === 0) return;

    const track = playlist[currentIndex];
    if (track && track.isYoutube && ytReady && ytPlayer) {
      try {
        const cur = ytPlayer.getCurrentTime();
        const startSec = track.startTime || 0;
        if (cur - startSec > 4) {
          ytPlayer.seekTo(startSec, true);
          return;
        }
      } catch (e) {}
    } else if (audio.currentTime > 4) {
      audio.currentTime = 0;
      return;
    }

    if (currentIndex > 0) {
      selectTrack(currentIndex - 1, true);
    } else if (repeatMode === 'all') {
      selectTrack(playlist.length - 1, true);
    } else {
      if (track && track.isYoutube && ytReady && ytPlayer) {
        try { ytPlayer.seekTo(track.startTime || 0, true); } catch (e) {}
      } else {
        audio.currentTime = 0;
      }
    }
  };

  // Synchronize Play/Pause visual states between Center Card and Floating Pill
  const updatePlayButtonState = (playing) => {
    isPlaying = playing;
    if (playing) {
      playIconWrap.innerHTML = `
        <svg viewBox="0 0 24 24" class="giant-icon pause-symbol">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
        </svg>
      `;
      playBtnCaption.textContent = 'থামান';
      playPauseBtn.setAttribute('aria-label', 'গান থামান (Pause)');
      playbackStatusDot.classList.remove('buffering');
      playbackStatusDot.classList.add('active');
      playbackStatusLabel.textContent = 'গান চলছে 🎶';
      vinylDisc.classList.add('spinning');
      musicWaveBars.classList.add('active');

      if (pillPlayIcon) {
        pillPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
      }
      if (pillEqualizer) {
        pillEqualizer.classList.add('active');
      }
    } else {
      playIconWrap.innerHTML = `
        <svg viewBox="0 0 24 24" class="giant-icon play-symbol">
          <path d="M8 5v14l11-7z" fill="currentColor"/>
        </svg>
      `;
      playBtnCaption.textContent = 'চালান';
      playPauseBtn.setAttribute('aria-label', 'গান চালান (Play)');
      playbackStatusDot.classList.remove('buffering', 'active');
      playbackStatusLabel.textContent = playlist.length > 0 ? 'বিরতিতে রয়েছে' : 'প্লেয়ার প্রস্তুত';
      vinylDisc.classList.remove('spinning');
      musicWaveBars.classList.remove('active');

      if (pillPlayIcon) {
        pillPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
      }
      if (pillEqualizer) {
        pillEqualizer.classList.remove('active');
      }
    }

    updateSingleSongChips();
  };

  // ==========================================
  // Automatic Zero-Touch Playback Setup
  // ==========================================
  const autoPlayFirstTrack = () => {
    let startingIndex = 0;
    if (isSmartMode && window.RecommendationEngine && playlist.length > 0) {
      const best = window.RecommendationEngine.pickNextSmartTrack(playlist, null);
      if (best) {
        const found = playlist.findIndex(t => t.id === best.id);
        if (found !== -1) startingIndex = found;
      }
    }
    selectTrack(startingIndex, true);
    setupFirstGestureUnlock();
  };

  let gestureUnlocked = false;
  const setupFirstGestureUnlock = () => {
    if (gestureUnlocked) return;

    const unlockSound = () => {
      if (gestureUnlocked) return;
      gestureUnlocked = true;
      if (autoplayPrompt) autoplayPrompt.style.display = 'none';

      const curTrack = playlist[currentIndex];
      if (curTrack && curTrack.isYoutube) {
        if (ytReady && ytPlayer) {
          try {
            ytPlayer.playVideo();
            updatePlayButtonState(true);
          } catch (e) {}
        }
      } else if (audio.paused) {
        playAudio();
      }

      window.removeEventListener('click', unlockSound);
      window.removeEventListener('touchstart', unlockSound);
      window.removeEventListener('keydown', unlockSound);
    };

    window.addEventListener('click', unlockSound, { once: true });
    window.addEventListener('touchstart', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });

    if (touchStartBtn) {
      touchStartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        unlockSound();
      });
    }
  };

  // ==========================================
  // Floating Pill Control Listeners
  // ==========================================
  if (pillPlayBtn) {
    pillPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlayPause();
    });
  }

  if (pillPrevBtn) {
    pillPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playPrevTrack();
    });
  }

  if (pillNextBtn) {
    pillNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playNextTrack();
    });
  }

  // Toggle slide-out queue drawer
  if (pillQueueBtn && playlistDrawer) {
    pillQueueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playlistDrawer.classList.toggle('hidden');
    });
  }

  if (closeDrawerBtn && playlistDrawer) {
    closeDrawerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playlistDrawer.classList.add('hidden');
    });
  }

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (playlistDrawer && !playlistDrawer.classList.contains('hidden')) {
      if (!playlistDrawer.contains(e.target) && !pillQueueBtn.contains(e.target)) {
        playlistDrawer.classList.add('hidden');
      }
    }
  });

  // Floating Pill Scrubber
  if (pillProgressSlider) {
    pillProgressSlider.addEventListener('input', () => {
      isSeeking = true;
      const seekPercent = parseFloat(pillProgressSlider.value);
      if (pillProgressFill) pillProgressFill.style.width = `${seekPercent}%`;
      if (pillProgressThumb) pillProgressThumb.style.left = `${seekPercent}%`;
      if (seekFill) seekFill.style.width = `${seekPercent}%`;
      if (seekBar) seekBar.value = seekPercent;

      const track = playlist[currentIndex];
      if (track && track.isYoutube) {
        const dur = (track.startTime !== undefined && track.duration > 0) ? track.duration : (ytPlayer ? ytPlayer.getDuration() : 0);
        const targetSec = (seekPercent / 100) * dur;
        currentTimeDisplay.textContent = formatTime(targetSec);
        if (pillCurrentTime) pillCurrentTime.textContent = formatTime(targetSec);
      } else if (audio.duration) {
        const targetTime = (seekPercent / 100) * audio.duration;
        currentTimeDisplay.textContent = formatTime(targetTime);
        if (pillCurrentTime) pillCurrentTime.textContent = formatTime(targetTime);
      }
    });

    pillProgressSlider.addEventListener('change', () => {
      const track = playlist[currentIndex];
      const seekPercent = parseFloat(pillProgressSlider.value);

      if (track && track.isYoutube && ytReady && ytPlayer) {
        try {
          if (track.startTime !== undefined && track.duration > 0) {
            const targetSec = track.startTime + (seekPercent / 100) * track.duration;
            ytPlayer.seekTo(targetSec, true);
          } else {
            const dur = ytPlayer.getDuration() || 0;
            ytPlayer.seekTo((seekPercent / 100) * dur, true);
          }
        } catch (e) {}
      } else if (audio.duration) {
        audio.currentTime = (seekPercent / 100) * audio.duration;
      }
      isSeeking = false;
    });
  }

  // ==========================================
  // Audio & Scrubber Event Listeners (HTML5 Audio)
  // ==========================================
  audio.addEventListener('timeupdate', () => {
    const track = playlist[currentIndex];
    if (!isSeeking && audio.duration && (!track || !track.isYoutube)) {
      const current = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (current / duration) * 100;
      
      seekBar.value = progressPercent;
      seekFill.style.width = `${progressPercent}%`;
      currentTimeDisplay.textContent = formatTime(current);

      if (pillProgressSlider) pillProgressSlider.value = progressPercent;
      if (pillProgressFill) pillProgressFill.style.width = `${progressPercent}%`;
      if (pillProgressThumb) pillProgressThumb.style.left = `${progressPercent}%`;
      if (pillCurrentTime) pillCurrentTime.textContent = formatTime(current);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    const track = playlist[currentIndex];
    if (audio.duration && track && !track.isYoutube) {
      track.duration = audio.duration;
      totalDurationDisplay.textContent = formatTime(audio.duration);
      if (pillTotalDuration) pillTotalDuration.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play();
    } else {
      playNextTrack();
    }
  });

  // Center Seek Bar Interaction
  seekBar.addEventListener('input', () => {
    isSeeking = true;
    const seekPercent = parseFloat(seekBar.value);
    seekFill.style.width = `${seekPercent}%`;
    if (pillProgressFill) pillProgressFill.style.width = `${seekPercent}%`;
    if (pillProgressThumb) pillProgressThumb.style.left = `${seekPercent}%`;
    if (pillProgressSlider) pillProgressSlider.value = seekPercent;

    const track = playlist[currentIndex];
    if (track && track.isYoutube) {
      const dur = (track.startTime !== undefined && track.duration > 0) ? track.duration : (ytPlayer ? ytPlayer.getDuration() : 0);
      const targetSec = (seekPercent / 100) * dur;
      currentTimeDisplay.textContent = formatTime(targetSec);
      if (pillCurrentTime) pillCurrentTime.textContent = formatTime(targetSec);
    } else if (audio.duration) {
      const targetTime = (seekPercent / 100) * audio.duration;
      currentTimeDisplay.textContent = formatTime(targetTime);
      if (pillCurrentTime) pillCurrentTime.textContent = formatTime(targetTime);
    }
  });

  seekBar.addEventListener('change', () => {
    const track = playlist[currentIndex];
    const seekPercent = parseFloat(seekBar.value);

    if (track && track.isYoutube && ytReady && ytPlayer) {
      try {
        if (track.startTime !== undefined && track.duration > 0) {
          const targetSec = track.startTime + (seekPercent / 100) * track.duration;
          ytPlayer.seekTo(targetSec, true);
        } else {
          const dur = ytPlayer.getDuration() || 0;
          ytPlayer.seekTo((seekPercent / 100) * dur, true);
        }
      } catch (e) {}
    } else if (audio.duration) {
      audio.currentTime = (seekPercent / 100) * audio.duration;
    }
    isSeeking = false;
  });

  // Volume slider interaction
  const setVolume = (val) => {
    val = Math.max(0, Math.min(1, val));
    audio.volume = val;
    lastVolume = val;

    if (ytReady && ytPlayer && ytPlayer.setVolume) {
      try {
        ytPlayer.setVolume(Math.round(val * 100));
        if (val === 0) ytPlayer.mute();
        else ytPlayer.unMute();
      } catch (e) {}
    }

    volumeBar.value = val;
    volumeFill.style.width = `${val * 100}%`;
    const percentInt = Math.round(val * 100);
    volumePercent.textContent = `${toBengaliNumber(percentInt)}%`;

    if (val === 0) {
      volIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.78 4.78H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>`;
    } else if (val < 0.5) {
      volIcon.innerHTML = `<path d="M7 9v6h4l5 5V4L11 9H7zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>`;
    } else {
      volIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>`;
    }
  };

  volumeBar.addEventListener('input', (e) => {
    setVolume(parseFloat(e.target.value));
  });

  muteToggleBtn.addEventListener('click', () => {
    if (audio.volume > 0 || (ytReady && ytPlayer && !ytPlayer.isMuted())) {
      lastVolume = audio.volume || 0.85;
      setVolume(0);
      showToast('শব্দ বন্ধ (Muted)');
    } else {
      setVolume(lastVolume || 0.85);
      showToast('শব্দ চালু');
    }
  });

  // Buttons click events
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', playNextTrack);
  prevBtn.addEventListener('click', playPrevTrack);

  // Shuffle toggle
  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    shuffleBtn.setAttribute('aria-pressed', isShuffle);
    showToast(isShuffle ? 'এলোমেলোভাবে বাজানো চালু (Shuffle On)' : 'এলোমেলো বাজানো বন্ধ (Shuffle Off)');
  });

  // Repeat toggle (off -> all -> one -> off)
  repeatBtn.addEventListener('click', () => {
    if (repeatMode === 'off') {
      repeatMode = 'all';
      repeatBtn.classList.add('active');
      repeatLabel.textContent = 'সব লুপ';
      showToast('সব গান পুনরায় বাজবে (Repeat All)');
    } else if (repeatMode === 'all') {
      repeatMode = 'one';
      repeatBtn.classList.add('active');
      repeatLabel.textContent = '১টি লুপ';
      showToast('একই গান বারবার বাজবে (Repeat One)');
    } else {
      repeatMode = 'off';
      repeatBtn.classList.remove('active');
      repeatLabel.textContent = 'লুপ';
      showToast('পুনরাবৃত্তি বন্ধ (Repeat Off)');
    }
    repeatBtn.setAttribute('aria-pressed', repeatMode !== 'off');
  });

  // Toggle Video View Button
  if (toggleVideoBtn && ytPlayerContainer) {
    toggleVideoBtn.addEventListener('click', () => {
      const isShown = ytPlayerContainer.classList.toggle('show');
      toggleVideoBtn.textContent = isShown ? '🙈 ভিডিও লুকান' : '📺 ভিডিও দেখুন';
      showToast(isShown ? 'ভিডিও দেখানো হচ্ছে' : 'ভিডিও লুকানো হয়েছে (অডিও চলছে)');
    });
  }

  // ==========================================
  // File Input & Drag & Drop Handling
  // ==========================================
  if (addSongsBtn) {
    addSongsBtn.addEventListener('click', () => {
      audioFileInput.click();
    });
  }

  if (addMitaSongBtn) {
    addMitaSongBtn.addEventListener('click', () => {
      const existingIdx = playlist.findIndex(t => t.id === 'mita-agomoni-song' || t.name.includes('মায়ের আগমনী'));
      if (existingIdx !== -1) {
        selectTrack(existingIdx, true);
        showToast('মায়ের আগমনী গানটি বাজানো হচ্ছে 🎶');
      } else {
        playlist.unshift(PRESET_SONGS[0]);
        renderPlaylist();
        renderDrawerPlaylist();
        selectTrack(0, true);
        showToast('🌸 মায়ের আগমনী গানটি প্লেলিস্টে যুক্ত হয়েছে ও চলছে!');
      }
    });
  }

  if (addMitaYtBtn) {
    addMitaYtBtn.addEventListener('click', () => {
      const existingIdx = playlist.findIndex(t => t.id === 'yt-KlGoz_Yl0_s-full' || t.videoId === 'KlGoz_Yl0_s');
      if (existingIdx !== -1) {
        selectTrack(existingIdx, true);
        showToast('📺 মিতা চ্যাটার্জির সম্পূর্ণ অ্যালবাম বাজানো হচ্ছে...');
      } else {
        playlist.push(PRESET_SONGS[PRESET_SONGS.length - 1]);
        renderPlaylist();
        renderDrawerPlaylist();
        selectTrack(playlist.length - 1, true);
        showToast('🌸 মিতা চ্যাটার্জির সম্পূর্ণ অ্যালবাম যুক্ত হয়েছে ও শুরু হয়েছে!');
      }
    });
  }

  if (audioFileInput) {
    audioFileInput.addEventListener('change', (e) => {
      handleFilesAdded(e.target.files);
      audioFileInput.value = '';
    });
  }

  // Drag & drop
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files) {
        handleFilesAdded(e.dataTransfer.files);
      }
    });
  }

  // ==========================================
  // Online Streaming & YouTube URL Handling (Single Song Adder)
  // ==========================================
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const addAndPlayOnlineTrack = async (url, title, artist = 'অনলাইন একক গান') => {
    if (!url) return;

    const ytId = extractYouTubeId(url);
    if (ytId) {
      const existingYt = playlist.findIndex(t => t.videoId === ytId && !t.startTime);
      if (existingYt !== -1) {
        selectTrack(existingYt, true);
        showToast(`📺 "${playlist[existingYt].name}" গানটি বাজানো হচ্ছে...`);
        return;
      }

      showToast('ইউটিউব গানের তথ্য সংগ্রহ করা হচ্ছে...');
      let ytTitle = title || 'ইউটিউব একক বাংলা গান';
      let ytAuthor = artist || 'ইউটিউব শিল্পী';

      try {
        const resp = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`);
        if (resp.ok) {
          const data = await resp.json();
          if (data.title) ytTitle = data.title;
          if (data.author_name) ytAuthor = data.author_name;
        }
      } catch (e) {
        console.warn('oEmbed fetch error:', e);
      }

      const newYtTrack = {
        id: 'yt-' + ytId,
        name: ytTitle,
        artist: ytAuthor,
        isYoutube: true,
        videoId: ytId,
        videoUrl: url,
        thumbnail: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
        duration: 0,
        icon: '📺',
        category: 'ইউটিউব একক গান'
      };

      const review = await promptAutoCategoryReview(newYtTrack);
      if (review.action === 'reject') {
        showToast('গানটি বাতিল করা হয়েছে');
        return;
      }
      const finalYt = review.song;

      if (window.musicDB) {
        const saved = await window.musicDB.saveOnlineTrack(finalYt);
        if (saved && saved.id) finalYt.id = saved.id;
      }

      playlist.push(finalYt);
      renderPlaylist();
      renderDrawerPlaylist();
      selectTrack(playlist.length - 1, true);
      showToast(`📺 "${finalYt.name}" একক গানটি যুক্ত হয়েছে ও শুরু হয়েছে!`);
      return;
    }

    // Direct audio URL
    const existingIndex = playlist.findIndex(t => (t.audioUrl && t.audioUrl === url) || t.name === title);
    if (existingIndex !== -1) {
      selectTrack(existingIndex, true);
      showToast(`🌐 "${title}" গানটি প্লেলিস্টে পাওয়া গেছে ও বাজানো হচ্ছে...`);
      return;
    }

    const cleanTitle = title || url.split('/').pop().replace(/\.[^/.]+$/, '').replace(/[_+-]+/g, ' ') || 'অনলাইন একক গান';
    const newTrack = {
      id: 'online-' + Date.now(),
      name: cleanTitle,
      artist: artist,
      audioUrl: url,
      isOnline: true,
      duration: 0,
      icon: '🌐',
      category: 'অনলাইন সরাসরি'
    };

    const review = await promptAutoCategoryReview(newTrack);
    if (review.action === 'reject') {
      showToast('গানটি বাতিল করা হয়েছে');
      return;
    }
    const finalTrack = review.song;

    if (window.musicDB) {
      const saved = await window.musicDB.saveOnlineTrack(finalTrack);
      if (saved && saved.id) finalTrack.id = saved.id;
    }

    playlist.push(finalTrack);
    renderPlaylist();
    renderDrawerPlaylist();
    selectTrack(playlist.length - 1, true);
    showToast(`🌐 "${finalTrack.name}" গানটি অনলাইনে লোড হচ্ছে...`);
  };

  // Wire up Online Track Cards
  const onlineCards = document.querySelectorAll('.online-track-card');
  onlineCards.forEach(card => {
    const handleCardClick = () => {
      const ytId = card.getAttribute('data-youtube-id');
      if (ytId) {
        const url = `https://youtu.be/${ytId}`;
        const name = card.getAttribute('data-name');
        const artist = card.getAttribute('data-artist');
        addAndPlayOnlineTrack(url, name, artist);
        return;
      }

      const url = card.getAttribute('data-url');
      const name = card.getAttribute('data-name');
      const artist = card.getAttribute('data-artist');
      addAndPlayOnlineTrack(url, name, artist);
    };

    const playBtn = card.querySelector('.btn-online-play');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCardClick();
      });
    }

    card.addEventListener('click', handleCardClick);
  });

  // Custom URL Submission Form
  const submitCustomUrlBtn = document.getElementById('submitCustomUrlBtn');
  const onlineAudioUrlInput = document.getElementById('onlineAudioUrlInput');
  const onlineAudioTitleInput = document.getElementById('onlineAudioTitleInput');

  if (submitCustomUrlBtn && onlineAudioUrlInput) {
    const handleCustomUrl = () => {
      const url = onlineAudioUrlInput.value.trim();
      const title = onlineAudioTitleInput ? onlineAudioTitleInput.value.trim() : '';

      if (!url) {
        showToast('অনুগ্রহ করে সঠিক অডিও, MP3 বা YouTube লিংক পেস্ট করুন');
        onlineAudioUrlInput.focus();
        return;
      }

      if (!/^https?:\/\//i.test(url)) {
        showToast('লিংকটি অবশ্যই http:// বা https:// দিয়ে শুরু হতে হবে');
        onlineAudioUrlInput.focus();
        return;
      }

      addAndPlayOnlineTrack(url, title || '', 'ইন্টারনেট একক গান');
      onlineAudioUrlInput.value = '';
      if (onlineAudioTitleInput) onlineAudioTitleInput.value = '';
    };

    submitCustomUrlBtn.addEventListener('click', handleCustomUrl);
    onlineAudioUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCustomUrl();
      }
    });
  }

  // HTML5 audio buffering and error events
  audio.addEventListener('waiting', () => {
    const track = playlist[currentIndex];
    if (!track || !track.isYoutube) {
      playbackStatusDot.classList.add('buffering');
      playbackStatusLabel.textContent = 'অনলাইন গান লোড হচ্ছে...';
    }
  });

  audio.addEventListener('canplay', () => {
    playbackStatusDot.classList.remove('buffering');
    if (isPlaying) {
      playbackStatusDot.classList.add('active');
      playbackStatusLabel.textContent = 'গান চলছে 🎶';
    }
  });

  audio.addEventListener('error', () => {
    const track = playlist[currentIndex];
    if (!track || !track.isYoutube) {
      playbackStatusDot.classList.remove('buffering', 'active');
      playbackStatusLabel.textContent = 'গান লোড হতে পারেনি';
      showToast('গানটি লোড হতে সমস্যা হচ্ছে। ইন্টারনেট সংযোগ বা অন্য কোনো গান বেছে নিন।');
    }
  });

  // ==========================================
  // Pujo Bells, Shankha & Ambient Sound
  // ==========================================
  if (shankhaBtn && window.pujoSound) {
    shankhaBtn.addEventListener('click', () => {
      window.pujoSound.blowShankha();
      showToast('🐚 পবিত্র শঙ্খধ্বনি বাজানো হচ্ছে... শুভ শারদীয়া!');
    });
  }

  if (ambientToggleBtn && window.pujoSound) {
    ambientToggleBtn.addEventListener('click', () => {
      const isAmbientPlaying = window.pujoSound.toggleAmbient();
      ambientToggleBtn.classList.toggle('active-glow', isAmbientPlaying);
      ambientToggleBtn.setAttribute('aria-pressed', isAmbientPlaying);
      if (isAmbientPlaying) {
        showToast('🔔 মন্দিরের শান্ত ঘণ্টা ও আবহধ্বনি শুরু হয়েছে');
      } else {
        showToast('মন্দিরের আবহধ্বনি বন্ধ করা হয়েছে');
      }
    });
  }

  if (playDemoChantBtn && window.pujoSound) {
    playDemoChantBtn.addEventListener('click', () => {
      playDemoChantBtn.disabled = true;
      showToast('🪕 শান্ত আগমনী তানপুরা ও ঘণ্টার সুর বাজছে...');
      
      window.pujoSound.playAgomoniMelody(
        (noteName) => {
          playbackStatusLabel.textContent = `সুর: ${noteName}`;
        },
        () => {
          playDemoChantBtn.disabled = false;
          playbackStatusLabel.textContent = isPlaying ? 'গান চলছে 🎶' : 'প্লেয়ার প্রস্তুত';
        }
      );
    });
  }

  // ==========================================
  // Accessibility: Font Resizer & Themes
  // ==========================================
  const setFontSize = (scale) => {
    document.body.classList.remove('font-scale-lg', 'font-scale-xl');
    if (fontDecBtn) fontDecBtn.classList.remove('active');
    if (fontResetBtn) fontResetBtn.classList.remove('active');
    if (fontIncBtn) fontIncBtn.classList.remove('active');

    if (scale === 'lg') {
      document.body.classList.add('font-scale-lg');
      if (fontIncBtn) fontIncBtn.classList.add('active');
      showToast('লেখার মাপ বড় করা হয়েছে (Large Font)');
    } else if (scale === 'xl') {
      document.body.classList.add('font-scale-xl');
      if (fontIncBtn) fontIncBtn.classList.add('active');
      showToast('লেখার মাপ সর্বাধিক বড় করা হয়েছে (Extra Large)');
    } else {
      if (fontResetBtn) fontResetBtn.classList.add('active');
      showToast('লেখার মাপ স্বাভাবিক করা হয়েছে (Default)');
    }
    localStorage.setItem('pujo_font_scale', scale);
  };

  if (fontDecBtn) fontDecBtn.addEventListener('click', () => setFontSize('sm'));
  if (fontResetBtn) fontResetBtn.addEventListener('click', () => setFontSize('normal'));
  if (fontIncBtn) fontIncBtn.addEventListener('click', () => {
    const current = localStorage.getItem('pujo_font_scale');
    if (current === 'lg') {
      setFontSize('xl');
    } else {
      setFontSize('lg');
    }
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isMorning = document.body.classList.toggle('theme-morning');
      if (isMorning) {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'শারদীয় গোধূলি';
        showToast('শরতের সকালের রূপ বেছে নেওয়া হয়েছে');
        localStorage.setItem('pujo_theme', 'morning');
      } else {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'শরতের সকাল';
        showToast('শারদীয় গোধূলির লাল-সোনালী রূপ বেছে নেওয়া হয়েছে');
        localStorage.setItem('pujo_theme', 'maroon');
      }
    });

    const savedTheme = localStorage.getItem('pujo_theme');
    if (savedTheme === 'morning') {
      document.body.classList.add('theme-morning');
      themeIcon.textContent = '🌙';
      themeText.textContent = 'শারদীয় গোধূলি';
    }

    const savedFontScale = localStorage.getItem('pujo_font_scale');
    if (savedFontScale) {
      setFontSize(savedFontScale);
    }
  }

  // ==========================================
  // Keyboard Shortcuts (Senior Convenience)
  // ==========================================
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.code === 'ArrowRight') {
      if (e.shiftKey) {
        playNextTrack();
      } else {
        const track = playlist[currentIndex];
        if (track && track.isYoutube && ytReady && ytPlayer) {
          try {
            ytPlayer.seekTo(ytPlayer.getCurrentTime() + 5, true);
          } catch (e) {}
        } else if (audio.duration) {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
      }
    } else if (e.code === 'ArrowLeft') {
      if (e.shiftKey) {
        playPrevTrack();
      } else {
        const track = playlist[currentIndex];
        if (track && track.isYoutube && ytReady && ytPlayer) {
          try {
            ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 5), true);
          } catch (e) {}
        } else {
          audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
      }
    } else if (e.code === 'ArrowUp') {
      e.preventDefault();
      setVolume(lastVolume + 0.05);
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      setVolume(lastVolume - 0.05);
    }
  });

  // ==========================================
  // Falling Lotus Petals (Pushpanjali Effect)
  // ==========================================
  const petalsContainer = document.getElementById('petalsContainer');
  if (petalsContainer) {
    const spawnPetal = () => {
      if (document.hidden) return;
      const petal = document.createElement('div');
      petal.className = 'petal-particle';
      petal.style.left = `${Math.random() * 95}%`;
      const fallDuration = 10 + Math.random() * 8;
      petal.style.animationDuration = `${fallDuration}s`;
      petalsContainer.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, fallDuration * 1000);
    };

    setInterval(spawnPetal, 3500);
  }

  // ==========================================
  // Smart Mode & Time Simulator Event Listeners
  // ==========================================
  if (smartModeToggleBtn) {
    smartModeToggleBtn.addEventListener('click', () => {
      isSmartMode = !isSmartMode;
      updateLiveHubUI();
      renderPlaylist();
      showToast(
        isSmartMode 
          ? '⚡ স্মার্ট মোড সক্রিয়: বর্তমান সময় ও মেজাজ অনুযায়ী গান বাছাই করা হচ্ছে' 
          : '🎵 ম্যানুয়াল মোড সক্রিয়: আপনার ইচ্ছামতো যে কোনো গান বাজান',
        4000
      );
    });
  }

  // Toggle Time Simulator Bar
  if (openTimeSimBtn && timeSimulatorBar) {
    openTimeSimBtn.addEventListener('click', () => {
      timeSimulatorBar.classList.toggle('hidden');
    });
  }

  const closeSimBtn = document.getElementById('closeSimBtn');
  if (closeSimBtn && timeSimulatorBar) {
    closeSimBtn.addEventListener('click', () => {
      timeSimulatorBar.classList.add('hidden');
    });
  }

  // Simulator Hour Chips
  document.querySelectorAll('.sim-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const h = chip.getAttribute('data-hour');
      if (h === 'real') {
        window.TimeBasedPlaylist.resetToRealTime();
      } else {
        window.TimeBasedPlaylist.setSimulatedTime(parseInt(h, 10));
      }
      updateLiveHubUI();
      if (isSmartMode) {
        renderPlaylist();
      }
      const activeSlot = window.TimeBasedPlaylist.getActiveTimeSlot();
      showToast(`🕒 সময় পরিবর্তন: ${activeSlot.nameBn} (${activeSlot.hours}) • ${activeSlot.moodsBn.join(', ')}`);
    });
  });

  // Manual Mode Search & Filter Bar
  if (manualSearchInput) {
    manualSearchInput.addEventListener('input', (e) => {
      manualSearchQuery = e.target.value.trim();
      renderPlaylist();
    });
  }

  document.querySelectorAll('#manualToolbar .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#manualToolbar .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeManualFilter = chip.getAttribute('data-filter') || 'all';
      renderPlaylist();
    });
  });

  // ==========================================
  // User Music Preferences Modal
  // ==========================================
  const refreshPrefModalValues = () => {
    if (!window.UserPreferences) return;
    const prefs = window.UserPreferences.getPreferences();

    const rangeRomantic = document.getElementById('rangeRomantic');
    const rangePeaceful = document.getElementById('rangePeaceful');
    const rangeEnergetic = document.getElementById('rangeEnergetic');
    const rangeEmotional = document.getElementById('rangeEmotional');
    const rangeDevotional = document.getElementById('rangeDevotional');
    const rangeClassic = document.getElementById('rangeClassic');

    if (rangeRomantic) { rangeRomantic.value = prefs.sliders.romantic; document.getElementById('valRomantic').textContent = `${prefs.sliders.romantic}%`; }
    if (rangePeaceful) { rangePeaceful.value = prefs.sliders.peaceful; document.getElementById('valPeaceful').textContent = `${prefs.sliders.peaceful}%`; }
    if (rangeEnergetic) { rangeEnergetic.value = prefs.sliders.energetic; document.getElementById('valEnergetic').textContent = `${prefs.sliders.energetic}%`; }
    if (rangeEmotional) { rangeEmotional.value = prefs.sliders.emotional; document.getElementById('valEmotional').textContent = `${prefs.sliders.emotional}%`; }
    if (rangeDevotional) { rangeDevotional.value = prefs.sliders.devotional; document.getElementById('valDevotional').textContent = `${prefs.sliders.devotional}%`; }
    if (rangeClassic) { rangeClassic.value = prefs.sliders.classic; document.getElementById('valClassic').textContent = `${prefs.sliders.classic}%`; }

    document.querySelectorAll('#prefTagsContainer .pref-tag-btn').forEach(btn => {
      const tag = btn.getAttribute('data-tag');
      btn.classList.toggle('active', prefs.tags.includes(tag));
    });
  };

  // Wire Slider Live Values
  ['Romantic', 'Peaceful', 'Energetic', 'Emotional', 'Devotional', 'Classic'].forEach(name => {
    const el = document.getElementById(`range${name}`);
    const valEl = document.getElementById(`val${name}`);
    if (el && valEl) {
      el.addEventListener('input', () => {
        valEl.textContent = `${el.value}%`;
      });
    }
  });

  // Tag button clicks
  document.querySelectorAll('#prefTagsContainer .pref-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  if (openPrefsBtn && preferenceModal) {
    openPrefsBtn.addEventListener('click', () => {
      refreshPrefModalValues();
      preferenceModal.classList.remove('hidden');
    });
  }

  if (closePrefModalBtn && preferenceModal) {
    closePrefModalBtn.addEventListener('click', () => {
      preferenceModal.classList.add('hidden');
    });
  }

  if (resetPrefBtn) {
    resetPrefBtn.addEventListener('click', () => {
      if (window.UserPreferences) {
        window.UserPreferences.resetDefaults();
        refreshPrefModalValues();
        showToast('ডিফল্ট পছন্দসমূহ ফিরিয়ে আনা হয়েছে');
      }
    });
  }

  if (savePrefBtn && preferenceModal) {
    savePrefBtn.addEventListener('click', () => {
      if (window.UserPreferences) {
        const sliders = {
          romantic: parseInt(document.getElementById('rangeRomantic')?.value || 65, 10),
          peaceful: parseInt(document.getElementById('rangePeaceful')?.value || 75, 10),
          energetic: parseInt(document.getElementById('rangeEnergetic')?.value || 55, 10),
          emotional: parseInt(document.getElementById('rangeEmotional')?.value || 60, 10),
          devotional: parseInt(document.getElementById('rangeDevotional')?.value || 80, 10),
          classic: parseInt(document.getElementById('rangeClassic')?.value || 75, 10)
        };
        const tags = Array.from(document.querySelectorAll('#prefTagsContainer .pref-tag-btn.active'))
          .map(b => b.getAttribute('data-tag'));

        window.UserPreferences.savePreferences({ sliders, tags });
        if (window.RecommendationEngine) {
          window.RecommendationEngine.scoreLibrary(playlist);
        }
        renderPlaylist();
        preferenceModal.classList.add('hidden');
        showToast('✨ আপনার সঙ্গীত পছন্দ সংরক্ষিত হয়েছে! স্মার্ট প্লেলিস্ট আপডেট করা হয়েছে।');
      }
    });
  }

  // ==========================================
  // Admin Dashboard Modal & Song Management
  // ==========================================
  const renderAdminOverview = () => {
    if (!window.AdminManager) return;
    const metrics = window.AdminManager.computeLibraryMetrics(playlist);

    const mTotalSongs = document.getElementById('metricTotalSongs');
    const mTotalArtists = document.getElementById('metricTotalArtists');
    const mTotalCategories = document.getElementById('metricTotalCategories');
    const mSmartStatus = document.getElementById('metricSmartStatus');

    if (mTotalSongs) mTotalSongs.textContent = toBengaliNumber(metrics.totalSongs);
    if (mTotalArtists) mTotalArtists.textContent = toBengaliNumber(metrics.totalArtists);
    if (mTotalCategories) mTotalCategories.textContent = toBengaliNumber(metrics.totalCategories);
    if (mSmartStatus) mSmartStatus.textContent = isSmartMode ? 'সক্রিয় (Active)' : 'ম্যানুয়াল (Manual)';

    // Render Mood Bars
    const moodBarsContainer = document.getElementById('moodBarsContainer');
    if (moodBarsContainer) {
      moodBarsContainer.innerHTML = '';
      const moodBnMap = {
        devotional: '🪷 ভক্তিমূলক',
        peaceful: '🕊️ শান্ত ও আধ্যাত্মিক',
        romantic: '❤️ রোমান্টিক প্রেমের গান',
        emotional: '🌧️ আবেগঘন ও মেলোডি',
        energetic: '🥁 উৎসব ও নাচ',
        nostalgic: '📻 কালজয়ী ও ক্লাসিক'
      };
      Object.entries(metrics.songsByMood).forEach(([moodKey, count]) => {
        const pct = Math.round((count / (metrics.totalSongs || 1)) * 100);
        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `
          <span class="dist-name" title="${moodBnMap[moodKey] || moodKey}">${moodBnMap[moodKey] || moodKey}</span>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="dist-count">${toBengaliNumber(count)}</span>
        `;
        moodBarsContainer.appendChild(row);
      });
    }

    // Render Time Slot Bars
    const timeSlotBarsContainer = document.getElementById('timeSlotBarsContainer');
    if (timeSlotBarsContainer && window.TimeBasedPlaylist) {
      timeSlotBarsContainer.innerHTML = '';
      window.TimeBasedPlaylist.SLOTS.forEach(slot => {
        const count = metrics.songsBySlot[slot.id] || 0;
        const pct = Math.round((count / (metrics.totalSongs || 1)) * 100);
        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `
          <span class="dist-name" title="${slot.nameBn}">${slot.icon} ${slot.nameBn}</span>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="dist-count">${toBengaliNumber(count)}</span>
        `;
        timeSlotBarsContainer.appendChild(row);
      });
    }
  };

  const renderAdminSongsTable = () => {
    if (!adminSongsTableBody) return;
    const searchQ = (adminSongSearch ? adminSongSearch.value.trim().toLowerCase() : '');
    const moodFilter = (adminMoodFilter ? adminMoodFilter.value : 'all');

    adminSongsTableBody.innerHTML = '';

    const filtered = playlist.filter(track => {
      if (searchQ) {
        const match = (track.name && track.name.toLowerCase().includes(searchQ)) ||
                      (track.artist && track.artist.toLowerCase().includes(searchQ)) ||
                      (track.category && track.category.toLowerCase().includes(searchQ));
        if (!match) return false;
      }
      if (moodFilter !== 'all') {
        const analysis = track.metadata || (window.MoodClassifier ? window.MoodClassifier.analyzeSong(track) : null);
        if (!analysis || !analysis.mood.includes(moodFilter)) return false;
      }
      return true;
    });

    filtered.forEach((track) => {
      const analysis = track.metadata || (window.MoodClassifier ? window.MoodClassifier.analyzeSong(track) : { mood: [], energy: 50, genre: 'বাংলা' });
      const isEligible = track.isSmartEligible !== false;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div style="font-weight:700; color:var(--gold-light);">${escapeHtml(track.name)}</div>
          <div style="font-size:0.75rem; color:#eedcc6;">${escapeHtml(track.artist || 'শারদীয় গান')}</div>
        </td>
        <td>
          <span style="font-size:0.8rem; background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:6px;">${escapeHtml(track.category || analysis.genre || 'সাধারণ')}</span>
          <div style="font-size:0.75rem; color:#ffdf79; margin-top:2px;">${analysis.mood.join(', ')}</div>
        </td>
        <td>
          <span style="font-weight:700;">${toBengaliNumber(analysis.energy || 50)}%</span>
        </td>
        <td>
          <span style="font-size:0.8rem; color:#ffd080;">${(analysis.timeSuitability || ['evening'])[0]}</span>
        </td>
        <td style="text-align:center;">
          <input type="checkbox" class="smart-toggle-cb" data-id="${track.id}" ${isEligible ? 'checked' : ''} title="স্মার্ট মোডে অন্তর্ভুক্ত" />
        </td>
        <td>
          <button type="button" class="admin-btn-action btn-edit-track" data-id="${track.id}">সম্পাদনা ✏️</button>
        </td>
      `;

      // Smart selection toggle checkbox
      const cb = row.querySelector('.smart-toggle-cb');
      cb.addEventListener('change', (e) => {
        const checked = e.target.checked;
        track.isSmartEligible = checked;
        if (window.AdminManager) {
          window.AdminManager.toggleSmartSelection(track.id, checked);
        }
        showToast(`গান "${track.name}" স্মার্ট নির্বাচন ${checked ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
      });

      // Edit song button
      const editBtn = row.querySelector('.btn-edit-track');
      editBtn.addEventListener('click', () => {
        openSongEditModal(track, () => {
          renderAdminSongsTable();
          renderPlaylist();
        });
      });

      adminSongsTableBody.appendChild(row);
    });
  };

  const renderAdminHistory = () => {
    const mostPlayedList = document.getElementById('mostPlayedList');
    const recentPlayedList = document.getElementById('recentPlayedList');

    if (mostPlayedList && window.ListeningHistory) {
      mostPlayedList.innerHTML = '';
      const topTracks = window.ListeningHistory.getMostPlayed(playlist, 10);
      if (topTracks.length === 0) {
        mostPlayedList.innerHTML = '<p style="color:#eedcc6; font-size:0.85rem;">এখনও কোনো গান পুরো বাজানো হয়নি।</p>';
      } else {
        topTracks.forEach((t, i) => {
          const item = document.createElement('div');
          item.className = 'dist-row';
          item.innerHTML = `
            <span style="width:24px; font-weight:700; color:var(--gold-vibrant);">${toBengaliNumber(i + 1)}.</span>
            <span class="dist-name" style="flex:1;">${escapeHtml(t.name)}</span>
            <span class="dist-count">${toBengaliNumber(t.playCount)} বার</span>
          `;
          mostPlayedList.appendChild(item);
        });
      }
    }

    if (recentPlayedList && window.ListeningHistory) {
      recentPlayedList.innerHTML = '';
      const recents = window.ListeningHistory.getRecentlyPlayed(15);
      if (recents.length === 0) {
        recentPlayedList.innerHTML = '<p style="color:#eedcc6; font-size:0.85rem;">প্লেলিস্ট শুরু হলে সম্প্রতি বাজানো গান এখানে দেখা যাবে।</p>';
      } else {
        recents.forEach((item, i) => {
          const row = document.createElement('div');
          row.className = 'dist-row';
          row.innerHTML = `
            <span style="width:24px; color:var(--gold-light);">${toBengaliNumber(i + 1)}.</span>
            <span class="dist-name" style="flex:1;">${escapeHtml(item.title || item.name || 'একক গান')}</span>
            <span style="font-size:0.75rem; color:#eedcc6;">${new Date(item.playedAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</span>
          `;
          recentPlayedList.appendChild(row);
        });
      }
    }
  };

  if (openAdminBtn && adminDashboardModal) {
    openAdminBtn.addEventListener('click', () => {
      renderAdminOverview();
      renderAdminSongsTable();
      renderAdminHistory();
      adminDashboardModal.classList.remove('hidden');
    });
  }

  if (closeAdminModalBtn && adminDashboardModal) {
    closeAdminModalBtn.addEventListener('click', () => {
      adminDashboardModal.classList.add('hidden');
    });
  }

  // Admin Tab Switching
  document.querySelectorAll('.admin-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetId = tabBtn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        if (targetId === 'tab-overview') renderAdminOverview();
        else if (targetId === 'tab-songs') renderAdminSongsTable();
        else if (targetId === 'tab-history') renderAdminHistory();
      }
    });
  });

  if (adminSongSearch) {
    adminSongSearch.addEventListener('input', renderAdminSongsTable);
  }
  if (adminMoodFilter) {
    adminMoodFilter.addEventListener('change', renderAdminSongsTable);
  }

  // ==========================================
  // Song Metadata Editor Sub-Modal
  // ==========================================
  let editingSongTarget = null;
  let editingSongCallback = null;

  const openSongEditModal = (song, callback) => {
    if (!songEditModal) return;
    editingSongTarget = song;
    editingSongCallback = callback;

    const analysis = song.metadata || (window.MoodClassifier ? window.MoodClassifier.analyzeSong(song) : { mood: [], timeSuitability: [] });

    const editSongId = document.getElementById('editSongId');
    const editSongName = document.getElementById('editSongName');
    const editSongArtist = document.getElementById('editSongArtist');
    const editSongCategory = document.getElementById('editSongCategory');
    const editSmartEligible = document.getElementById('editSmartEligible');

    if (editSongId) editSongId.value = song.id || '';
    if (editSongName) editSongName.value = song.name || '';
    if (editSongArtist) editSongArtist.value = song.artist || '';
    if (editSongCategory) editSongCategory.value = song.category || analysis.genre || '';
    if (editSmartEligible) editSmartEligible.checked = song.isSmartEligible !== false;

    // Check mood checkboxes
    const moods = song.moods || analysis.mood || [];
    document.querySelectorAll('#editMoodCheckboxes input').forEach(cb => {
      cb.checked = moods.includes(cb.value);
    });

    // Check time slot checkboxes
    const times = song.timeSuitability || analysis.timeSuitability || [];
    document.querySelectorAll('#editTimeCheckboxes input').forEach(cb => {
      cb.checked = times.includes(cb.value);
    });

    songEditModal.classList.remove('hidden');
  };

  if (closeSongEditBtn && songEditModal) {
    closeSongEditBtn.addEventListener('click', () => {
      songEditModal.classList.add('hidden');
    });
  }
  if (cancelSongEditBtn && songEditModal) {
    cancelSongEditBtn.addEventListener('click', () => {
      songEditModal.classList.add('hidden');
    });
  }

  if (saveSongEditBtn && songEditModal) {
    saveSongEditBtn.addEventListener('click', () => {
      if (!editingSongTarget) return;

      const editSongName = document.getElementById('editSongName');
      const editSongArtist = document.getElementById('editSongArtist');
      const editSongCategory = document.getElementById('editSongCategory');
      const editSmartEligible = document.getElementById('editSmartEligible');

      const selectedMoods = Array.from(document.querySelectorAll('#editMoodCheckboxes input:checked')).map(cb => cb.value);
      const selectedTimes = Array.from(document.querySelectorAll('#editTimeCheckboxes input:checked')).map(cb => cb.value);

      const updatedData = {
        name: editSongName ? editSongName.value.trim() : editingSongTarget.name,
        artist: editSongArtist ? editSongArtist.value.trim() : editingSongTarget.artist,
        category: editSongCategory ? editSongCategory.value.trim() : editingSongTarget.category,
        moods: selectedMoods.length > 0 ? selectedMoods : ['romantic'],
        timeSuitability: selectedTimes.length > 0 ? selectedTimes : ['evening'],
        isSmartEligible: editSmartEligible ? editSmartEligible.checked : true
      };

      Object.assign(editingSongTarget, updatedData);

      if (window.AdminManager) {
        window.AdminManager.saveSongOverrides(editingSongTarget.id, updatedData);
      }

      songEditModal.classList.add('hidden');
      showToast(`"${editingSongTarget.name}" গানের মেটাডাটা সংরক্ষিত হয়েছে ✔️`);

      if (editingSongCallback) editingSongCallback(editingSongTarget);
      renderPlaylist();
    });
  }

  // ==========================================
  // Auto-Categorization Review Modal Actions
  // ==========================================
  if (closeAutoCatBtn && autoCategoryModal) {
    closeAutoCatBtn.addEventListener('click', () => {
      autoCategoryModal.classList.add('hidden');
      if (pendingAutoCatResolve) pendingAutoCatResolve({ action: 'reject' });
    });
  }

  if (autoCatRejectBtn && autoCategoryModal) {
    autoCatRejectBtn.addEventListener('click', () => {
      autoCategoryModal.classList.add('hidden');
      if (pendingAutoCatResolve) pendingAutoCatResolve({ action: 'reject' });
      showToast('নতুন গানটি বাতিল করা হয়েছে');
    });
  }

  if (autoCatAcceptBtn && autoCategoryModal) {
    autoCatAcceptBtn.addEventListener('click', () => {
      autoCategoryModal.classList.add('hidden');
      if (pendingAutoCatResolve) pendingAutoCatResolve({ action: 'accept', song: pendingAutoCatSong });
    });
  }

  if (autoCatEditBtn && autoCategoryModal) {
    autoCatEditBtn.addEventListener('click', () => {
      autoCategoryModal.classList.add('hidden');
      openSongEditModal(pendingAutoCatSong, (updatedSong) => {
        if (pendingAutoCatResolve) pendingAutoCatResolve({ action: 'accept', song: updatedSong });
      });
    });
  }

  // Set default starting volume
  setVolume(0.85);

  // Initialize Single Songs Library & Auto-play
  await loadSavedSongs();
  initYouTubePlayer();
});
