import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import "./Project.css";

const ProjectCard = () => {
  return (
    <div className="project-card">
      <div className="project-header">
        <Avatar />
        <p className="project-title">NandhaKishorM/laya</p>
      </div>
      <p>Multilingual, non-autoregressive System 1 decision engine</p>
      <div className="project-tags">
        <p>Tags</p>
        <div className="project-badges">
          <Badge variant="tags">typescript</Badge>
          <Badge variant="tags">typescript</Badge>
          <Badge variant="tags">typescript</Badge>
          <Badge variant="tags">typescript</Badge>
          <Badge variant="tags">typescript</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
