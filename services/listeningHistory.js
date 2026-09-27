/**
 * ListeningHistory Service
 * Tracks playback history (last 20 tracks), play counts, and computes
 * intelligent recency penalties to avoid repetitiveness.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ListeningHistory = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_HISTORY = 'SmartPlayer_ListeningHistory';
  const STORAGE_KEY_COUNTS = 'SmartPlayer_PlayCounts';
  const MAX_HISTORY = 20;

  class HistoryManager {
    constructor() {
      this.history = this.loadHistory();
      this.playCounts = this.loadCounts();
    }

    loadHistory() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    loadCounts() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_COUNTS);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(this.history));
        localStorage.setItem(STORAGE_KEY_COUNTS, JSON.stringify(this.playCounts));
      } catch (e) {}
    }

    recordPlay(track) {
      if (!track || !track.id) return;

      const entry = {
        id: track.id,
        title: track.name || track.title,
        artist: track.artist || '',
        category: track.category || '',
        timestamp: Date.now()
      };

      // Add to front of history
      this.history.unshift(entry);
      if (this.history.length > MAX_HISTORY) {
        this.history.pop();
      }

      // Increment play counts
      this.playCounts[track.id] = (this.playCounts[track.id] || 0) + 1;
      this.save();
    }

    /**
     * Compute multiplier (0.05 to 1.0) based on recency
     */
    getRecencyPenalty(trackId, totalLibrarySize = 100) {
      const idx = this.history.findIndex(h => h.id === trackId);
      if (idx === -1) return 1.0;

      // Relax penalty if library is small
      if (totalLibrarySize < 10) return 0.75;
      if (totalLibrarySize < 25) return idx < 3 ? 0.25 : 0.8;

      if (idx < 3) return 0.05;   // Played in last 3 songs
      if (idx < 8) return 0.30;   // Played 4-8 songs ago
      if (idx < 15) return 0.65;  // Played 9-15 songs ago
      return 0.85;                // Played 16-20 songs ago
    }

    getHistory() {
      return [...this.history];
    }

    getMostPlayed(limit = 10) {
      const sorted = Object.entries(this.playCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
      return sorted.map(([id, count]) => ({ id, count }));
    }

    clearHistory() {
      this.history = [];
      this.save();
    }
  }

  return new HistoryManager();
});
