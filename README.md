# শারদীয় সংগীত ও স্মৃতি 🌸
### Durga Puja Serene Player — Time & Mood Based Bengali Music Player

> **পরিকল্পনা ও রূপায়ণে:** প্রদীপ কুমার জানা (Pradip Kumar Jana)  
> *A soulful, accessible, and intelligent Bengali music streaming web application crafted for Durga Puja, seniors, and timeless melody lovers.*

---

## 🌟 প্রধান বৈশিষ্ট্যসমূহ (Key Features)

### 1. 🕒 স্মার্ট সময় ও মেজাজভিত্তিক মিউজিক সিস্টেম (Smart Time & Mood Engine)
* **৭টি প্রহর অনুসারে স্বয়ংক্রিয় গান নির্বাচন:**
  - 🌅 **ভোর (Early Morning — ৪:০০ AM থেকে ৭:০০ AM):** আগমনী গান, মহালয়ার স্তোত্র, শান্ত রবীন্দ্রসংগীত।
  - ☀️ **সকাল (Morning — ৭:০০ AM থেকে ১১:০০ AM):** উৎসবের সূচনা, আনন্দময় পূজার গান, ভক্তিগীতি।
  - 🌤️ **দুপুর (Midday — ১১:০০ AM থেকে ৩:০০ PM):** ধীর ও মিষ্টি মেলোডি, ক্লাসিক আধুনিক গান।
  - 🌇 **বিকেল (Afternoon — ৩:০০ PM থেকে ৫:৩০ PM):** স্মৃতিকাতর নস্টালজিক সুর, হেমন্ত-মান্না-সন্ধ্যা মুখোপাধ্যায়।
  - 🌆 **সন্ধ্যা (Evening — ৫:৩০ PM থেকে ৮:০০ PM):** আরতি, ঢাকের বোল, শঙ্খধ্বনি ও উৎসবমুখর ধামাকা।
  - 🌙 **রাত (Night — ৮:০০ PM থেকে ১১:০০ PM):** রোমান্টিক ভালোবাসার গান ও মেলোডি।
  - 🌌 **গভীর রাত (Late Night — ১১:০০ PM থেকে ৪:০০ AM):** অত্যন্ত শান্ত ও ধ্যানমগ্ন লিরিক্যাল সুর।
* **মসৃণ প্রহর পরিবর্তন (Smooth Boundary Transitions):** এক প্রহর থেকে অন্য প্রহরে যাওয়ার সময় সুরের সামঞ্জস্যপূর্ণ সংমিশ্রণ।
* **টাইম সিমুলেটর (Interactive Time Simulator):** যেকোনো সময় যেকোনো প্রহরের আবহ এক ক্লিকে পরীক্ষা করার সুবিধা।

### 2. 🎶 ১৩৭+ শারদীয় ও বাংলা একক গান সম্ভার (137+ Bengali Tracks)
* বীরেন্দ্রকৃষ্ণ ভদ্রের মহালয়ার স্তোত্র পাঠ।
* মিতা চ্যাটার্জী, শ্রীকান্ত আচার্য, কিশোর কুমার, আশা ভোঁসলে, কুমার শানু, অলকা ইয়াগনিক, লতা মঙ্গেশকর, হেমন্ত মুখোপাধ্যায়ের কালজয়ী গান।
* ইউটিউব ভিডিও প্লেব্যাক ও স্থানীয় অডিওর সমন্বিত স্ট্রিমিং।

### 3. 👵 প্রবীণ ও বয়োজ্যেষ্ঠদের উপযোগী ইন্টারফেস (Senior Accessibility)
* বড় বোতাম, স্পষ্ট বাংলা লেখা ও উচ্চ বৈসাদৃশ্য (High-Contrast Maroon & Gold theme)।
* ফন্ট সাইজ বড় করার তাৎক্ষণিক বোতাম (Font Resizer: Normal / Large / Extra Large)।
* সহজ কীবোর্ড শর্টকাট (স্পেসবার দিয়ে প্লে/পজ, অ্যারো কী দিয়ে সুর এগিয়ে নেওয়া বা সাউন্ড নিয়ন্ত্রণ)।
* সম্পূর্ণ অফলাইন সাপোর্ট (IndexedDB) — ইন্টারনেট ছাড়াও নিজস্ব গান যোগ ও সংরক্ষণ করা যায়।

### 4. 🪷 ঐতিহ্যবাহী সাংস্কৃতিক অলংকরণ (Cultural Aesthetics)
* জীবন্ত প্রদীপের শিখা (Flickering CSS Diya) ও আলপনা বর্ডার।
* ঘূর্ণায়মান ভিনাইল রেকর্ড ও ওম (ॐ) প্রতীক।
* অঞ্জলির ঝরে পড়া পদ্মপাপড়ি (Pushpanjali Lotus Petals animation)।
* শঙ্খধ্বনি, মন্দিরের ঘণ্টা ও আগমনী তানপুরার জীবন্ত সিন্থেসাইজার (Web Audio API)।

---

## 🛠️ প্রযুক্তিগত স্থাপত্য (Tech Stack)

* **Frontend:** HTML5, Modern Vanilla CSS3, Vanilla JavaScript (ES6+)
* **Audio Engine:** HTML5 Audio API, YouTube IFrame Player API, Web Audio Synthesizer
* **Local Storage:** IndexedDB (`musicDB`) for zero-loss offline audio persistence
* **Recommendation System:** Modular Services Architecture:
  - `services/moodClassifier.js`
  - `services/timeBasedPlaylist.js`
  - `services/listeningHistory.js`
  - `services/smartShuffle.js`
  - `services/userPreferences.js`
  - `services/recommendationEngine.js`
  - `services/adminManager.js`
  - `services/eventWeatherBridge.js`

---

## 🚀 লোকাল সার্ভারে চালানোর নির্দেশিকা (How to Run)

1. রিপোজিটরিটি ক্লোন করুন:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. যেকোনো লোকাল সার্ভার চালু করুন (যেমন Python):
   ```bash
   python -m http.server 8080
   ```
3. ব্রাউজারে প্রবেশ করুন:
   ```
   http://localhost:8080/index.html
   ```

---

## 👨‍💻 কৃতিত্ব (Author & Credits)

* **পরিকল্পনা ও রূপায়ণে:** **প্রদীপ কুমার জানা (Pradip Kumar Jana)**
* শারদীয় দুর্গোৎসবের প্রীতি ও শুভেচ্ছা সহ নির্মিত।
