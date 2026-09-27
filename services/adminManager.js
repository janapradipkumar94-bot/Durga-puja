/**
 * AdminManager Service
 * Computes deep library statistics, mood distributions, time slot breakdowns,
 * handles metadata edits, smart selection toggles, and new song auto-categorization.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AdminManager = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_EDITS = 'SmartPlayer_SongOverrides';

  class DashboardManager {
    constructor() {
      this.overrides = this.loadOverrides();
    }

    loadOverrides() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_EDITS);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    }

    saveOverrides() {
      try {
        localStorage.setItem(STORAGE_KEY_EDITS, JSON.stringify(this.overrides));
      } catch (e) {}
    }

    applyOverrides(tracks) {
      if (!Array.isArray(tracks)) return tracks;
      return tracks.map(track => {
        if (this.overrides[track.id]) {
          return { ...track, ...this.overrides[track.id] };
        }
        return track;
      });
    }

    updateSong(trackId, updates) {
      this.overrides[trackId] = { ...(this.overrides[trackId] || {}), ...updates };
      this.saveOverrides();
    }

    toggleSmartEligibility(trackId, currentState) {
      const newState = !currentState;
      this.updateSong(trackId, { isSmartEligible: newState });
      return newState;
    }

    getSongOverrides() {
      return this.overrides;
    }

    saveSongOverrides(trackId, updates) {
      this.updateSong(trackId, updates);
    }

    toggleSmartSelection(trackId, checked) {
      this.updateSong(trackId, { isSmartEligible: checked });
      return checked;
    }

    computeLibraryMetrics(tracks) {
      return this.computeMetrics(tracks);
    }

    /**
     * Compute comprehensive statistics across the entire music library
     */
    computeMetrics(tracks) {
      const activeTracks = this.applyOverrides(tracks || []);
      const totalSongs = activeTracks.length;

      // Artists & Categories
      const artistsSet = new Set();
      const categoriesSet = new Set();
      const moodsCount = {
        devotional: 0,
        peaceful: 0,
        romantic: 0,
        emotional: 0,
        energetic: 0,
        nostalgic: 0
      };
      const genresCount = {};
      const timeSlotsCount = {
        earlyMorning: 0,
        morning: 0,
        midday: 0,
        afternoon: 0,
        evening: 0,
        night: 0,
        lateNight: 0
      };

      const g = (typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : root));

      activeTracks.forEach(track => {
        if (track.artist) artistsSet.add(track.artist.split('•')[0].trim());
        if (track.category) categoriesSet.add(track.category.trim());

        const meta = g.RecommendationEngine 
          ? g.RecommendationEngine.getOrAnalyzeMeta(track) 
          : (g.MoodClassifier ? g.MoodClassifier.analyzeSong(track) : null);

        if (meta) {
          // Moods
          if (Array.isArray(meta.mood)) {
            meta.mood.forEach(m => {
              if (moodsCount[m] !== undefined) moodsCount[m]++;
            });
          }

          // Genres
          const gen = meta.genre || track.category || 'সাধারণ বাংলা গান';
          genresCount[gen] = (genresCount[gen] || 0) + 1;

          // Time Slots
          if (Array.isArray(meta.timeSuitability)) {
            meta.timeSuitability.forEach(slot => {
              if (timeSlotsCount[slot] !== undefined) timeSlotsCount[slot]++;
            });
          }
        }
      });

      // History & Plays
      const recentHistory = g.ListeningHistory ? g.ListeningHistory.getHistory() : [];
      const mostPlayed = g.ListeningHistory ? g.ListeningHistory.getMostPlayed(8) : [];

      return {
        totalSongs,
        totalArtists: artistsSet.size,
        totalCategories: categoriesSet.size,
        moodsCount,
        songsByMood: moodsCount,
        genresCount,
        songsByGenre: genresCount,
        timeSlotsCount,
        songsBySlot: timeSlotsCount,
        recentHistory,
        mostPlayed
      };
    }
  }

  return new DashboardManager();
});
