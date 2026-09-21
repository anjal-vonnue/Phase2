import "./Header.css";

const links = [
  {
    id: 1,
    name: "Home",
    href: "/home",
  },
  {
    id: 2,
    name: "Projects",
    href: "/projects",
  },
  {
    id: 3,
    name: "Issues",
    href: "/issues",
  },
];

export default function HeaderComponent() {
  return (
    <>
      <header className="header">
        <div>Project Management</div>
        <div>
          <nav className="nav">
            {links.map((link) => (
              <a href={link.href} key={link.id}>
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
