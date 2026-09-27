/**
 * UserPreferences Service
 * Manages user mood/genre sliders (0-100), tag toggles, favorite artists,
 * and computes preference compatibility scores for recommendations.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.UserPreferences = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'SmartPlayer_UserPreferences';

  const DEFAULT_PREFERENCES = {
    sliders: {
      romantic: 65,
      peaceful: 75,
      energetic: 55,
      emotional: 60,
      devotional: 80,
      classic: 75
    },
    activeTags: [
      'Romantic', 'Peaceful', 'Devotional', 'Classic Bengali',
      'Modern Bengali', 'Nostalgic', 'Rabindra Sangeet', 'Agomoni'
    ],
    favoriteArtists: [],
    smartModeEnabled: true // default Smart Mode ON
  };

  class PreferencesManager {
    constructor() {
      this.state = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            sliders: { ...DEFAULT_PREFERENCES.sliders, ...(parsed.sliders || {}) },
            activeTags: Array.isArray(parsed.activeTags) ? parsed.activeTags : DEFAULT_PREFERENCES.activeTags,
            favoriteArtists: Array.isArray(parsed.favoriteArtists) ? parsed.favoriteArtists : [],
            smartModeEnabled: parsed.smartModeEnabled !== undefined ? parsed.smartModeEnabled : true
          };
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(DEFAULT_PREFERENCES));
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {}
    }

    getSliders() {
      return { ...this.state.sliders };
    }

    setSlider(key, value) {
      if (this.state.sliders[key] !== undefined) {
        this.state.sliders[key] = Math.max(0, Math.min(100, parseInt(value, 10)));
        this.save();
      }
    }

    getActiveTags() {
      return [...this.state.activeTags];
    }

    toggleTag(tag) {
      const idx = this.state.activeTags.indexOf(tag);
      if (idx === -1) {
        this.state.activeTags.push(tag);
      } else {
        this.state.activeTags.splice(idx, 1);
      }
      this.save();
      return this.isTagActive(tag);
    }

    isTagActive(tag) {
      return this.state.activeTags.includes(tag);
    }

    isSmartMode() {
      return !!this.state.smartModeEnabled;
    }

    setSmartMode(enabled) {
      this.state.smartModeEnabled = !!enabled;
      this.save();
    }

    resetDefaults() {
      this.state = JSON.parse(JSON.stringify(DEFAULT_PREFERENCES));
      this.save();
      return this.state;
    }

    /**
     * Compute User Preference Compatibility Score (0-100) for a song
     */
    computePreferenceScore(songMeta) {
      if (!songMeta) return 60;
      const s = this.state.sliders;

      let score = 0;
      let totalWeight = 0;

      // Match sliders with song meta scores
      if (songMeta.romanticScore !== undefined) {
        score += (songMeta.romanticScore * (s.romantic / 100));
        totalWeight += (s.romantic / 100);
      }
      if (songMeta.peacefulScore !== undefined) {
        score += (songMeta.peacefulScore * (s.peaceful / 100));
        totalWeight += (s.peaceful / 100);
      }
      if (songMeta.energeticScore !== undefined) {
        score += (songMeta.energeticScore * (s.energetic / 100));
        totalWeight += (s.energetic / 100);
      }
      if (songMeta.emotionalScore !== undefined) {
        score += (songMeta.emotionalScore * (s.emotional / 100));
        totalWeight += (s.emotional / 100);
      }
      if (songMeta.devotionalScore !== undefined) {
        score += (songMeta.devotionalScore * (s.devotional / 100));
        totalWeight += (s.devotional / 100);
      }
      if (songMeta.nostalgicScore !== undefined) {
        score += (songMeta.nostalgicScore * (s.classic / 100));
        totalWeight += (s.classic / 100);
      }

      const basePrefScore = totalWeight > 0 ? (score / totalWeight) : 60;

      // Tag bonus
      let tagBonus = 0;
      const combined = `${songMeta.title || ''} ${songMeta.category || ''} ${songMeta.genre || ''}`.toLowerCase();
      for (const tag of this.state.activeTags) {
        if (combined.includes(tag.toLowerCase())) {
          tagBonus += 5;
        }
      }

      return Math.min(100, Math.round(basePrefScore + tagBonus));
    }
  }

  return new PreferencesManager();
});
