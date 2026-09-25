import ProjectCard from "./ProjectCard";
import "./ProjectContainer.css";
import useProjects from "../../hooks/useProjects";

const ProjectContainer = () => {
  const { projects, isLoading, error, retry } = useProjects();

  if (error) {
    return (
      <div className="project-error-div" id="project">
        <h3>Error</h3>
        <p>{error.message}</p>

        <button onClick={retry}>Retry?</button>
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
