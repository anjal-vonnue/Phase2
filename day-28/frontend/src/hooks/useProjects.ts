import { useEffect, useState } from "react";
import type { Project } from "../types/types";

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `failed to fetch projects! Status: ${response.status}`,
          );
        }

        const result = await response.json();

        setProjects(result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("falconstied to fetch projects"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();

    return () => {
      console.log("project abort controller called");

      controller.abort();
    };
  }, [retryCount]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return { projects, isLoading, error, retry };
}
