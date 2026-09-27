/**
 * Durga Puja Music DB - IndexedDB Storage Helper
 * Persists user's imported MP3 files locally in their browser
 * so they don't have to re-select songs every visit.
 */

const DB_NAME = 'DurgaPujaMusicDB';
const DB_VERSION = 1;
const STORE_NAME = 'songs';

class MusicDatabase {
  constructor() {
    this.db = null;
    this.isReady = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('addedAt', 'addedAt', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.warn('IndexedDB failed to open:', event.target.error);
        resolve(null); // Fallback gracefully if storage is restricted
      };
    });
  }

  async saveSong(file) {
    await this.isReady;
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const songRecord = {
        name: file.name.replace(/\.[^/.]+$/, ''), // Clean title
        originalName: file.name,
        size: file.size,
        type: file.type || 'audio/mp3',
        blob: file, // Store the Blob directly
        addedAt: Date.now()
      };

      const request = store.add(songRecord);
      request.onsuccess = (e) => {
        songRecord.id = e.target.result;
        resolve(songRecord);
      };
      request.onerror = (e) => {
        console.warn('Error saving song to IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  }

  async saveOnlineTrack(trackData) {
    await this.isReady;
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const songRecord = {
        name: trackData.name,
        originalName: trackData.name,
        artist: trackData.artist || 'অনলাইন গান',
        audioUrl: trackData.audioUrl || null,
        isOnline: true,
        isYoutube: !!trackData.isYoutube,
        videoId: trackData.videoId || null,
        thumbnail: trackData.thumbnail || null,
        size: 0,
        type: trackData.isYoutube ? 'video/youtube' : 'audio/mpeg',
        blob: null,
        addedAt: Date.now()
      };

      const request = store.add(songRecord);
      request.onsuccess = (e) => {
        songRecord.id = e.target.result;
        resolve(songRecord);
      };
      request.onerror = (e) => {
        console.warn('Error saving online song to IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  }

  async getAllSongs() {
    await this.isReady;
    if (!this.db) return [];

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  }

  async deleteSong(id) {
    await this.isReady;
    if (!this.db) return false;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }

  async clearAllSongs() {
    await this.isReady;
    if (!this.db) return false;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }
}

// Global DB instance
window.musicDB = new MusicDatabase();
