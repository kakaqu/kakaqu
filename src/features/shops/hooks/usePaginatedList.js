import { useState, useRef, useCallback } from "react";

export default function usePaginatedList(fetchFn, limit = 10) {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const loadingRef = useRef(false);

  const loadData = useCallback(async (pageToLoad = 0) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const isFirstPage = pageToLoad === 0;
    try {
      if (isFirstPage && !refreshing) setLoading(true);
      if (isFirstPage) setRefreshing(true);

      const newData = await fetchFn({ page: pageToLoad, limit });
      setHasMore(newData.length === limit);

      if (isFirstPage) {
        setData(newData);
      } else {
        setData(prev => [...prev, ...newData]);
      }
      setPageIndex(pageToLoad);
    } finally {
      if (isFirstPage) {
        setLoading(false);
        setRefreshing(false);
      }
      loadingRef.current = false;
    }
  }, [fetchFn, limit, refreshing]);

  const onRefresh = () => loadData(0);
  const onEndReached = () => {
    if (hasMore && !loading) loadData(pageIndex + 1);
  };

  return { data, setData, loadData, onRefresh, onEndReached, loading, refreshing, hasMore };
}
