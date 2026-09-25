import ProjectCard from "../Project/ProjectCard";
import "./ProjectDashboard.css";
import useProjects from "../../hooks/useProjects";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ProjectDashboard = () => {
  const { projects, isLoading, error, retry } = useProjects();
  useDocumentTitle("Projects | Project Management");

  if (error) {
    return (
      <div className="project-dashboard-container">
        <div className="project-dashboard-error-div" id="project">
          <h3>Error</h3>
          <p>{error.message}</p>

          <button onClick={retry}>Retry?</button>
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
