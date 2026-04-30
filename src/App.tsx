import { useMemo, useState } from "react";

type Page =
  | "home"
  | "projects"
  | "rnd"
  | "people"
  | "prompts"
  | "search"

type ProjectStatus = "Planning" | "Ongoing" | "Done";
type ResearchStatus = "Testing" | "Validated" | "Draft" | "Archived";

type Member = {
  id: number;
  name: string;
  initials: string;
  role: string;
  skills: string[];
  projects: string[];
  email: string;
  color: string;
};

type Project = {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  members: string[];
  techStack: string[];
  description: string;
  goal: string;
  problemSolved: string;
  timeline: string;
  files: FileAsset[];
  screenshots: string[];
  lessons: string[];
  tasks: Task[];
};

type Task = {
  title: string;
  assignee: string;
  status: "Done" | "In Progress" | "Urgent" | "Backlog";
};

type FileAsset = {
  name: string;
  type: "XL" | "PP" | "WD" | "PDF" | "FIG" | "LINK";
  size: string;
  owner: string;
};

type ResearchItem = {
  id: number;
  title: string;
  type: "AI Model" | "Service Model" | "Experiment" | "Research Note";
  status: ResearchStatus;
  owner: string;
  updated: string;
  summary: string;
  usedIn: string[];
  stack: string[];
  assets: string[];
};

type PromptItem = {
  id: number;
  title: string;
  category: string;
  owner: string;
  text: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Bold B.",
    initials: "BB",
    role: "Full-Stack / UI",
    skills: ["React", "UX", "Dashboard", "ECharts"],
    projects: ["FUJI 2024 Research", "Retail Heatmap Tool"],
    email: "bold.b@ddam.mn",
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Gerel T",
    initials: "GT",
    role: "Data Analyst",
    skills: ["Python", "Media Mix", "BI", "Modeling"],
    projects: ["FUJI 2024 Research", "Media Mix Model"],
    email: "bolod@ddam.mn",
    color: "#059669",
  },
  {
    id: 3,
    name: "Tsend T.",
    initials: "TT",
    role: "Project Manager",
    skills: ["Planning", "Client", "Research", "Retail"],
    projects: ["FUJI 2024 Research", "Ad Effectiveness Q4"],
    email: "tsend@ddam.mn",
    color: "#d97706",
  },
  {
    id: 4,
    name: "Dorj B.",
    initials: "DB",
    role: "Backend Developer",
    skills: ["Node.js", "API", "PostgreSQL", "Cloud"],
    projects: ["Viz Platform v3"],
    email: "dorj@ddam.mn",
    color: "#7c3aed",
  },
  {
    id: 5,
    name: "Nara E.",
    initials: "NE",
    role: "Data Engineer",
    skills: ["ETL", "Pipeline", "Python", "Data Lake"],
    projects: ["Media Mix Model"],
    email: "nara@ddam.mn",
    color: "#db2777",
  },
];

const projects: Project[] = [
  {
    id: 1,
    name: "FUJI 2024 Research",
    client: "Dentsu Japan",
    status: "Ongoing",
    progress: 72,
    members: ["Gerel T.", "Bolod O.", "Tsend T."],
    techStack: ["React", "Python", "Survey Analysis", "BI"],
    description:
      "Japan consumer market research project with survey data, dashboard prototype, and client-ready insight materials.",
    goal: "Centralize research data and generate actionable market insights for the FUJI campaign.",
    problemSolved:
      "Scattered survey files, manual reporting, and disconnected research notes were unified into a single knowledge base.",
    timeline: "2024-09-01 → 2024-12-31",
    screenshots: [
      "Dashboard prototype",
      "Survey overview",
      "Market segmentation",
    ],
    lessons: [
      "Survey naming conventions should be standardized early.",
      "Client summary should be generated weekly.",
      "Raw data and interpretation notes should live together.",
    ],
    tasks: [
      { title: "Survey design approval", assignee: "Gerel", status: "Done" },
      { title: "Data collection Phase 1", assignee: "Bolod", status: "Done" },
      { title: "Dashboard prototype", assignee: "Gerel", status: "Done" },
      {
        title: "Data analysis and visualization",
        assignee: "Gerel, Bolod",
        status: "Urgent",
      },
      {
        title: "Client report draft",
        assignee: "Tsend",
        status: "In Progress",
      },
      { title: "Final presentation deck", assignee: "Gerel", status: "Backlog" },
    ],
    files: [
      {
        name: "FUJI2024_RawData_v3.xlsx",
        type: "XL",
        size: "4.2 MB",
        owner: "Bolod",
      },
      {
        name: "Survey_Analysis_Q3.xlsx",
        type: "XL",
        size: "1.8 MB",
        owner: "Gerel",
      },
      {
        name: "Client_Presentation_Draft.pptx",
        type: "PP",
        size: "6.1 MB",
        owner: "Tsend",
      },
      {
        name: "Research_Brief_FUJI2024.docx",
        type: "WD",
        size: "312 KB",
        owner: "Tsend",
      },
      {
        name: "Japan_Market_Overview_2024.pdf",
        type: "PDF",
        size: "2.4 MB",
        owner: "Bolod",
      },
      {
        name: "Figma — Dashboard Design",
        type: "FIG",
        size: "Link",
        owner: "Gerel",
      },
    ],
  },
  {
    id: 2,
    name: "Viz Platform v3",
    client: "Internal",
    status: "Ongoing",
    progress: 45,
    members: ["Gerel T.", "Dorj B."],
    techStack: ["Vue", "Node.js", "Chart Export", "PostgreSQL"],
    description:
      "Internal visualization platform migration with PowerPoint chart export and reusable dashboard blocks.",
    goal: "Make campaign reporting faster with reusable visualization components.",
    problemSolved:
      "Old reporting flow required manual screenshots and repeated deck formatting.",
    timeline: "2024-08-15 → 2024-11-20",
    screenshots: ["Chart builder", "Export flow", "Template selector"],
    lessons: ["Export quality must be tested with real client deck formats."],
    tasks: [
      { title: "Vue migration base", assignee: "Dorj", status: "Done" },
      { title: "Chart export module", assignee: "Gerel", status: "In Progress" },
      { title: "Template library", assignee: "Dorj", status: "Backlog" },
    ],
    files: [
      {
        name: "Viz_v3_Architecture.pdf",
        type: "PDF",
        size: "910 KB",
        owner: "Dorj",
      },
      {
        name: "Chart_Export_Test.pptx",
        type: "PP",
        size: "3.2 MB",
        owner: "Gerel",
      },
    ],
  },
  {
    id: 3,
    name: "Media Mix Model",
    client: "Internal / Client Research",
    status: "Ongoing",
    progress: 90,
    members: ["Bolod O.", "Nara E."],
    techStack: ["Python", "Pandas", "MMM", "Bayesian Model"],
    description:
      "Media mix modeling pipeline to estimate channel contribution and budget efficiency.",
    goal: "Measure media channel impact and recommend optimized budget allocation.",
    problemSolved:
      "Campaign performance was hard to compare across channels without consistent model logic.",
    timeline: "2024-07-01 → 2024-10-30",
    screenshots: ["Contribution chart", "Spend curve", "Model diagnostics"],
    lessons: [
      "Feature engineering documentation is as important as the model result.",
    ],
    tasks: [
      { title: "Data pipeline", assignee: "Nara", status: "Done" },
      { title: "Model validation", assignee: "Bolod", status: "In Progress" },
      { title: "Result explainability", assignee: "Bolod", status: "Done" },
    ],
    files: [
      {
        name: "MMM_Model_Notebook.ipynb",
        type: "LINK",
        size: "Link",
        owner: "Bolod",
      },
      {
        name: "MediaMix_Result_Q4.pdf",
        type: "PDF",
        size: "1.1 MB",
        owner: "Nara",
      },
    ],
  },
  {
    id: 4,
    name: "Retail Heatmap Tool",
    client: "Retail Client",
    status: "Planning",
    progress: 20,
    members: ["Gerel T.", "Tsend T."],
    techStack: ["Geo Analytics", "Mapbox", "React"],
    description:
      "Geo-analytics tool for store density, customer traffic, and campaign location planning.",
    goal: "Help retail campaign teams choose better physical activation zones.",
    problemSolved:
      "Location planning was based on fragmented Excel files and manual map checks.",
    timeline: "2024-10-01 → 2025-01-15",
    screenshots: ["Map prototype", "Store cluster view"],
    lessons: ["A clean POI data source is required before advanced filters."],
    tasks: [
      {
        title: "POI data source review",
        assignee: "Tsend",
        status: "In Progress",
      },
      { title: "Map prototype", assignee: "Gerel", status: "Backlog" },
    ],
    files: [
      {
        name: "Retail_Heatmap_Proposal.pdf",
        type: "PDF",
        size: "720 KB",
        owner: "Tsend",
      },
    ],
  },
];

const researchItems: ResearchItem[] = [
  {
    id: 1,
    title: "PF-12 Processing Research Model",
    type: "AI Model",
    status: "Validated",
    owner: "Bolod O.",
    updated: "2h ago",
    summary:
      "Processing model research for classifying campaign documents and extracting structured insights.",
    usedIn: ["FUJI 2024 Research", "Media Mix Model"],
    stack: ["Python", "Embeddings", "Classifier", "Evaluation"],
    assets: ["Benchmark report", "Experiment notes", "Dataset card"],
  },
  {
    id: 2,
    title: "Service Lower — Model Specification",
    type: "Service Model",
    status: "Testing",
    owner: "Gerel T.",
    updated: "5h ago",
    summary:
      "Service design model for linking project files, briefs, prompts, and related documents.",
    usedIn: ["DDAM Hub", "Viz Platform v3"],
    stack: ["React", "Information Architecture", "Search UX"],
    assets: ["Model spec", "User flow", "Figma"],
  },
  {
    id: 3,
    title: "Intent-based Smart Search",
    type: "Experiment",
    status: "Draft",
    owner: "Dorj B.",
    updated: "1d ago",
    summary:
      "Search experiment that understands phrases like “projects with React chart export”.",
    usedIn: ["Viz Platform v3", "DDAM Hub"],
    stack: ["Vector Search", "Metadata", "Prompt Routing"],
    assets: ["Search examples", "Evaluation sheet"],
  },
  {
    id: 4,
    title: "Client Meeting Summary Prompt",
    type: "Research Note",
    status: "Validated",
    owner: "Tsend T.",
    updated: "2d ago",
    summary:
      "Reusable prompt for converting meeting transcripts into summaries, actions, risks, and next steps.",
    usedIn: ["FUJI 2024 Research", "Retail Heatmap Tool"],
    stack: ["Prompt", "Meeting Notes", "Action Items"],
    assets: ["Prompt template", "Output examples"],
  },
];

const prompts: PromptItem[] = [
  {
    id: 1,
    title: "Project Summary Generator",
    category: "Project",
    owner: "Tsend T.",
    text: "Summarize this project into: overview, goal, problem solved, technologies used, timeline, reusable assets, and lessons learned.",
  },
  {
    id: 2,
    title: "Campaign Idea Proposal",
    category: "Campaign",
    owner: "Gerel T.",
    text: "Generate five campaign ideas using audience insight, channel plan, creative hook, expected KPI, and risk.",
  },
  {
    id: 3,
    title: "Research Finding Extractor",
    category: "Research",
    owner: "Bolod O.",
    text: "Extract key findings, supporting data, assumptions, limitations, and recommended actions from this research document.",
  },
  {
    id: 4,
    title: "Client Meeting Summary",
    category: "Meeting",
    owner: "Tsend T.",
    text: "Convert this meeting transcript into summary, decisions, action items, owners, deadlines, open questions, and risks.",
  },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(
    null,
  );
  const [query, setQuery] = useState("");

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setSelectedProject(null);
    setSelectedResearch(null);
  };

  const openProject = (project: Project) => {
    setPage("projects");
    setSelectedProject(project);
    setSelectedResearch(null);
  };

  const openResearch = (item: ResearchItem) => {
    setPage("rnd");
    setSelectedResearch(item);
    setSelectedProject(null);
  };

  const closeDetail = () => {
    setSelectedProject(null);
    setSelectedResearch(null);
  };

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const projectResults = projects
      .filter((item) =>
        [
          item.name,
          item.client,
          item.status,
          item.description,
          item.goal,
          item.problemSolved,
          item.techStack.join(" "),
          item.members.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        type: "Project",
        title: item.name,
        description: item.description,
        action: () => openProject(item),
      }));

    const researchResults = researchItems
      .filter((item) =>
        [
          item.title,
          item.type,
          item.summary,
          item.stack.join(" "),
          item.usedIn.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        type: "R&D",
        title: item.title,
        description: item.summary,
        action: () => openResearch(item),
      }));

    const peopleResults = members
      .filter((item) =>
        [item.name, item.role, item.skills.join(" "), item.projects.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        type: "People",
        title: item.name,
        description: `${item.role} · ${item.skills.join(", ")}`,
        action: () => openPage("people"),
      }));

    const promptResults = prompts
      .filter((item) =>
        [item.title, item.category, item.text]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        type: "Prompt",
        title: item.title,
        description: item.text,
        action: () => openPage("prompts"),
      }));

    return [
      ...projectResults,
      ...researchResults,
      ...peopleResults,
      ...promptResults,
    ];
  }, [query]);

  return (
    <div className="app">
      <Sidebar page={page} onPage={openPage} />

      <main className="main">
        <Header
          page={page}
          onSearch={() => openPage("search")}
          titleOverride={
            selectedProject
              ? selectedProject.name
              : selectedResearch
                ? selectedResearch.title
                : undefined
          }
          subtitleOverride={
            selectedProject
              ? "Project detail"
              : selectedResearch
                ? "R&D detail"
                : undefined
          }
        />

        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={closeDetail} />
        )}

        {selectedResearch && (
          <ResearchDetail item={selectedResearch} onClose={closeDetail} />
        )}

        {!selectedProject && !selectedResearch && page === "home" && (
          <HomePage
            onProject={openProject}
            onProjects={() => openPage("projects")}
            onResearch={() => openPage("rnd")}
          />
        )}

        {!selectedProject && !selectedResearch && page === "projects" && (
          <ProjectsPage onProject={openProject} />
        )}

        {!selectedProject && !selectedResearch && page === "rnd" && (
          <ResearchPage onResearch={openResearch} />
        )}

        {!selectedProject && !selectedResearch && page === "people" && (
          <PeoplePage />
        )}

        {!selectedProject && !selectedResearch && page === "prompts" && (
          <PromptsPage />
        )}

        {!selectedProject && !selectedResearch && page === "search" && (
          <SearchPage
            query={query}
            setQuery={setQuery}
            results={searchResults}
          />
        )}
      </main>
    </div>
  );
}

function Sidebar({
  page,
  onPage,
}: {
  page: Page;
  onPage: (page: Page) => void;
}) {
  const nav: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "projects", label: "Projects", icon: "▦" },
    { id: "rnd", label: "R&D / Models", icon: "✦" },
    { id: "people", label: "People", icon: "●" },
    { id: "prompts", label: "Prompts", icon: "⌘" },
    { id: "search", label: "Smart Search", icon: "⌕" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">▤</div>
        <div>
          <h1>DDAM Library System</h1>
        </div>
      </div>

      <nav className="nav">
        {nav.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? "active" : ""}
            onClick={() => onPage(item.id)}>
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-profile">
        <Avatar label="BB" color="#2563eb" />
        <div>
          <strong>Bold</strong>
          <p>Workspace Admin</p>
        </div>
      </div>
    </aside>
  );
}

function Header({
  page,
  onSearch,
  titleOverride,
  subtitleOverride,
}: {
  page: Page;
  onSearch: () => void;
  titleOverride?: string;
  subtitleOverride?: string;
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{subtitleOverride || "DDAM Internal Platform"}</p>
        <h2>{titleOverride || pageTitle(page)}</h2>
      </div>

      <div className="top-actions">
        <button className="icon-button">•••</button>
        <Avatar label="BB" color="#2563eb" />
      </div>
    </header>
  );
}

function pageTitle(page: Page) {
  const map: Record<Page, string> = {
    home: "Overview",
    projects: "Project Library",
    rnd: "R&D and Models",
    people: "People Directory",
    prompts: "Prompt Library",
    search: "Smart Search",
  };

  return map[page];
}

function HomePage({
  onProject,
  onProjects,
  onResearch,
}: {
  onProject: (project: Project) => void;
  onProjects: () => void;
  onResearch: () => void;
}) {
  const activeProjects = projects.filter(
    (project) => project.status === "Ongoing",
  );

  return (
    <div className="page">
      <section className="stats-grid">
        <StatCard
          label="Total Projects"
          value="12"
          note="3 new this month"
          tone="blue"
        />
        <StatCard
          label="Ongoing"
          value="7"
          note="2 need attention"
          tone="green"
        />
        <StatCard
          label="Team Members"
          value="24"
          note="5 teams"
          tone="orange"
        />
        <StatCard
          label="Knowledge Assets"
          value="148"
          note="16 this week"
          tone="purple"
        />
      </section>

      <section className="two-column">
        <div className="panel">
          <PanelHeader
            title="Active Projects"
            action="View all"
            onAction={onProjects}
          />
          <div className="project-list">
            {activeProjects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onClick={() => onProject(project)}
              />
            ))}
          </div>
        </div>

        <div className="panel">
          <PanelHeader title="Team Members" action="Directory" />
          <div className="member-list">
            {members.slice(0, 5).map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="quick-grid">
        <button className="quick-card" onClick={onProjects}>
          <h3>Project Library</h3>
          <p>
            Centralized project information, files, links, screenshots, and
            lessons learned.
          </p>
        </button>

        <button className="quick-card" onClick={onResearch}>
          <h3>R&D / Models</h3>
          <p>
            Recently researched AI models, service models, experiments, and
            research notes.
          </p>
        </button>
      </section>

      <section className="panel">
        <PanelHeader title="Recent Activity" />
        <div className="activity-grid">
          <Activity
            color="#2563eb"
            title="Anna added a new FUJI dashboard file"
            time="5 min ago"
          />
          <Activity
            color="#f59e0b"
            title="Dorj reviewed Viz Platform export flow"
            time="32 min ago"
          />
          <Activity
            color="#10b981"
            title="Bolod updated Media Mix model results"
            time="2h ago"
          />
          <Activity
            color="#ec4899"
            title="Tsend opened Retail Heatmap planning"
            time="Yesterday"
          />
        </div>
      </section>
    </div>
  );
}

function ProjectsPage({
  onProject,
}: {
  onProject: (project: Project) => void;
}) {
  return (
    <div className="page">
      <div className="card-grid">
        {projects.map((project) => (
          <button
            key={project.id}
            className="project-card"
            onClick={() => onProject(project)}>
            <div className="card-head">
              <div>
                <h3>{project.name}</h3>
                <p>{project.client}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <p className="card-desc">{project.description}</p>

            <Progress value={project.progress} />

            <div className="meta-row">
              <span>{project.progress}% complete</span>
              <span>{project.members.length} members</span>
              <span>{project.files.length} files</span>
            </div>

            <TagList items={project.techStack.slice(0, 4)} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ResearchPage({
  onResearch,
}: {
  onResearch: (item: ResearchItem) => void;
}) {
  const models = researchItems.filter(
    (item) => item.type === "AI Model" || item.type === "Experiment",
  );
  const services = researchItems.filter(
    (item) => item.type === "Service Model",
  );
  const notes = researchItems.filter((item) => item.type === "Research Note");

  return (
    <div className="page">

      <div className="research-columns">
        <ResearchColumn
          title="AI Models and Experiments"
          items={models}
          onResearch={onResearch}
        />
        <ResearchColumn
          title="Service Models"
          items={services}
          onResearch={onResearch}
        />
        <ResearchColumn
          title="Research Notes"
          items={notes}
          onResearch={onResearch}
        />
      </div>
    </div>
  );
}

function ResearchColumn({
  title,
  items,
  onResearch,
}: {
  title: string;
  items: ResearchItem[];
  onResearch: (item: ResearchItem) => void;
}) {
  return (
    <div className="panel">
      <PanelHeader title={title} />
      <div className="research-list">
        {items.map((item) => (
          <button
            key={item.id}
            className="research-card"
            onClick={() => onResearch(item)}>
            <div className="research-top">
              <span>{item.type}</span>
              <ResearchStatus status={item.status} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <TagList items={item.stack.slice(0, 3)} />
            <small>
              {item.owner} · {item.updated}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}

function PeoplePage() {
  return (
    <div className="page">
      <div className="card-grid">
        {members.map((member) => (
          <div key={member.id} className="person-card">
            <div className="person-head">
              <Avatar label={member.initials} color={member.color} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>

            <TagList items={member.skills} />

            <div className="worked-on">
              <strong>Projects worked on</strong>
              {member.projects.map((project) => (
                <p key={project}>• {project}</p>
              ))}
            </div>

            <small>{member.email}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptsPage() {
  return (
    <div className="page">

      <div className="card-grid">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="prompt-card">
            <div className="prompt-head">
              <span>{prompt.category}</span>
              <small>{prompt.owner}</small>
            </div>
            <h3>{prompt.title}</h3>
            <p>{prompt.text}</p>
            <button>Copy Prompt</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchPage({
  query,
  setQuery,
  results,
}: {
  query: string;
  setQuery: (value: string) => void;
  results: {
    type: string;
    title: string;
    description: string;
    action: () => void;
  }[];
}) {
  return (
    <div className="page">
      <div className="search-box">
        <span className="top-search-icon">⌕</span>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try: "Who worked on React dashboards?"'
        />
        <kbd>⌘K</kbd>
      </div>

      <div className="search-examples">
        <button onClick={() => setQuery("React dashboard")}>
          React dashboard
        </button>
        <button onClick={() => setQuery("Media Mix")}>Media Mix</button>
        <button onClick={() => setQuery("service model")}>Service model</button>
        <button onClick={() => setQuery("campaign proposal")}>
          Campaign proposal
        </button>
      </div>

      <div className="result-list">
        {query.trim() && results.length === 0 && (
          <div className="empty-state">No results found for “{query}”</div>
        )}

        {results.map((result, index) => (
          <button
            key={`${result.type}-${result.title}-${index}`}
            className="result-card"
            onClick={result.action}>
            <span>{result.type}</span>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}


function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="page detail-page">
      <button className="back-button" onClick={onClose}>
        <span>←</span>
        Back to Projects
      </button>

      <section className="detail-hero">
        <div className="detail-hero-main">
          <div className="detail-icon project-icon">▦</div>

          <div>
            <p className="eyebrow">Project Detail</p>
            <h1>{project.name}</h1>
            <p>{project.description}</p>

            <div className="detail-meta-pills">
              <span>{project.client}</span>
              <span>{project.timeline}</span>
              <StatusBadge status={project.status} />
            </div>
          </div>
        </div>

        <div className="detail-progress-card">
          <span>Overall Progress</span>
          <strong>{project.progress}%</strong>
          <Progress value={project.progress} />
        </div>
      </section>

      <div className="detail-layout">
        <div className="detail-primary">
          <div className="panel">
            <PanelHeader title="Project Overview" />
            <div className="info-grid">
              <Info label="Client" value={project.client} />
              <Info label="Status" value={project.status} />
              <Info label="Timeline" value={project.timeline} />
              <Info label="Members" value={project.members.join(", ")} />
              <Info label="Goal" value={project.goal} wide />
              <Info
                label="Problem Solved"
                value={project.problemSolved}
                wide
              />
            </div>
          </div>

          <div className="panel">
            <PanelHeader title="Tasks" action="Add task" />
            <div className="task-list">
              {project.tasks.map((task) => (
                <div key={task.title} className="task-row">
                  <span
                    className={`check ${task.status === "Done" ? "done" : ""}`}
                  >
                    ✓
                  </span>
                  <strong>{task.title}</strong>
                  <small>{task.assignee}</small>
                  <TaskStatus status={task.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <PanelHeader title="Files and Assets" />
            <div className="file-list">
              {project.files.map((file) => (
                <div key={file.name} className="file-row">
                  <span className={`file-type ${file.type.toLowerCase()}`}>
                    {file.type}
                  </span>
                  <div>
                    <strong>{file.name}</strong>
                    <p>Added by {file.owner}</p>
                  </div>
                  <small>{file.size}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="detail-secondary">
          <div className="panel">
            <PanelHeader title="Team" />
            {project.members.map((name) => {
              const member = members.find((item) => item.name === name);
              return member ? (
                <MemberRow key={name} member={member} compact />
              ) : null;
            })}
          </div>

          <div className="panel ai-panel">
            <PanelHeader title="AI Assistant" action="Project-aware" />

            <div className="ai-bubble">
              I can summarize this project, find related files, explain
              progress, and prepare a client-ready update.
            </div>

            <div className="ai-actions">
              <button>Summarize</button>
              <button>Find files</button>
              <button>List risks</button>
              <button>Create update</button>
            </div>

            <div className="ai-input">
              <input placeholder="Ask about this project..." />
              <button>↑</button>
            </div>
          </div>

          <div className="panel">
            <PanelHeader title="Lessons Learned" />
            <div className="notes-list">
              {project.lessons.map((lesson) => (
                <p key={lesson}>• {lesson}</p>
              ))}
            </div>
          </div>

          <div className="panel">
            <PanelHeader title="Screenshots" />
            <div className="screenshot-list">
              {project.screenshots.map((shot) => (
                <span key={shot}>{shot}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function ResearchDetail({
  item,
  onClose,
}: {
  item: ResearchItem;
  onClose: () => void;
}) {
  return (
    <div className="page detail-page">
      <button className="back-button" onClick={onClose}>
        <span>←</span>
        Back to R&D
      </button>

      <section className="detail-hero research-hero">
        <div className="detail-hero-main">
          <div className="detail-icon research-icon">✦</div>

          <div>
            <p className="eyebrow">R&D Detail</p>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>

            <div className="detail-meta-pills">
              <span>{item.type}</span>
              <span>{item.owner}</span>
              <span>{item.updated}</span>
              <ResearchStatus status={item.status} />
            </div>
          </div>
        </div>
      </section>

      <div className="detail-layout research-detail-layout">
        <div className="panel">
          <PanelHeader title="Research Information" />
          <div className="info-grid">
            <Info label="Type" value={item.type} />
            <Info label="Status" value={item.status} />
            <Info label="Owner" value={item.owner} />
            <Info label="Updated" value={item.updated} />
            <Info label="Summary" value={item.summary} wide />
          </div>
        </div>

        <div className="panel">
          <PanelHeader title="Used In Projects" />
          <div className="padded-tags">
            <TagList items={item.usedIn} />
          </div>
        </div>

        <div className="panel">
          <PanelHeader title="Methods and Stack" />
          <div className="padded-tags">
            <TagList items={item.stack} />
          </div>
        </div>

        <div className="panel">
          <PanelHeader title="Related Assets" />
          <div className="file-list">
            {item.assets.map((asset) => (
              <div key={asset} className="file-row">
                <span className="file-type link">DOC</span>
                <div>
                  <strong>{asset}</strong>
                  <p>R&D asset</p>
                </div>
                <small>Link</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "blue" | "green" | "orange" | "purple";
}) {
  return (
    <div className={`stat-card ${tone}`}>
      <p>{label}</p>
      <h3>{value}</h3>
      <span>{note}</span>
    </div>
  );
}

function StatSimple({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-simple">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function PanelHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="panel-header">
      <h3>{title}</h3>
      {action && <button onClick={onAction}>{action}</button>}
    </div>
  );
}

function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action && <button className="primary-button">{action}</button>}
    </div>
  );
}

function ProjectRow({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button className="project-row" onClick={onClick}>
      <span className="row-dot" />
      <div className="row-main">
        <strong>{project.name}</strong>
        <p>
          {project.client} · {project.members.join(", ")}
        </p>
      </div>
      <div className="row-progress">
        <Progress value={project.progress} />
        <b>{project.progress}%</b>
      </div>
      <StatusText status={project.status} />
    </button>
  );
}

function MemberRow({
  member,
  compact = false,
}: {
  member: Member;
  compact?: boolean;
}) {
  return (
    <div className={`member-row ${compact ? "compact" : ""}`}>
      <Avatar label={member.initials} color={member.color} />
      <div>
        <strong>{member.name}</strong>
        <p>{member.role}</p>
        {!compact && <TagList items={member.skills.slice(0, 2)} small />}
      </div>
      {!compact && <span className="online-dot" />}
    </div>
  );
}

function Activity({
  color,
  title,
  time,
}: {
  color: string;
  title: string;
  time: string;
}) {
  return (
    <div className="activity-card">
      <span style={{ backgroundColor: color }} />
      <strong>{title}</strong>
      <p>{time}</p>
    </div>
  );
}

function Avatar({ label, color }: { label: string; color: string }) {
  return (
    <span className="avatar" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="progress">
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function TagList({
  items,
  small = false,
}: {
  items: string[];
  small?: boolean;
}) {
  return (
    <div className={`tag-list ${small ? "small" : ""}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
  );
}

function StatusText({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-text ${status.toLowerCase()}`}>{status}</span>
  );
}

function ResearchStatus({ status }: { status: ResearchStatus }) {
  return (
    <span className={`research-status ${status.toLowerCase()}`}>{status}</span>
  );
}

function TaskStatus({ status }: { status: Task["status"] }) {
  return (
    <span className={`task-status ${status.toLowerCase().replace(" ", "-")}`}>
      {status}
    </span>
  );
}

function Info({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`info-box ${wide ? "wide" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AccessRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="access-row">
      <div>
        <span style={{ backgroundColor: color }} />
        <strong>{label}</strong>
      </div>
      <p>{value}</p>
    </div>
  );
}
