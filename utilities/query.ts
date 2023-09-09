import { useState, useEffect } from "react";

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

export const useQuery = <T>(
  fetchFunction: () => Promise<T>,
  config: { enabled?: boolean; initialData?: T } = { enabled: true }
): QueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    config?.enabled && fetchData();
  }, [config?.enabled]);

  return { data, isLoading, error };
};
