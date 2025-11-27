import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchWithCache } from "../api/fetchWithCache.js";

const DEBUG = false; // Set to true for debug logging

export const useApi = (endpointKey, params = {}, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null); // 'cache', 'network', 'fallback'
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Store params in ref to avoid triggering fetches on every param change
  const paramsRef = useRef(params);
  paramsRef.current = params;

  // Stringify params for dependency array
  const paramsString = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchWithCache(endpointKey, paramsRef.current);

        if (result.data) {
          setData(result.data);
          setSource(result.source);
          setError(null);
          if (DEBUG) console.log(`[useApi] Successfully fetched data from ${result.source}`);
        } else {
          setData(null);
          setSource(null);
          setError(result.error || "Unknown error occurred");
          if (DEBUG) console.error(`[useApi] Failed to fetch data:`, result.error);
        }
      } catch (err) {
        setData(null);
        setSource(null);
        setError(err.message || "An unexpected error occurred");
        if (DEBUG) console.error(`[useApi] Exception during fetch:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpointKey, paramsString, enabled]);

  /**
   * Handle online/offline status
   */
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (DEBUG) console.log("[useApi] Device came online");
    };

    const handleOffline = () => {
      setIsOffline(true);
      if (DEBUG) console.log("[useApi] Device went offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(() => {
    if (DEBUG) console.log(`[useApi] Manual refresh triggered for endpoint: ${endpointKey}`);
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchWithCache(endpointKey, paramsRef.current);

        if (result.data) {
          setData(result.data);
          setSource(result.source);
          setError(null);
          if (DEBUG) console.log(`[useApi] Refresh successful from ${result.source}`);
        } else {
          setData(null);
          setSource(null);
          setError(result.error || "Unknown error occurred");
        }
      } catch (err) {
        setData(null);
        setSource(null);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpointKey]);

  return {
    data,
    loading,
    error,
    refresh,
    source, // 'cache', 'network', or 'fallback'
    isOffline,
  };
};

export default useApi;
