/**
 * TimeBasedPlaylist Service
 * Manages the 7 intelligent time slots, boundary transitions, time simulation,
 * and mood generation for the Bengali smart player.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TimeBasedPlaylist = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 7 Defined Time Slots with Bengali Metadata & Preferences
  const TIME_SLOTS = {
    earlyMorning: {
      id: 'earlyMorning',
      nameEn: 'Early Morning',
      nameBn: 'ভোরবেলা',
      startHour: 4.0, // 4:00 AM
      endHour: 7.0,   // 7:00 AM
      greetingBn: 'শুভ প্রত্যুষ ও প্রভাতী বন্দনা',
      icon: '🌅',
      moodBn: 'শান্ত, আধ্যাত্মিক ও ধ্যানমগ্ন',
      moodEn: 'Peaceful, Spiritual, Calm, Devotional',
      preferredTags: ['devotional', 'peaceful', 'agomoni'],
      preferredGenres: ['শারদীয় ভক্তিগীতি', 'মহালয়া ও চণ্ডীপাঠ', 'রবীন্দ্রসংগীত'],
      descBn: 'আগমণী সুর, প্রভাতী চণ্ডীপাঠ ও শান্ত রবীন্দ্রসংগীতের পবিত্র আবহ',
      scoreField: 'earlyMorningScore'
    },
    morning: {
      id: 'morning',
      nameEn: 'Morning',
      nameBn: 'সকালবেলা',
      startHour: 7.0,  // 7:00 AM
      endHour: 11.0,  // 11:00 AM
      greetingBn: 'সুপ্রভাত, শারদ সকালের শুভেচ্ছা',
      icon: '☀️',
      moodBn: 'সতেজ, ইতিবাচক ও উৎসবমুখর',
      moodEn: 'Fresh, Positive, Energetic, Light',
      preferredTags: ['energetic', 'pleasant', 'devotional'],
      preferredGenres: ['মিতা চ্যাটার্জি', 'শারদীয় উৎসব', 'আধুনিক বাংলা গান'],
      descBn: 'সকালের সতেজ সুর, মিতা চ্যাটার্জির জনপ্রিয় গান ও মিষ্টি সকালের আলো',
      scoreField: 'morningScore'
    },
    midday: {
      id: 'midday',
      nameEn: 'Midday',
      nameBn: 'দুপুরবেলা',
      startHour: 11.0, // 11:00 AM
      endHour: 15.0,   // 3:00 PM
      greetingBn: 'শুভ মধ্যাহ্ন ও মিষ্টি আলস্য',
      icon: '🌤️',
      moodBn: 'স্বস্তিদায়ক, মনোগ্রাহী ও মিষ্টি',
      moodEn: 'Light, Pleasant, Relaxed, Moderate energy',
      preferredTags: ['nostalgic', 'pleasant', 'romantic'],
      preferredGenres: ['বাংলা ক্লাসিক', 'পূজার ক্লাসিক', 'চিরসবুজ গান'],
      descBn: 'সোনার রোদে ক্লাসিক বাংলা সুর, নস্টালজিক মেলোডি ও প্রিয় গানের ডালি',
      scoreField: 'middayScore'
    },
    afternoon: {
      id: 'afternoon',
      nameEn: 'Afternoon',
      nameBn: 'বিকেলবেলা',
      startHour: 15.0, // 3:00 PM
      endHour: 17.5,   // 5:30 PM
      greetingBn: 'শুভ অপরাহ্ন ও স্নিগ্ধ বিকেল',
      icon: '🌇',
      moodBn: 'আবেগঘন, নস্টালজিক ও স্নিগ্ধ রোমান্টিক',
      moodEn: 'Relaxing, Emotional, Nostalgic, Calm romantic',
      preferredTags: ['nostalgic', 'emotional', 'peaceful'],
      preferredGenres: ['চিরসবুজ গান', 'বাংলা ক্লাসিক', 'মেলোডি'],
      descBn: 'শরতের পড়ন্ত বেলার সোনালী আলো, নরম সুর ও হৃদয়ের ফেলে আসা স্মৃতি',
      scoreField: 'afternoonScore'
    },
    evening: {
      id: 'evening',
      nameEn: 'Evening',
      nameBn: 'সন্ধ্যাবেলা',
      startHour: 17.5, // 5:30 PM
      endHour: 20.0,   // 8:00 PM
      greetingBn: 'শুভ সন্ধ্যা, সান্ধ্য আরতির সুর',
      icon: '🌆',
      moodBn: 'রোমান্টিক, উষ্ণ ও মিষ্টি সান্ধ্য সুর',
      moodEn: 'Romantic, Warm, Emotional, Relaxed',
      preferredTags: ['romantic', 'emotional', 'pleasant'],
      preferredGenres: ['রোমান্টিক বাংলা গান', 'পূজার ক্লাসিক', 'আধুনিক বাংলা গান'],
      descBn: 'সন্ধ্যা নামার মায়াবী সুর, মিষ্টি রোমান্টিক গান ও আরতির পবিত্র আলো',
      scoreField: 'eveningScore'
    },
    night: {
      id: 'night',
      nameEn: 'Night',
      nameBn: 'রাত্রিবেলা',
      startHour: 20.0, // 8:00 PM
      endHour: 23.0,   // 11:00 PM
      greetingBn: 'শুভ রাত্রি ও মধুর স্মৃতিচারণ',
      icon: '🌙',
      moodBn: 'গভীর রোমান্টিক, নস্টালজিক ও ভাবুক',
      moodEn: 'Romantic, Emotional, Deep, Nostalgic',
      preferredTags: ['romantic', 'emotional', 'nostalgic'],
      preferredGenres: ['রোমান্টিক বাংলা গান', 'বাংলা ক্লাসিক', 'মেলোডি'],
      descBn: 'রাতের নীরবতায় ক্লাসিক বাংলা সুর, গভীর রোমান্টিক গান ও ভালোবাসার গান',
      scoreField: 'nightScore'
    },
    lateNight: {
      id: 'lateNight',
      nameEn: 'Late Night',
      nameBn: 'গভীর রাত',
      startHour: 23.0, // 11:00 PM
      endHour: 4.0,    // 4:00 AM (spans midnight)
      greetingBn: 'গভীর রাতের নিঃশব্দ প্রশান্তি',
      icon: '🌌',
      moodBn: 'ধ্যানমগ্ন, গভীর প্রশান্তিময় ও স্নিগ্ধ',
      moodEn: 'Deep, Peaceful, Emotional, Relaxing',
      preferredTags: ['peaceful', 'emotional'],
      preferredGenres: ['রবীন্দ্রসংগীত', 'চিরসবুজ গান', 'শান্ত সুর'],
      descBn: 'শ্রীকান্ত আচার্যের গভীর সুর, ধীর লয়ের রবীন্দ্রসংগীত ও নিঝুম রাতের প্রশান্তি',
      scoreField: 'lateNightScore'
    }
  };

  // Attach convenience aliases on each slot
  Object.values(TIME_SLOTS).forEach(slot => {
    slot.greeting = slot.greetingBn;
    slot.name = slot.nameEn;
    slot.moodsBn = slot.moodBn.split(/[,•]+/).map(s => s.trim()).filter(Boolean);
    slot.hours = `${Math.floor(slot.startHour)}:00 - ${Math.floor(slot.endHour)}:00`;
  });

  // State
  let simulatedTime = null; // null for Real Time, or float (e.g. 18.5 for 6:30 PM)

  /**
   * Get effective current decimal hour (0.0 to 23.99)
   */
  function getCurrentDecimalHour() {
    if (simulatedTime !== null && typeof simulatedTime === 'number') {
      return simulatedTime;
    }
    const now = new Date();
    return now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);
  }

  /**
   * Format decimal hour to human Bengali time string (e.g. "সন্ধ্যা ৬:৩০")
   */
  function formatDecimalHourBn(decHour) {
    let hours = Math.floor(decHour);
    const minutes = Math.floor((decHour - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const padMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${displayHours}:${padMin} ${period}`;
  }

  /**
   * Detect current time slot and transition weights
   * Smoothly interpolates across boundary regions (Section 5)
   */
  function getCurrentTimeSlotInfo() {
    const hour = getCurrentDecimalHour();

    let primarySlot = null;
    let secondarySlot = null;
    let transitionRatio = 1.0; // 1.0 means 100% primary slot

    // Ordered slot check
    if (hour >= 4.0 && hour < 7.0) {
      primarySlot = TIME_SLOTS.earlyMorning;
      // Transition window near 7:00 AM (6:30 to 7:00)
      if (hour >= 6.5) {
        secondarySlot = TIME_SLOTS.morning;
        transitionRatio = 1.0 - ((hour - 6.5) / 0.5); // linearly decreases from 1.0 to 0.0
      }
    } else if (hour >= 7.0 && hour < 11.0) {
      primarySlot = TIME_SLOTS.morning;
      // Transition near 11:00 AM (10:30 to 11:00)
      if (hour >= 10.5) {
        secondarySlot = TIME_SLOTS.midday;
        transitionRatio = 1.0 - ((hour - 10.5) / 0.5);
      }
    } else if (hour >= 11.0 && hour < 15.0) {
      primarySlot = TIME_SLOTS.midday;
      // Transition near 3:00 PM (14:30 to 15:00)
      if (hour >= 14.5) {
        secondarySlot = TIME_SLOTS.afternoon;
        transitionRatio = 1.0 - ((hour - 14.5) / 0.5);
      }
    } else if (hour >= 15.0 && hour < 17.5) {
      primarySlot = TIME_SLOTS.afternoon;
      // Section 5 specified smooth transition from 5:00 PM to 5:30 PM:
      // 5:00 PM (17.0) -> 60% afternoon + 40% evening
      // 5:30 PM (17.5) -> 30% afternoon + 70% evening
      if (hour >= 17.0) {
        secondarySlot = TIME_SLOTS.evening;
        // From 17.0 to 17.5: transitionRatio drops from 0.60 to 0.30
        const progress = (hour - 17.0) / 0.5;
        transitionRatio = 0.60 - (progress * 0.30);
      }
    } else if (hour >= 17.5 && hour < 20.0) {
      primarySlot = TIME_SLOTS.evening;
      // Section 5 transition from 5:30 PM to 6:30 PM:
      // 5:30 PM (17.5): 70% evening, 30% afternoon
      // 6:00 PM (18.0): 90% evening, 10% afternoon
      // 6:30 PM (18.5): 100% evening
      if (hour < 18.5) {
        secondarySlot = TIME_SLOTS.afternoon;
        const progress = (hour - 17.5) / 1.0;
        transitionRatio = 0.70 + (progress * 0.30); // 0.70 to 1.0 evening
      } else if (hour >= 19.5) {
        // Transition towards Night
        secondarySlot = TIME_SLOTS.night;
        transitionRatio = 1.0 - ((hour - 19.5) / 0.5);
      }
    } else if (hour >= 20.0 && hour < 23.0) {
      primarySlot = TIME_SLOTS.night;
      // Transition towards Late Night (22:30 to 23:00)
      if (hour >= 22.5) {
        secondarySlot = TIME_SLOTS.lateNight;
        transitionRatio = 1.0 - ((hour - 22.5) / 0.5);
      }
    } else {
      // Late night: hour >= 23.0 or hour < 4.0
      primarySlot = TIME_SLOTS.lateNight;
      // Transition towards Early Morning near 4:00 AM (3:30 to 4:00)
      if (hour >= 3.5 && hour < 4.0) {
        secondarySlot = TIME_SLOTS.earlyMorning;
        transitionRatio = 1.0 - ((hour - 3.5) / 0.5);
      }
    }

    return {
      currentDecimalHour: hour,
      formattedTime: formatDecimalHourBn(hour),
      isSimulated: simulatedTime !== null,
      primarySlot,
      secondarySlot,
      transitionRatio: Math.max(0.1, Math.min(1.0, transitionRatio)),
      blendDescription: secondarySlot 
        ? `${Math.round(transitionRatio * 100)}% ${primarySlot.nameBn} + ${Math.round((1 - transitionRatio) * 100)}% ${secondarySlot.nameBn}`
        : `${primarySlot.nameBn} (১০০%)`
    };
  }

  /**
   * Set simulated time (e.g. 18.75 for 6:45 PM) or null for Real Time
   */
  function setSimulatedTime(hour) {
    if (hour === null || hour === undefined) {
      simulatedTime = null;
    } else {
      simulatedTime = Math.max(0, Math.min(23.99, parseFloat(hour)));
    }
    return getCurrentTimeSlotInfo();
  }

  function getActiveTimeSlot() {
    const info = getCurrentTimeSlotInfo();
    return info.primarySlot;
  }

  function getSlotBlendInfo() {
    const info = getCurrentTimeSlotInfo();
    return {
      isTransitioning: !!info.secondarySlot,
      label: info.blendDescription,
      primaryRatio: info.transitionRatio,
      secondaryRatio: info.secondarySlot ? (1 - info.transitionRatio) : 0,
      primarySlot: info.primarySlot,
      secondarySlot: info.secondarySlot
    };
  }

  function getCurrentTimeString() {
    const info = getCurrentTimeSlotInfo();
    return info.formattedTime;
  }

  function resetToRealTime() {
    return setSimulatedTime(null);
  }

  return {
    TIME_SLOTS,
    SLOTS: Object.values(TIME_SLOTS),
    getCurrentDecimalHour,
    getCurrentTimeSlotInfo,
    getActiveTimeSlot,
    getSlotBlendInfo,
    getCurrentTimeString,
    setSimulatedTime,
    resetToRealTime,
    formatDecimalHourBn
  };
});
