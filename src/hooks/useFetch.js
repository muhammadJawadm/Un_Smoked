import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

/**
 * Generic data-fetching hook.
 * @param {string} url  - endpoint relative to baseURL (e.g. "/admin/dashboard/stats")
 * @param {any}    deps - optional extra deps that trigger a re-fetch
 */
export default function useFetch(url, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ?? err.message ?? "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
