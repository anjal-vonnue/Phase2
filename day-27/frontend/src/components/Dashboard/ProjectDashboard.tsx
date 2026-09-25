import { useEffect, useRef, useState } from "react";
import type { Project } from "../../types/types";
import ProjectCard from "../Project/ProjectCard";
import "./ProjectDashboard.css";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects`,
          {
            signal: abortControllerRef.current?.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`failed to fetch projects! Status`);
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
          setError(new Error("falied to fetch projects"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [retryCount]);

  function handleRetry() {
    setRetryCount((prev) => prev + 1);
  }

  if (error) {
    return (
      <div className="project-dashboard-container">
        <div className="project-dashboard-error-div" id="project">
          <h3>Error</h3>
          <p>{error.message}</p>

          <button onClick={handleRetry}>Retry?</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="project-div" id="project">
        <h3>Loading</h3>
      </div>
    );
  }
  return (
    <div className="project-dashboard-container">
      {projects.map((project) => (
        <ProjectCard
          name={project.name}
          description={project.description}
          tags={project.tags}
          key={project.id}
        />
      ))}
    </div>
  );
};

export default ProjectDashboard;
