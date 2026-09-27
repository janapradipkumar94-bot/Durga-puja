/**
 * RecommendationEngine Service
 * Core brain that unifies Time + Mood + User Preferences + Listening History
 * to generate dynamic smart playlists and pick the next track.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RecommendationEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const getGlobal = () => (typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : root));

  class Engine {
    constructor() {
      this.songMetaCache = new Map(); // id -> analyzed metadata
    }

    /**
     * Get or compute rich metadata for a track
     */
    getOrAnalyzeMeta(track) {
      if (!track) return null;
      const key = track.id || track.name;
      if (this.songMetaCache.has(key)) {
        return this.songMetaCache.get(key);
      }

      const g = getGlobal();
      if (g.MoodClassifier) {
        const meta = g.MoodClassifier.analyzeSong(track);
        this.songMetaCache.set(key, meta);
        return meta;
      }

      return null;
    }

    /**
     * Compute compatibility score for a song at the current time & mood
     */
    scoreTrack(track, timeSlotInfo = null) {
      if (!track) return 0;
      if (track.isSmartEligible === false) return 0;

      const g = getGlobal();
      const meta = this.getOrAnalyzeMeta(track);
      if (!meta) return 50;

      const timeInfo = timeSlotInfo || (g.TimeBasedPlaylist ? g.TimeBasedPlaylist.getCurrentTimeSlotInfo() : null);
      if (!timeInfo) return 50;

      const primary = timeInfo.primarySlot;
      const secondary = timeInfo.secondarySlot;
      const ratio = timeInfo.transitionRatio;

      // 1. Time Compatibility (Interpolated across boundaries)
      const primaryScore = meta[primary.scoreField] !== undefined ? meta[primary.scoreField] : 50;
      let timeCompatibility = primaryScore;
      if (secondary && ratio < 1.0) {
        const secondaryScore = meta[secondary.scoreField] !== undefined ? meta[secondary.scoreField] : 50;
        timeCompatibility = (primaryScore * ratio) + (secondaryScore * (1.0 - ratio));
      }

      // 2. Mood Compatibility (Match song moods with time slot preferred tags)
      let moodMatchPoints = 0;
      const prefTags = primary.preferredTags || [];
      for (const t of prefTags) {
        if (meta.mood && meta.mood.includes(t)) {
          moodMatchPoints += 25;
        }
      }
      const moodCompatibility = Math.min(100, Math.max(20, moodMatchPoints));

      // 3. User Preference Compatibility
      let userPrefScore = 60;
      if (g.UserPreferences) {
        userPrefScore = g.UserPreferences.computePreferenceScore(meta);
      }

      // 4. Genre & Preferred Category Affinity
      let genreBonus = 0;
      const primaryGenres = primary.preferredGenres || [];
      for (const gen of primaryGenres) {
        if ((track.category && track.category.includes(gen)) || (meta.genre && meta.genre.includes(gen))) {
          genreBonus += 15;
          break;
        }
      }

      // 5. Recency Penalty (Listening History)
      let recencyPenalty = 1.0;
      if (g.ListeningHistory) {
        recencyPenalty = g.ListeningHistory.getRecencyPenalty(track.id);
      }

      // 6. Serendipity Jitter (±4 points to break rigid sorting ties)
      const jitter = (Math.random() * 8) - 4;

      // Final Normalized Score (0 - 100)
      // Weight distribution: Time 35% + Mood 25% + UserPref 25% + Genre 15%
      const rawScore = ((timeCompatibility * 0.35) + (moodCompatibility * 0.25) + (userPrefScore * 0.25) + (genreBonus * 1.5)) * recencyPenalty + jitter;
      const finalScore = Math.max(1, Math.min(100, Math.round(rawScore)));

      return {
        track,
        meta,
        timeCompatibility: Math.round(timeCompatibility),
        moodCompatibility: Math.round(moodCompatibility),
        userPrefScore: Math.round(userPrefScore),
        recencyPenalty,
        finalScore
      };
    }

    /**
     * Score all songs in a library and return ranked list
     */
    scoreLibrary(tracks, timeSlotInfo = null) {
      if (!Array.isArray(tracks) || tracks.length === 0) return [];
      const g = getGlobal();
      const info = timeSlotInfo || (g.TimeBasedPlaylist ? g.TimeBasedPlaylist.getCurrentTimeSlotInfo() : null);

      const scored = tracks.map(t => this.scoreTrack(t, info));
      scored.sort((a, b) => b.finalScore - a.finalScore);
      return scored;
    }

    /**
     * Select the best next track dynamically
     */
    pickNextSmartTrack(tracks, currentTrackId = null) {
      const candidates = tracks.filter(t => t.id !== currentTrackId);
      if (candidates.length === 0) return tracks[0] || null;

      const scored = this.scoreLibrary(candidates);
      // Top 30% or top 15 songs form the candidate pool for smart shuffle lottery
      const poolSize = Math.max(5, Math.min(25, Math.ceil(scored.length * 0.35)));
      const topPool = scored.slice(0, poolSize);

      const g = getGlobal();
      if (g.SmartShuffle) {
        return g.SmartShuffle.pickWeightedTrack(topPool, 0.10);
      }

      return topPool[0].track;
    }

    /**
     * Generate dynamic Smart Playlist queue
     */
    generateSmartQueue(tracks, count = 30) {
      const scored = this.scoreLibrary(tracks);
      const g = getGlobal();
      if (g.SmartShuffle) {
        return g.SmartShuffle.generateWeightedQueue(scored, count);
      }
      return scored.slice(0, count).map(s => s.track);
    }
  }

  return new Engine();
});
