import { useEffect, useState } from "react";
import type { Issue } from "../types/types";
import { useAuth } from "../context/AuthContext";

export default function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    const fetchIssues = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`failed to fetch issues! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log();

        setIssues(result.data);
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
  }, [retryCount, token]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    issues,
    setIssues,
    isLoading,
    error,
    retry,
  };
}
