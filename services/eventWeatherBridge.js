/**
 * EventWeatherBridge Service
 * Extensible plugin architecture for special seasonal events, festivals,
 * and weather conditions (Rainy Day, Winter, Durga Puja, Poila Boishakh).
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.EventWeatherBridge = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const REGISTERED_EVENTS = {
    durgaPuja: {
      id: 'durgaPuja',
      nameBn: 'শারদীয়া দুর্গোৎসব',
      icon: '🪷',
      active: true, // Default active for this Durga Puja player
      boostTags: ['devotional', 'energetic', 'agomoni'],
      boostMultiplier: 1.35
    },
    rainyDay: {
      id: 'rainyDay',
      nameBn: 'বৃষ্টিস্নাত বাদল দিন',
      icon: '🌧️',
      active: false,
      boostTags: ['emotional', 'peaceful'],
      boostMultiplier: 1.40
    },
    bengaliNewYear: {
      id: 'bengaliNewYear',
      nameBn: 'শুভ নববর্ষ ও বৈশাখী মেলা',
      icon: '🌾',
      active: false,
      boostTags: ['nostalgic', 'energetic'],
      boostMultiplier: 1.30
    },
    valentines: {
      id: 'valentines',
      nameBn: 'বসন্ত ও ভালোবাসার দিন',
      icon: '💖',
      active: false,
      boostTags: ['romantic'],
      boostMultiplier: 1.45
    }
  };

  class EventWeatherSystem {
    constructor() {
      this.events = { ...REGISTERED_EVENTS };
    }

    getActiveEvents() {
      return Object.values(this.events).filter(e => e.active);
    }

    toggleEvent(eventId, activeState = null) {
      if (this.events[eventId]) {
        this.events[eventId].active = activeState !== null ? !!activeState : !this.events[eventId].active;
      }
      return this.events[eventId];
    }

    /**
     * Compute event boost multiplier for a given song metadata
     */
    getEventBoost(songMeta) {
      if (!songMeta) return 1.0;
      let totalMultiplier = 1.0;

      const active = this.getActiveEvents();
      for (const ev of active) {
        let hasMatch = false;
        for (const t of ev.boostTags) {
          if (songMeta.mood && songMeta.mood.includes(t)) {
            hasMatch = true;
            break;
          }
        }
        if (hasMatch) {
          totalMultiplier *= ev.boostMultiplier;
        }
      }

      return Math.min(1.8, totalMultiplier);
    }
  }

  return new EventWeatherSystem();
});
