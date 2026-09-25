import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectContainer.css";
import type { Project } from "../../types/types";

const ProjectContainer = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

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
  }, []);

  if (error) {
    return (
      <div className="project-div" id="project">
        <h3>Error</h3>
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
    <>
      <div className="project-div" id="project">
        {projects.map((project) => (
          <ProjectCard
            name={project.name}
            description={project.description}
            tags={project.tags}
            key={project.id}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectContainer;
