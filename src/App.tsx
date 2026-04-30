import { useMemo, useState } from "react";
import type { CSSProperties, ReactElement } from "react";

type Page = "home" | "search" | "my-documents" | "projects" | "settings" | "space";

type IconName =
  | "book"
  | "home"
  | "search"
  | "file"
  | "briefcase"
  | "settings"
  | "menu"
  | "dots"
  | "microscope"
  | "chip"
  | "wrench"
  | "box"
  | "chart"
  | "users"
  | "external"
  | "share"
  | "download"
  | "close";

type Space = {
  id: string;
  name: string;
  desc: string;
  docs: number;
  color: string;
  tint: string;
  icon: IconName;
};

type DocumentItem = {
  id: number;
  title: string;
  space: string;
  summary: string;
  type: string;
  status: string;
  project: string;
  updated: string;
  contributors: string[];
  icon: IconName;
  tint: string;
  iconColor: string;
  mine: boolean;
};

type Project = {
  id: number;
  name: string;
  space: string;
  members: number;
  docs: number;
  status: "Active" | "Draft";
  chips: string[];
};

const spaces: Space[] = [
  {
    id: "rd",
    name: "R&D",
    desc: "Research, experiments, findings",
    docs: 142,
    color: "#3b82f6",
    tint: "#eff6ff",
    icon: "microscope",
  },
  {
    id: "platform",
    name: "Platform",
    desc: "Infrastructure, architecture",
    docs: 87,
    color: "#a855f7",
    tint: "#faf5ff",
    icon: "chip",
  },
  {
    id: "service",
    name: "Service",
    desc: "Service models, runbooks",
    docs: 64,
    color: "#22c55e",
    tint: "#f0fdf4",
    icon: "wrench",
  },
  {
    id: "product",
    name: "Product",
    desc: "Specs, roadmaps, decisions",
    docs: 51,
    color: "#fb923c",
    tint: "#fff7ed",
    icon: "box",
  },
  {
    id: "operations",
    name: "Operations",
    desc: "Processes, SOPs, runbooks",
    docs: 33,
    color: "#f87171",
    tint: "#fff1f2",
    icon: "chart",
  },
];

const documents: DocumentItem[] = [
  {
    id: 1,
    title: "PF-12 Processing Research Results",
    space: "R&D",
    summary: "Summary of findings and experimental data",
    type: "Report",
    status: "Active",
    project: "Orion Runtime",
    updated: "2h ago",
    contributors: ["BA"],
    icon: "chart",
    tint: "#faf5ff",
    iconColor: "#9333ea",
    mine: true,
  },
  {
    id: 2,
    title: "Service Lower — Model Specification",
    space: "Service",
    summary: "Links to relevant reference materials",
    type: "Specification",
    status: "Active",
    project: "Vision Stack",
    updated: "5h ago",
    contributors: ["SO"],
    icon: "wrench",
    tint: "#f0fdf4",
    iconColor: "#16a34a",
    mine: false,
  },
  {
    id: 3,
    title: "Project: DDAM Integration v2 — Team Members",
    space: "Platform",
    summary: "Names, roles, and contact information",
    type: "Directory",
    status: "Active",
    project: "DDAM Core",
    updated: "1d ago",
    contributors: ["DG"],
    icon: "file",
    tint: "#eff6ff",
    iconColor: "#2563eb",
    mine: false,
  },
  {
    id: 4,
    title: "Adaptive Inference Benchmark Report",
    space: "R&D",
    summary: "Performance results across CPU and GPU clusters",
    type: "Report",
    status: "Active",
    project: "Orion Runtime",
    updated: "2d ago",
    contributors: ["AV", "NK"],
    icon: "chart",
    tint: "#faf5ff",
    iconColor: "#9333ea",
    mine: true,
  },
  {
    id: 5,
    title: "Platform Architecture Decision Record",
    space: "Platform",
    summary: "Decision rationale and evaluated alternatives",
    type: "Decision Record",
    status: "Active",
    project: "Atlas DS",
    updated: "3d ago",
    contributors: ["KA"],
    icon: "file",
    tint: "#eff6ff",
    iconColor: "#2563eb",
    mine: false,
  },
  {
    id: 6,
    title: "Shared Prompt Library v3",
    space: "R&D",
    summary: "Prompt templates and evaluation notes",
    type: "Library",
    status: "Draft",
    project: "Copilot Core",
    updated: "Today",
    contributors: ["NK", "LE"],
    icon: "file",
    tint: "#eff6ff",
    iconColor: "#2563eb",
    mine: false,
  },
];

const projects: Project[] = [
  {
    id: 1,
    name: "Orion Runtime",
    space: "R&D Space",
    members: 5,
    docs: 18,
    status: "Active",
    chips: ["PF-12 Processing ...", "Adaptive Inference..."],
  },
  {
    id: 2,
    name: "Atlas DS",
    space: "Platform Space",
    members: 3,
    docs: 12,
    status: "Active",
    chips: ["Platform Architectu..."],
  },
  {
    id: 3,
    name: "Vision Stack",
    space: "Service Space",
    members: 4,
    docs: 9,
    status: "Active",
    chips: ["Service Lower — ..."],
  },
  {
    id: 4,
    name: "Nova Search",
    space: "R&D Space",
    members: 6,
    docs: 22,
    status: "Active",
    chips: [],
  },
  {
    id: 5,
    name: "DDAM Core",
    space: "Platform Space",
    members: 8,
    docs: 31,
    status: "Active",
    chips: ["Project: DDAM Int..."],
  },
  {
    id: 6,
    name: "Copilot Core",
    space: "R&D Space",
    members: 4,
    docs: 15,
    status: "Draft",
    chips: ["Shared Prompt Lib..."],
  },
];

function Icon({ name, size = 24 }: { name: IconName; size?: number }): ReactElement {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  const icons: Record<IconName, ReactElement> = {
    book: (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
        <path d="M8 2v15" />
      </svg>
    ),
    home: (
      <svg {...common}>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    ),
    file: (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
    briefcase: (
      <svg {...common}>
        <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
    settings: (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V21a2 2 0 1 1-4 0v-.09a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-1.98.36l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.65-1.1H3a2 2 0 1 1 0-4h.09A1.8 1.8 0 0 0 4.74 8a1.8 1.8 0 0 0-.36-1.98l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.8 1.8 0 0 0 9 3.6 1.8 1.8 0 0 0 10.1 2H10a2 2 0 1 1 4 0v.09A1.8 1.8 0 0 0 15 3.74a1.8 1.8 0 0 0 1.98-.36l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.8 1.8 0 0 0 19.4 9c.7.2 1.2.86 1.2 1.6v.8c0 .74-.5 1.4-1.2 1.6z" />
      </svg>
    ),
    menu: (
      <svg {...common}>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
    dots: (
      <svg {...common}>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </svg>
    ),
    microscope: (
      <svg {...common}>
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 0 0 7-7" />
        <path d="M9 14h3" />
        <path d="M10 2v6" />
        <path d="M8 2h4v8H8z" />
        <path d="M12 9l4 4" />
      </svg>
    ),
    chip: (
      <svg {...common}>
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <rect x="10" y="10" width="4" height="4" />
        <path d="M4 9h3" />
        <path d="M4 15h3" />
        <path d="M17 9h3" />
        <path d="M17 15h3" />
        <path d="M9 4v3" />
        <path d="M15 4v3" />
        <path d="M9 17v3" />
        <path d="M15 17v3" />
      </svg>
    ),
    wrench: (
      <svg {...common}>
        <path d="M14.7 6.3a5 5 0 0 0 6.1 6.1L12 21l-3-3 8.8-8.8a5 5 0 0 1-3.1-2.9z" />
        <path d="M6 18l-3 3" />
      </svg>
    ),
    box: (
      <svg {...common}>
        <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
        <path d="M3.3 7.5L12 12l8.7-4.5" />
        <path d="M12 22V12" />
      </svg>
    ),
    chart: (
      <svg {...common}>
        <path d="M4 19h16" />
        <path d="M6 19v-5h3v5" />
        <path d="M11 19v-9h3v9" />
        <path d="M16 19V5h3v14" />
      </svg>
    ),
    users: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    external: (
      <svg {...common}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
      </svg>
    ),
    share: (
      <svg {...common}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 10.6l6.8-4.2" />
        <path d="M8.6 13.4l6.8 4.2" />
      </svg>
    ),
    download: (
      <svg {...common}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
      </svg>
    ),
    close: (
      <svg {...common}>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    ),
  };

  return icons[name];
}

function Avatar({ label }: { label: string }) {
  const map: Record<string, [string, string]> = {
    BA: ["#bfdbfe", "#1d4ed8"],
    SO: ["#bbf7d0", "#166534"],
    DG: ["#fed7aa", "#9a3412"],
    AV: ["#bfdbfe", "#1d4ed8"],
    NK: ["#bfdbfe", "#1d4ed8"],
    LE: ["#fbcfe8", "#9d174d"],
    KA: ["#e9d5ff", "#6b21a8"],
  };

  const [bg, fg] = map[label] || ["#e5e7eb", "#111827"];

  return (
    <span className="avatar" style={{ backgroundColor: bg, color: fg }}>
      {label}
    </span>
  );
}

function Sidebar({
  page,
  activeSpace,
  onPage,
  onSpace,
}: {
  page: Page;
  activeSpace: string;
  onPage: (page: Page) => void;
  onSpace: (spaceId: string) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Icon name="book" size={30} />
        </div>
        <h1>DDAM Library</h1>
      </div>

      <div className="side-section">
        <p className="section-label">MAIN</p>

        <button
          className={`nav-item ${page === "home" ? "active" : ""}`}
          onClick={() => onPage("home")}
        >
          <Icon name="home" />
          <span>Home</span>
        </button>

        <button
          className={`nav-item ${page === "search" ? "active" : ""}`}
          onClick={() => onPage("search")}
        >
          <Icon name="search" />
          <span>Search</span>
        </button>

        <button
          className={`nav-item ${page === "my-documents" ? "active" : ""}`}
          onClick={() => onPage("my-documents")}
        >
          <Icon name="file" />
          <span>My documents</span>
        </button>
      </div>

      <div className="side-section">
        <p className="section-label">SPACES</p>

        {spaces.map((space) => (
          <button
            key={space.id}
            className={`space-nav ${
              page === "space" && activeSpace === space.id ? "active" : ""
            }`}
            onClick={() => onSpace(space.id)}
          >
            <span className="dot" style={{ backgroundColor: space.color }} />
            <span>{space.name}</span>
          </button>
        ))}
      </div>

      <div className="side-section">
        <p className="section-label">TOOLS</p>

        <button
          className={`nav-item ${page === "projects" ? "active" : ""}`}
          onClick={() => onPage("projects")}
        >
          <Icon name="briefcase" />
          <span>Active projects</span>
        </button>

        <button
          className={`nav-item ${page === "settings" ? "active" : ""}`}
          onClick={() => onPage("settings")}
        >
          <Icon name="settings" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({
  onSearchFocus,
}: {
  onSearchFocus: () => void;
}) {
  return (
    <header className="topbar">
      <button className="icon-button">
        <Icon name="menu" />
      </button>

      <button className="top-search" onClick={onSearchFocus}>
        <Icon name="search" />
        <span>Search documents, projects, people...</span>
        <kbd>⌘K</kbd>
      </button>

      <div className="top-actions">
        <Icon name="dots" />
        <Avatar label="BA" />
      </div>
    </header>
  );
}

function DocumentCard({
  doc,
  onClick,
}: {
  doc: DocumentItem;
  onClick: (doc: DocumentItem) => void;
}) {
  return (
    <button className="document-card" onClick={() => onClick(doc)}>
      <div
        className="doc-icon"
        style={
          {
            backgroundColor: doc.tint,
            color: doc.iconColor,
          } as CSSProperties
        }
      >
        <Icon name={doc.icon} />
      </div>

      <div className="doc-main">
        <h3>{doc.title}</h3>
        <p>
          {doc.space} · {doc.summary}
        </p>
      </div>

      <div className="doc-meta">
        <div className="avatars">
          {doc.contributors.map((item) => (
            <Avatar key={item} label={item} />
          ))}
        </div>
        <span>{doc.updated}</span>
      </div>
    </button>
  );
}

function HomePage({
  onSpace,
  onDoc,
  onSearch,
}: {
  onSpace: (spaceId: string) => void;
  onDoc: (doc: DocumentItem) => void;
  onSearch: () => void;
}) {
  return (
    <div className="page">
      <section>
        <h2 className="page-title">Spaces</h2>
        <p className="page-subtitle">Browse knowledge by team</p>

        <div className="spaces-grid">
          {spaces.map((space) => (
            <button
              key={space.id}
              className="space-card"
              onClick={() => onSpace(space.id)}
            >
              <div
                className="space-icon"
                style={{ backgroundColor: space.tint, color: "#333" }}
              >
                <Icon name={space.icon} size={31} />
              </div>
              <h3>{space.name}</h3>
              <p>{space.desc}</p>
              <span className="pill">{space.docs} docs</span>
            </button>
          ))}
        </div>
      </section>

      <section className="recent-section">
        <div className="section-head">
          <div>
            <h2 className="page-title">Recent documents</h2>
            <p className="page-subtitle">Last updated across all spaces</p>
          </div>

          <button className="outline-button" onClick={onSearch}>
            <Icon name="search" size={20} />
            Search all
          </button>
        </div>

        <div className="list">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onClick={onDoc} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchPage({
  onDoc,
}: {
  onDoc: (doc: DocumentItem) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return documents;

    return documents.filter((doc) =>
      [doc.title, doc.space, doc.summary, doc.project]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="page">
      <h2 className="page-title">Search</h2>
      <p className="page-subtitle">Search across all spaces, projects, and people</p>

      <div className="big-search">
        <Icon name="search" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, projects, people..."
        />
        <kbd>⌘K</kbd>
      </div>

      {results.length > 0 ? (
        <div className="list search-list">
          {results.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onClick={onDoc} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No results found for "{query}"</div>
      )}
    </div>
  );
}

function MyDocumentsPage({
  onDoc,
}: {
  onDoc: (doc: DocumentItem) => void;
}) {
  const mine = documents.filter((doc) => doc.mine);

  return (
    <div className="page">
      <h2 className="page-title">My Documents</h2>
      <p className="page-subtitle">Documents you authored or contributed to</p>

      <div className="list search-list">
        {mine.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} onClick={onDoc} />
        ))}
      </div>
    </div>
  );
}

function SpacePage({
  activeSpace,
  onDoc,
}: {
  activeSpace: string;
  onDoc: (doc: DocumentItem) => void;
}) {
  const [query, setQuery] = useState("");
  const space = spaces.find((item) => item.id === activeSpace) || spaces[0];

  const filtered = documents.filter((doc) => {
    const sameSpace = doc.space === space.name;
    const q = query.trim().toLowerCase();

    if (!q) return sameSpace;

    return (
      sameSpace &&
      [doc.title, doc.summary, doc.project].join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className="page">
      <div className="space-header">
        <div
          className="space-icon large"
          style={{ backgroundColor: space.tint, color: "#333" }}
        >
          <Icon name={space.icon} size={40} />
        </div>

        <div>
          <h2 className="page-title">{space.name}</h2>
          <p className="page-subtitle">{space.desc}</p>
          <span className="pill">{space.docs} docs</span>
        </div>
      </div>

      <div className="space-search">
        <Icon name="search" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search in ${space.name}...`}
        />
      </div>

      <div className="list">
        {filtered.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} onClick={onDoc} />
        ))}
      </div>
    </div>
  );
}

function ProjectsPage({
  onDoc,
}: {
  onDoc: (doc: DocumentItem) => void;
}) {
  return (
    <div className="page">
      <h2 className="page-title">Active Projects</h2>
      <p className="page-subtitle">Track ongoing work and linked materials</p>

      <div className="projects-grid">
        {projects.map((project) => (
          <button
            key={project.id}
            className="project-card"
            onClick={() => onDoc(documents[project.id % documents.length])}
          >
            <div className="project-top">
              <div>
                <h3>{project.name}</h3>
                <p>{project.space}</p>
              </div>

              <span className={`status ${project.status === "Draft" ? "draft" : ""}`}>
                {project.status}
              </span>
            </div>

            <div className="project-stats">
              <span>
                <Icon name="users" size={18} />
                {project.members} members
              </span>
              <span>
                <Icon name="file" size={18} />
                {project.docs} docs
              </span>
            </div>

            <div className="chips">
              {project.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <h2 className="page-title">Settings & Admin</h2>
      <p className="page-subtitle">System stats, access control, and configuration</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>377</h3>
          <p>Total documents</p>
        </div>
        <div className="stat-card">
          <h3>126</h3>
          <p>Active users</p>
        </div>
        <div className="stat-card">
          <h3>5</h3>
          <p>Spaces</p>
        </div>
        <div className="stat-card">
          <h3>38</h3>
          <p>Projects</p>
        </div>
      </div>

      <div className="access-card">
        <h3>Access Control</h3>

        {spaces.map((space) => (
          <div key={space.id} className="access-row">
            <div>
              <span className="dot" style={{ backgroundColor: space.color }} />
              <span>{space.name}</span>
            </div>
            <span>{space.docs} docs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailModal({
  doc,
  onClose,
}: {
  doc: DocumentItem;
  onClose: () => void;
}) {
  const related = documents.filter(
    (item) => item.space === doc.space && item.id !== doc.id
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>{doc.title}</h2>
            <p>
              {doc.space} · {doc.summary}
            </p>
          </div>

          <button className="modal-close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-body">
          <div className="info-grid">
            <div className="info-box">
              <span>TYPE</span>
              <p>{doc.type}</p>
            </div>
            <div className="info-box">
              <span>STATUS</span>
              <p>{doc.status}</p>
            </div>
            <div className="info-box">
              <span>SPACE</span>
              <p>{doc.space}</p>
            </div>
            <div className="info-box">
              <span>PROJECT</span>
              <p>{doc.project}</p>
            </div>
            <div className="info-box">
              <span>UPDATED</span>
              <p>{doc.updated}</p>
            </div>
            <div className="info-box">
              <span>CONTRIBUTORS</span>
              <p>{doc.contributors.join(", ")}</p>
            </div>
          </div>

          <p className="related-title">RELATED IN {doc.space.toUpperCase()}</p>

          <div className="related-list">
            {related.slice(0, 2).map((item) => (
              <div key={item.id} className="related-item">
                <Icon name="file" size={20} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button className="primary-button">
              <Icon name="external" size={20} />
              Open document
            </button>
            <button className="outline-button">
              <Icon name="share" size={20} />
              Share
            </button>
            <button className="outline-button">
              <Icon name="download" size={20} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeSpace, setActiveSpace] = useState("rd");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const handleSpace = (spaceId: string) => {
    setActiveSpace(spaceId);
    setPage("space");
  };

  return (
    <div className="app">
      <Sidebar
        page={page}
        activeSpace={activeSpace}
        onPage={setPage}
        onSpace={handleSpace}
      />

      <main className="main">
        <Topbar onSearchFocus={() => setPage("search")} />

        {page === "home" && (
          <HomePage
            onSpace={handleSpace}
            onDoc={setSelectedDoc}
            onSearch={() => setPage("search")}
          />
        )}

        {page === "search" && <SearchPage onDoc={setSelectedDoc} />}

        {page === "my-documents" && <MyDocumentsPage onDoc={setSelectedDoc} />}

        {page === "space" && (
          <SpacePage activeSpace={activeSpace} onDoc={setSelectedDoc} />
        )}

        {page === "projects" && <ProjectsPage onDoc={setSelectedDoc} />}

        {page === "settings" && <SettingsPage />}
      </main>

      {selectedDoc && (
        <DetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}