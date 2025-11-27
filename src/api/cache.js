/**
 * IndexedDB Cache Manager
 * Handles storing and retrieving cached API responses with TTL support
 */

import { openDB } from "idb";

const DB_NAME = "namaz-cache";
const STORE_NAME = "api-responses";
const DB_VERSION = 1;
const DEBUG = false; // Set to true for debug logging

/**
 * Initialize IndexedDB database
 */
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    },
  });
};

/**
 * Set cached data in IndexedDB
 * @param {string} key - Unique cache key
 * @param {object} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 */
export const setCached = async (key, data, ttl) => {
  try {
    const db = await initDB();
    const expiresAt = Date.now() + ttl;

    await db.put(STORE_NAME, {
      key,
      data,
      expiresAt,
      createdAt: Date.now(),
    });

    if (DEBUG) console.log(`[Cache] Set cache for key: ${key}, expires in ${ttl}ms`);
    return true;
  } catch (error) {
    console.error(`[Cache] Failed to set cache for key: ${key}`, error);
    return false;
  }
};

/**
 * Get cached data from IndexedDB
 * @param {string} key - Unique cache key
 * @returns {object|null} Cached data or null if expired/not found
 */
export const getCached = async (key) => {
  try {
    const db = await initDB();
    const cached = await db.get(STORE_NAME, key);

    if (!cached) {
      if (DEBUG) console.log(`[Cache] No cache found for key: ${key}`);
      return null;
    }

    // Check if cache has expired
    if (cached.expiresAt < Date.now()) {
      if (DEBUG) console.log(`[Cache] Cache expired for key: ${key}`);
      await deleteCached(key);
      return null;
    }

    if (DEBUG) console.log(`[Cache] Retrieved cache for key: ${key}`);
    return cached.data;
  } catch (error) {
    console.error(`[Cache] Failed to get cache for key: ${key}`, error);
    return null;
  }
};

/**
 * Delete cached data from IndexedDB
 * @param {string} key - Unique cache key
 */
export const deleteCached = async (key) => {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, key);
    if (DEBUG) console.log(`[Cache] Deleted cache for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`[Cache] Failed to delete cache for key: ${key}`, error);
    return false;
  }
};

/**
 * Clear all cached data
 */
export const clearAllCache = async () => {
  try {
    const db = await initDB();
    await db.clear(STORE_NAME);
    console.log("[Cache] Cleared all cache");
    return true;
  } catch (error) {
    console.error("[Cache] Failed to clear cache", error);
    return false;
  }
};

/**
 * Get cache info (useful for debugging)
 */
export const getCacheInfo = async () => {
  try {
    const db = await initDB();
    const allCached = await db.getAll(STORE_NAME);
    return allCached.map((item) => ({
      key: item.key,
      createdAt: new Date(item.createdAt).toISOString(),
      expiresAt: new Date(item.expiresAt).toISOString(),
      expired: item.expiresAt < Date.now(),
    }));
  } catch (error) {
    console.error("[Cache] Failed to get cache info", error);
    return [];
  }
};

export default {
  setCached,
  getCached,
  deleteCached,
  clearAllCache,
  getCacheInfo,
};
