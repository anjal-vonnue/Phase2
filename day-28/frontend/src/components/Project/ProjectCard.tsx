import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import "./Project.css";

const ProjectCard = ({
  name,
  description,
  tags,
}: {
  name: string;
  description: string;
  tags: string[];
}) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <Avatar />
        <p className="project-title">{name}</p>
      </div>
      <p>{description}</p>
      <div className="project-tags">
        <p>Tags</p>
        <div className="project-badges">
          {tags.map((tag) => (
            <Badge variant="tags" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
