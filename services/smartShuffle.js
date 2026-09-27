/**
 * SmartShuffle Service
 * Implements intelligent weighted selection rather than pure uniform random,
 * balancing high compatibility with variety and serendipity.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SmartShuffle = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  class SmartShuffleEngine {
    /**
     * Pick one track from scored candidate tracks using weighted probabilistic sampling
     */
    pickWeightedTrack(scoredCandidates, serendipityRate = 0.12) {
      if (!scoredCandidates || scoredCandidates.length === 0) return null;
      if (scoredCandidates.length === 1) return scoredCandidates[0].track;

      // 12% chance of serendipitous wildcard from the bottom half of eligible songs
      if (Math.random() < serendipityRate && scoredCandidates.length > 5) {
        const midPoint = Math.floor(scoredCandidates.length / 2);
        const wildcardPool = scoredCandidates.slice(midPoint);
        const randomChoice = wildcardPool[Math.floor(Math.random() * wildcardPool.length)];
        if (randomChoice && randomChoice.track) {
          return randomChoice.track;
        }
      }

      // Compute weighted lottery
      // Weights are (finalScore ^ 1.8) * recencyPenalty
      let totalWeight = 0;
      const weightedItems = scoredCandidates.map(item => {
        const baseScore = Math.max(1, item.finalScore || 1);
        const recency = item.recencyPenalty !== undefined ? item.recencyPenalty : 1.0;
        const weight = Math.pow(baseScore, 1.8) * recency;
        totalWeight += weight;
        return { track: item.track, weight, score: item.finalScore };
      });

      if (totalWeight <= 0) {
        return scoredCandidates[0].track;
      }

      // Roll random threshold
      let roll = Math.random() * totalWeight;
      for (const item of weightedItems) {
        if (roll <= item.weight) {
          return item.track;
        }
        roll -= item.weight;
      }

      return weightedItems[0].track;
    }

    /**
     * Generate a weighted shuffled playlist array of given length
     */
    generateWeightedQueue(scoredCandidates, desiredCount = 20) {
      if (!scoredCandidates || scoredCandidates.length === 0) return [];
      const pool = [...scoredCandidates];
      const result = [];
      const maxPicks = Math.min(desiredCount, pool.length);

      for (let i = 0; i < maxPicks; i++) {
        const picked = this.pickWeightedTrack(pool, 0.08);
        if (!picked) break;
        result.push(picked);

        // Remove picked from pool
        const idx = pool.findIndex(item => item.track.id === picked.id);
        if (idx !== -1) {
          pool.splice(idx, 1);
        }
      }

      return result;
    }
  }

  return new SmartShuffleEngine();
});
