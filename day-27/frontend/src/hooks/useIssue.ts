import { useEffect, useState } from "react";
import type { Issue } from "../types/types";

export default function useIssues(id: number) {
  const [issue, setIssue] = useState<Issue>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchIssues = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/issues/${id}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`failed to fetch issues! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log();

        setIssue(result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Failed to fetch issues"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();

    return () => {
      console.log("issue abort controller called");

      controller.abort();
    };
  }, [retryCount, id]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    issue,
    setIssue,
    isLoading,
    error,
    retry,
  };
}
