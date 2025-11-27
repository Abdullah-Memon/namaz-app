import { getEndpoint } from "./endpoints.js";
import { getCached, setCached } from "./cache.js";

// Debug mode - set to false to reduce console logs
const DEBUG = false;

const log = (message) => {
  if (DEBUG) console.log(message);
};

const logError = (message) => {
  if (DEBUG) console.error(message);
};

const isOnline = () => {
  return navigator.onLine;
};

const fetchFallback = async (fallbackPath) => {
  try {
    const response = await fetch(fallbackPath);
    if (!response.ok) {
      throw new Error(`Fallback fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    log(`[Fallback] Successfully loaded fallback from ${fallbackPath}`);
    return data;
  } catch (error) {
    logError(`[Fallback] Failed to load fallback from ${fallbackPath}: ${error}`);
    return null;
  }
};

const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
    });

    if (!response.ok) {
      throw new Error(`API fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    log(`[Network] Successfully fetched from API: ${url}`);
    return data;
  } catch (error) {
    logError(`[Network] Failed to fetch from API ${url}: ${error}`);
    return null;
  }
};

export const fetchWithCache = async (endpointKey, params = {}) => {
  const endpoint = getEndpoint(endpointKey);

  if (!endpoint) {
    const error = `Endpoint "${endpointKey}" not found`;
    logError(`[FetchWithCache] ${error}`);
    return { data: null, source: null, error };
  }

  // Build cache key from endpoint key and params
  const cacheKey = `${endpointKey}_${JSON.stringify(params)}`;

  try {
    // Step 1: Try to get from cache
    log(`[FetchWithCache] Attempting to fetch "${endpointKey}" (cache key: ${cacheKey})`);
    const cachedData = await getCached(cacheKey);

    if (cachedData) {
      log(`[FetchWithCache] ✓ Returning cached data for "${endpointKey}"`);
      return {
        data: cachedData,
        source: "cache",
        error: null,
      };
    }

    // Step 2: If online, try to fetch from API
    if (isOnline()) {
      log(`[FetchWithCache] Device is online, attempting to fetch from API`);
      const url = endpoint.buildUrl(params);

      if (!url) {
        const error = `Failed to build URL for endpoint "${endpointKey}"`;
        log(`[FetchWithCache] ${error}`);
        // Try fallback
        const fallbackData = await fetchFallback(endpoint.fallbackPath);
        if (fallbackData) {
          return {
            data: fallbackData,
            source: "fallback",
            error: null,
          };
        }
        return { data: null, source: null, error };
      }

      const apiData = await fetchFromAPI(url);

      if (apiData) {
        // Cache the successful response
        await setCached(cacheKey, apiData, endpoint.ttl);
        log(`[FetchWithCache] ✓ Fetched from API and cached for "${endpointKey}"`);
        return {
          data: apiData,
          source: "network",
          error: null,
        };
      }
    } else {
      log(`[FetchWithCache] Device is offline, skipping API call`);
    }

    // Step 3: Fallback to static file
    log(`[FetchWithCache] Attempting to load fallback for "${endpointKey}"`);
    const fallbackData = await fetchFallback(endpoint.fallbackPath);

    if (fallbackData) {
      log(`[FetchWithCache] ✓ Returning fallback data for "${endpointKey}"`);
      return {
        data: fallbackData,
        source: "fallback",
        error: null,
      };
    }

    // All strategies failed
    const error = `Could not fetch data from cache, network, or fallback for "${endpointKey}"`;
    logError(`[FetchWithCache] ✗ ${error}`);
    return {
      data: null,
      source: null,
      error,
    };
  } catch (error) {
    logError(`[FetchWithCache] Unexpected error: ${error}`);
    return {
      data: null,
      source: null,
      error: error.message,
    };
  }
};

export default fetchWithCache;
