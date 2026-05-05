import { useMemo, useState } from "react";

type Page = "home" | "projects" | "rnd" | "people" | "prompts" | "search";

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
      {
        title: "Final presentation deck",
        assignee: "Gerel",
        status: "Backlog",
      },
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
      {
        title: "Chart export module",
        assignee: "Gerel",
        status: "In Progress",
      },
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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className="min-h-screen bg-white text-neutral-800 antialiased font-sans tracking-[-0.01em] grid grid-cols-[280px_1fr] max-[1100px]:grid-cols-1">
      <Sidebar page={page} onPage={openPage} />

      <main className="min-w-0">
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
    { id: "search", label: "Search", icon: "⌕" },
  ];

  return (
    <aside className="sticky top-0 h-screen max-h-screen overflow-hidden border-r border-neutral-200 bg-neutral-50 px-[18px] py-7 flex flex-col max-[1100px]:static max-[1100px]:h-auto max-[1100px]:max-h-none">
      <div className="shrink-0 h-[64px] flex items-center gap-3.5 px-2.5 pb-6 border-b border-neutral-200">
        <div className="w-[44px] h-[44px] rounded-[17px] grid place-items-center text-white text-[26px] bg-gradient-to-br from-blue-600 to-violet-600">
          ▤
        </div>

        <div>
          <h1 className="m-0 text-[15px] tracking-[-0.035em] font-semibold text-neutral-900">
            DDAM Library <br></br>System
          </h1>
        </div>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto pr-1 pb-4 flex flex-col gap-1.5">
        {nav.map((item) => {
          const active = page === item.id;

          return (
            <button
              key={item.id}
              className={cn(
                "w-full h-[52px] rounded-xl border-0 bg-transparent text-neutral-700 flex items-center gap-3.5 px-3 text-[15px] font-medium text-left hover:bg-white hover:shadow-sm",
                active && "bg-white shadow-sm text-neutral-950",
              )}
              onClick={() => onPage(item.id)}>
              <span
                className={cn(
                  "w-9 h-9 min-w-9 rounded-xl grid place-items-center bg-slate-100 text-slate-500 text-[22px] leading-none",
                  active && "bg-blue-50 text-blue-600",
                )}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="shrink-0 mt-0 border-t border-neutral-200 pt-[18px] px-2.5 flex items-center gap-3 bg-neutral-50">
        <Avatar label="BB" color="#2563eb" />

        <div className="min-w-0">
          <strong className="block text-sm truncate">Bold</strong>
          <p className="m-0 mt-0.5 text-neutral-400 text-xs truncate">
            Workspace Admin
          </p>
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
    <header className="h-[92px] border-b border-neutral-200 grid grid-cols-[minmax(220px,1fr)_auto] items-center gap-6 px-[34px] bg-white/85 backdrop-blur sticky top-0 z-10 max-[1100px]:grid-cols-1 max-[1100px]:h-auto max-[1100px]:p-5">
      <div>
        <p className="m-0 mb-1 text-neutral-400 text-xs font-medium tracking-wide">
          {subtitleOverride || "DDAM Internal Platform"}
        </p>
        <h2 className="m-0 text-[20px] tracking-[-0.045em] font-semibold text-neutral-900">
          {titleOverride || pageTitle(page)}
        </h2>
      </div>

      <div className="flex items-center justify-end gap-3.5">
        <button className="border-0 bg-transparent text-neutral-400 font-semibold text-lg">
          •••
        </button>
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
    search: "Search",
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
    <div className="max-w-[1120px] mx-auto px-[34px] pt-[42px] pb-[90px] max-[640px]:px-4 max-[640px]:pt-6">
      <section className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-1">
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

      <section className="mt-[18px] grid grid-cols-[1.45fr_0.95fr] gap-[18px] max-[1100px]:grid-cols-1">
        <Panel>
          <PanelHeader
            title="Active Projects"
            action="View all"
            onAction={onProjects}
          />
          <div className="flex flex-col">
            {activeProjects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onClick={() => onProject(project)}
              />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Team Members" action="Directory" />
          <div className="flex flex-col">
            {members.slice(0, 5).map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>
        </Panel>
      </section>

      <section className="mt-[18px] grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        <button className="border border-neutral-200 bg-white rounded-[18px] p-[22px] text-left transition hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(16,24,40,0.06)] hover:border-neutral-300">
          <h3 className="m-0 mb-2 text-lg tracking-[-0.03em] font-medium">
            Project Library
          </h3>
          <p className="m-0 text-neutral-400 text-sm leading-6">
            Centralized project information, files, links, screenshots, and
            lessons learned.
          </p>
        </button>

        <button
          className="border border-neutral-200 bg-white rounded-[18px] p-[22px] text-left transition hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(16,24,40,0.06)] hover:border-neutral-300"
          onClick={onResearch}>
          <h3 className="m-0 mb-2 text-lg tracking-[-0.03em] font-medium">
            R&D / Models
          </h3>
          <p className="m-0 text-neutral-400 text-sm leading-6">
            Recently researched AI models, service models, experiments, and
            research notes.
          </p>
        </button>
      </section>

      <section className="mt-[18px]">
        <Panel>
          <PanelHeader title="Recent Activity" />
          <div className="grid grid-cols-4 max-[1100px]:grid-cols-1">
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
        </Panel>
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
    <PageShell>
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {projects.map((project) => (
          <button
            key={project.id}
            className="border border-neutral-200 bg-white rounded-[18px] p-[22px] text-left text-neutral-900 transition hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(16,24,40,0.06)] hover:border-neutral-300"
            onClick={() => onProject(project)}>
            <div className="flex justify-between items-start gap-3.5">
              <div>
                <h3 className="m-0 mb-1.5 text-[17px] tracking-[-0.025em] font-medium">
                  {project.name}
                </h3>
                <p className="m-0 text-neutral-400 text-[13px]">
                  {project.client}
                </p>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <p className="min-h-[60px] text-neutral-400 text-[13px] leading-6">
              {project.description}
            </p>

            <Progress value={project.progress} />

            <div className="mt-3 flex flex-wrap gap-3 text-neutral-400 text-xs font-medium">
              <span>{project.progress}% complete</span>
              <span>{project.members.length} members</span>
              <span>{project.files.length} files</span>
            </div>

            <TagList items={project.techStack.slice(0, 4)} />
          </button>
        ))}
      </div>
    </PageShell>
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
    <PageShell>
      <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-1">
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
    </PageShell>
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
    <Panel>
      <PanelHeader title={title} />
      <div className="flex flex-col">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full border-0 border-b border-neutral-200 bg-transparent p-[18px] text-left text-neutral-900 transition hover:bg-neutral-100 last:border-b-0"
            onClick={() => onResearch(item)}>
            <div className="flex justify-between items-start gap-3.5">
              <span className="text-blue-600 text-[11px] font-semibold uppercase tracking-wide">
                {item.type}
              </span>
              <ResearchStatusBadge status={item.status} />
            </div>
            <h3 className="m-0 mt-3 mb-1.5 text-[17px] tracking-[-0.025em] font-medium">
              {item.title}
            </h3>
            <p className="text-neutral-400 text-[13px] leading-6">
              {item.summary}
            </p>
            <TagList items={item.stack.slice(0, 3)} />
            <small className="block mt-3 text-neutral-400 text-xs font-medium">
              {item.owner} · {item.updated}
            </small>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function PeoplePage() {
  return (
    <PageShell>
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {members.map((member) => (
          <div
            key={member.id}
            className="border border-neutral-200 bg-white rounded-[18px] p-[22px] text-left">
            <div className="flex items-center gap-3">
              <Avatar label={member.initials} color={member.color} />
              <div>
                <h3 className="m-0 mb-1.5 text-[17px] tracking-[-0.025em] font-medium">
                  {member.name}
                </h3>
                <p className="m-0 text-neutral-400 text-[13px]">
                  {member.role}
                </p>
              </div>
            </div>

            <TagList items={member.skills} />

            <div className="mt-[18px]">
              <strong className="block mb-2 text-xs text-neutral-500">
                Projects worked on
              </strong>
              {member.projects.map((project) => (
                <p key={project} className="my-1 text-neutral-400 text-[13px]">
                  • {project}
                </p>
              ))}
            </div>

            <small className="block mt-3 text-neutral-400 text-xs font-medium">
              {member.email}
            </small>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PromptsPage() {
  return (
    <PageShell>
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="border border-neutral-200 bg-white rounded-[18px] p-[22px]">
            <div className="flex justify-between items-start gap-3.5">
              <span className="text-blue-600 text-[11px] font-semibold uppercase tracking-wide">
                {prompt.category}
              </span>
              <small className="text-neutral-400 text-xs font-medium">
                {prompt.owner}
              </small>
            </div>
            <h3 className="m-0 mt-3 mb-1.5 text-[17px] tracking-[-0.025em] font-medium">
              {prompt.title}
            </h3>
            <p className="min-h-[74px] text-neutral-400 text-[13px] leading-6">
              {prompt.text}
            </p>
            <button className="w-full h-10 border border-neutral-200 bg-neutral-100 rounded-xl text-neutral-900 text-[13px] font-semibold hover:bg-white">
              Copy Prompt
            </button>
          </div>
        ))}
      </div>
    </PageShell>
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
    <PageShell>
      <div className="h-[62px] border border-neutral-200 bg-white rounded-[18px] shadow-[0_8px_28px_rgba(16,24,40,0.06)] flex items-center gap-3.5 px-[18px] text-neutral-400">
        <span className="text-3xl">⌕</span>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try: "Who worked on React dashboards?"'
          className="flex-1 border-0 outline-0 text-neutral-900 text-base placeholder:text-neutral-400"
        />
        <kbd className="border border-neutral-200 bg-white text-neutral-400 rounded-md px-2 py-1 text-xs">
          ⌘K
        </kbd>
      </div>

      <div className="my-4 flex flex-wrap gap-2.5">
        {[
          "React dashboard",
          "Media Mix",
          "service model",
          "campaign proposal",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            className="border border-neutral-200 bg-neutral-100 text-neutral-700 rounded-full px-3 py-2 text-xs font-medium">
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {query.trim() && results.length === 0 && (
          <div className="border border-dashed border-neutral-300 rounded-[18px] p-11 text-center text-neutral-400">
            No results found for “{query}”
          </div>
        )}

        {results.map((result, index) => (
          <button
            key={`${result.type}-${result.title}-${index}`}
            className="w-full border border-neutral-200 bg-white rounded-[18px] p-[22px] text-left text-neutral-900 transition hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(16,24,40,0.06)] hover:border-neutral-300"
            onClick={result.action}>
            <span className="text-blue-600 text-[11px] font-semibold uppercase tracking-wide">
              {result.type}
            </span>
            <h3 className="m-0 mt-1.5 mb-1.5 text-[17px] tracking-[-0.025em] font-medium">
              {result.title}
            </h3>
            <p className="m-0 text-neutral-400 text-[13px] leading-6">
              {result.description}
            </p>
          </button>
        ))}
      </div>
    </PageShell>
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
    <div className="max-w-[1180px] mx-auto px-[34px] pt-[34px] pb-[90px] max-[640px]:px-4">
      <button
        className="h-10 border border-neutral-200 bg-white text-neutral-800 rounded-xl px-3.5 inline-flex items-center gap-2 text-[13px] font-semibold mb-[18px] hover:bg-neutral-100"
        onClick={onClose}>
        <span className="text-[17px]">←</span>
        Back to Projects
      </button>

      <section className="border border-neutral-200 bg-white rounded-3xl p-6 grid grid-cols-[1fr_240px] gap-5 items-stretch shadow-[0_8px_28px_rgba(16,24,40,0.06)] mb-5 max-[1100px]:grid-cols-1">
        <div className="flex gap-[18px] items-start max-[640px]:flex-col">
          <div className="w-16 h-16 rounded-[20px] grid place-items-center text-[28px] shrink-0 border border-neutral-200 bg-blue-50 text-blue-600">
            ▦
          </div>

          <div>
            <p className="m-0 mb-1 text-neutral-400 text-xs font-medium">
              Project Detail
            </p>
            <h1 className="m-0 mb-2 text-[32px] leading-tight tracking-[-0.06em] font-medium max-[640px]:text-[27px]">
              {project.name}
            </h1>
            <p className="m-0 text-neutral-400 text-sm leading-6 max-w-[780px]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Pill>{project.client}</Pill>
              <Pill>{project.timeline}</Pill>
              <StatusBadge status={project.status} />
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 bg-neutral-100 rounded-[20px] p-[18px] flex flex-col justify-center max-[1100px]:max-w-[360px]">
          <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wide">
            Overall Progress
          </span>
          <strong className="block my-3 text-[34px] tracking-[-0.06em]">
            {project.progress}%
          </strong>
          <Progress value={project.progress} />
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] gap-5 items-start max-[1100px]:grid-cols-1">
        <div className="flex flex-col gap-5">
          <Panel>
            <PanelHeader title="Project Overview" />
            <div className="grid grid-cols-2 max-[640px]:grid-cols-1">
              <Info label="Client" value={project.client} />
              <Info label="Status" value={project.status} />
              <Info label="Timeline" value={project.timeline} />
              <Info label="Members" value={project.members.join(", ")} />
              <Info label="Goal" value={project.goal} wide />
              <Info label="Problem Solved" value={project.problemSolved} wide />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Tasks" action="Add task" />
            <div className="flex flex-col">
              {project.tasks.map((task) => (
                <div
                  key={task.title}
                  className="min-h-[58px] grid grid-cols-[24px_1fr_auto_auto] gap-3 items-center border-b border-neutral-200 px-[18px] py-3.5 hover:bg-neutral-100 last:border-b-0 max-[640px]:grid-cols-[24px_1fr]">
                  <span
                    className={cn(
                      "w-5 h-5 border border-neutral-300 rounded-md grid place-items-center text-[11px] text-transparent",
                      task.status === "Done" &&
                        "bg-blue-600 border-blue-600 text-white",
                    )}>
                    ✓
                  </span>
                  <strong className="text-[13px]">{task.title}</strong>
                  <small className="text-neutral-400 text-xs max-[640px]:col-start-2">
                    {task.assignee}
                  </small>
                  <TaskStatusBadge status={task.status} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="min-h-[70px] border-b border-neutral-200 px-[18px] py-4 flex justify-between items-center gap-3.5">
              <div>
                <h3 className="m-0 text-[13px] tracking-[0.08em] uppercase text-neutral-600 font-semibold">
                  Files and Assets
                </h3>
                <p className="m-0 mt-1 text-neutral-400 text-xs">
                  View, download, or share project materials.
                </p>
              </div>

              <button className="h-[38px] border border-neutral-200 bg-white text-neutral-900 rounded-xl px-3 text-xs font-semibold whitespace-nowrap hover:bg-neutral-100">
                + Add file
              </button>
            </div>

            <div className="flex flex-col">
              {project.files.map((file) => (
                <div
                  key={file.name}
                  className="min-h-[72px] grid grid-cols-[42px_minmax(0,1fr)_auto] gap-3 items-center border-b border-neutral-200 px-[18px] py-3.5 hover:bg-neutral-100 last:border-b-0 max-[760px]:grid-cols-[42px_1fr]">
                  <span className={fileTypeClass(file.type)}>{file.type}</span>

                  <div className="min-w-0">
                    <strong className="block text-[13px] truncate">
                      {file.name}
                    </strong>
                    <p className="m-0 mt-1 text-neutral-400 text-xs">
                      Added by {file.owner} · {file.size}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 max-[760px]:col-start-2 max-[760px]:flex-wrap">
                    <button
                      disabled
                      className="h-[34px] border border-neutral-900 bg-neutral-900 text-white rounded-[10px] px-3 text-xs font-semibold disabled:opacity-60">
                      Download
                    </button>
                    <button className="h-[34px] border border-neutral-200 bg-white text-neutral-700 rounded-[10px] px-3 text-xs font-semibold hover:bg-neutral-100">
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="flex flex-col gap-5">
          <Panel>
            <PanelHeader title="Team" />
            {project.members.map((name) => {
              const member =
                members.find((item) => item.name === name) ||
                members.find((item) =>
                  name.toLowerCase().includes(item.name.toLowerCase()),
                );

              return member ? (
                <MemberRow key={name} member={member} compact />
              ) : (
                <div
                  key={name}
                  className="border-b border-neutral-200 px-5 py-4 text-sm text-neutral-500 last:border-b-0">
                  {name}
                </div>
              );
            })}
          </Panel>

          <Panel>
            <PanelHeader title="AI Assistant" action="Project-aware" />

            <div className="m-[18px] bg-slate-50 border border-slate-100 rounded-[14px] p-4 text-neutral-700 text-[13px] leading-6">
              I can summarize this project, find related files, explain
              progress, and prepare a client-ready update.
            </div>

            <div className="px-[18px] pb-4 grid grid-cols-2 gap-2.5">
              <AIButton>Summarize</AIButton>
              <AIButton>Find files</AIButton>
              <AIButton>List risks</AIButton>
              <AIButton>Create update</AIButton>
            </div>

            <div className="mx-[18px] mb-[18px] grid grid-cols-[1fr_40px] gap-2.5">
              <input
                placeholder="Ask about this project..."
                className="h-10 border border-neutral-200 bg-white rounded-xl px-3 outline-0 text-[13px]"
              />
              <button className="h-10 border border-neutral-200 bg-white rounded-xl font-semibold">
                ↑
              </button>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Lessons Learned" />
            <div className="p-[18px]">
              {project.lessons.map((lesson) => (
                <p
                  key={lesson}
                  className="m-0 mb-2 text-neutral-700 text-[13px] leading-6">
                  • {lesson}
                </p>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Screenshots" />
            <div className="p-[18px] flex flex-wrap gap-2">
              {project.screenshots.map((shot) => (
                <Pill key={shot}>{shot}</Pill>
              ))}
            </div>
          </Panel>
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
    <div className="max-w-[1180px] mx-auto px-[34px] pt-[34px] pb-[90px] max-[640px]:px-4">
      <button
        className="h-10 border border-neutral-200 bg-white text-neutral-800 rounded-xl px-3.5 inline-flex items-center gap-2 text-[13px] font-semibold mb-[18px] hover:bg-neutral-100"
        onClick={onClose}>
        <span className="text-[17px]">←</span>
        Back to R&D
      </button>

      <section className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-[0_8px_28px_rgba(16,24,40,0.06)] mb-5">
        <div className="flex gap-[18px] items-start max-[640px]:flex-col">
          <div className="w-16 h-16 rounded-[20px] grid place-items-center text-[28px] shrink-0 border border-neutral-200 bg-violet-50 text-violet-600">
            ✦
          </div>

          <div>
            <p className="m-0 mb-1 text-neutral-400 text-xs font-medium">
              R&D Detail
            </p>
            <h1 className="m-0 mb-2 text-[32px] leading-tight tracking-[-0.06em] font-medium max-[640px]:text-[27px]">
              {item.title}
            </h1>
            <p className="m-0 text-neutral-400 text-sm leading-6 max-w-[780px]">
              {item.summary}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Pill>{item.type}</Pill>
              <Pill>{item.owner}</Pill>
              <Pill>{item.updated}</Pill>
              <ResearchStatusBadge status={item.status} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-5 items-start max-[1100px]:grid-cols-1">
        <Panel>
          <PanelHeader title="Research Information" />
          <div className="grid grid-cols-2 max-[640px]:grid-cols-1">
            <Info label="Type" value={item.type} />
            <Info label="Status" value={item.status} />
            <Info label="Owner" value={item.owner} />
            <Info label="Updated" value={item.updated} />
            <Info label="Summary" value={item.summary} wide />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Used In Projects" />
          <div className="p-[18px]">
            <TagList items={item.usedIn} />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Methods and Stack" />
          <div className="p-[18px]">
            <TagList items={item.stack} />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Related Assets" />
          <div className="flex flex-col">
            {item.assets.map((asset) => (
              <div
                key={asset}
                className="min-h-[58px] grid grid-cols-[38px_1fr_auto] gap-3 items-center border-b border-neutral-200 px-[18px] py-3.5 hover:bg-neutral-100 last:border-b-0">
                <span className="w-[38px] h-[34px] rounded-[11px] grid place-items-center text-[10px] font-semibold bg-blue-100 text-blue-700">
                  DOC
                </span>
                <div>
                  <strong className="text-[13px]">{asset}</strong>
                  <p className="m-0 mt-1 text-neutral-400 text-xs">R&D asset</p>
                </div>
                <small className="text-neutral-400 text-xs">Link</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1120px] mx-auto px-[34px] pt-[42px] pb-[90px] max-[640px]:px-4 max-[640px]:pt-6">
      {children}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 bg-white rounded-[18px] overflow-hidden">
      {children}
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
    <div className="min-h-[58px] border-b border-neutral-200 flex items-center justify-between px-5">
      <h3 className="m-0 text-neutral-600 text-[13px] tracking-[0.08em] font-semibold uppercase">
        {title}
      </h3>
      {action && (
        <button
          onClick={onAction}
          className="border border-neutral-200 bg-white text-neutral-500 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-neutral-100">
          {action}
        </button>
      )}
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
  const toneMap = {
    blue: "bg-blue-600",
    green: "bg-emerald-600",
    orange: "bg-amber-600",
    purple: "bg-violet-700",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] p-[22px] min-h-[126px] text-white shadow-[0_8px_28px_rgba(16,24,40,0.06)] after:content-[''] after:absolute after:-right-6 after:-top-6 after:w-[88px] after:h-[88px] after:rounded-full after:bg-white/15",
        toneMap[tone],
      )}>
      <p className="m-0 text-xs font-semibold opacity-80 uppercase tracking-wide">
        {label}
      </p>
      <h3 className="my-2 text-[34px] leading-none tracking-[-0.06em] font-medium">
        {value}
      </h3>
      <span className="text-[13px] font-medium opacity-80">{note}</span>
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
    <button
      className="w-full border-0 border-b border-neutral-200 bg-transparent px-5 py-[18px] grid grid-cols-[12px_1fr_170px_90px] gap-3.5 items-center text-left text-neutral-900 hover:bg-neutral-100 last:border-b-0 max-[1100px]:grid-cols-[12px_1fr]"
      onClick={onClick}>
      <span className="w-[9px] h-[9px] rounded-full bg-blue-600" />

      <div>
        <strong className="text-sm">{project.name}</strong>
        <p className="m-0 mt-1 text-neutral-400 text-xs">
          {project.client} · {project.members.join(", ")}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_42px] items-center gap-2.5 max-[1100px]:col-start-2">
        <Progress value={project.progress} />
        <b className="text-neutral-500 text-xs">{project.progress}%</b>
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
    <div
      className={cn(
        "border-b border-neutral-200 px-5 py-4 grid gap-3 items-center hover:bg-neutral-100 last:border-b-0",
        compact ? "grid-cols-[38px_1fr]" : "grid-cols-[38px_1fr_10px]",
      )}>
      <Avatar label={member.initials} color={member.color} />
      <div>
        <strong className="text-sm">{member.name}</strong>
        <p className="m-0 mt-1 text-neutral-400 text-xs">{member.role}</p>
        {!compact && <TagList items={member.skills.slice(0, 2)} small />}
      </div>
      {!compact && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
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
    <div className="min-h-[92px] p-[18px] border-r border-neutral-200 grid grid-cols-[4px_1fr] gap-3 last:border-r-0 max-[1100px]:border-r-0 max-[1100px]:border-b">
      <span
        className="row-span-2 w-1 rounded-full"
        style={{ backgroundColor: color }}
      />
      <strong className="text-[13px] leading-5">{title}</strong>
      <p className="m-0 text-neutral-400 text-xs">{time}</p>
    </div>
  );
}

function Avatar({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="w-[38px] h-[38px] rounded-full inline-grid place-items-center text-white text-xs font-semibold shrink-0"
      style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
      <span
        className="h-full block rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
        style={{ width: `${value}%` }}
      />
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
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "border border-neutral-200 bg-neutral-100 text-neutral-700 rounded-full px-2.5 py-1.5 text-xs font-medium",
            small && "px-2 py-1 text-[11px]",
          )}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-neutral-200 bg-neutral-100 text-neutral-700 rounded-full px-3 py-1.5 text-xs font-medium">
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const style =
    status === "Planning"
      ? "bg-amber-100 text-amber-800"
      : status === "Done"
        ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-800";

  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap",
        style,
      )}>
      {status}
    </span>
  );
}

function StatusText({ status }: { status: ProjectStatus }) {
  const color =
    status === "Planning"
      ? "text-amber-600"
      : status === "Done"
        ? "text-blue-600"
        : "text-emerald-600";

  return (
    <span
      className={cn("text-xs font-semibold max-[1100px]:col-start-2", color)}>
      {status}
    </span>
  );
}

function ResearchStatusBadge({ status }: { status: ResearchStatus }) {
  const style =
    status === "Testing"
      ? "bg-amber-100 text-amber-800"
      : status === "Validated"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-500";

  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap",
        style,
      )}>
      {status}
    </span>
  );
}

function TaskStatusBadge({ status }: { status: Task["status"] }) {
  const style =
    status === "Done"
      ? "bg-green-100 text-green-800"
      : status === "In Progress"
        ? "bg-amber-100 text-amber-800"
        : status === "Urgent"
          ? "bg-rose-100 text-rose-700"
          : "bg-gray-100 text-gray-500";

  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap max-[640px]:col-start-2",
        style,
      )}>
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
    <div
      className={cn(
        "border-r border-b border-neutral-200 p-[18px]",
        wide && "col-span-2 max-[640px]:col-span-1",
      )}>
      <span className="block mb-2 text-neutral-400 text-[11px] uppercase tracking-[0.08em] font-semibold">
        {label}
      </span>
      <strong className="text-[13px] leading-6">{value}</strong>
    </div>
  );
}

function AIButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-10 border border-neutral-200 bg-white text-neutral-900 rounded-xl text-xs font-semibold hover:bg-neutral-100">
      {children}
    </button>
  );
}

function fileTypeClass(type: FileAsset["type"]) {
  const base =
    "w-[38px] h-[34px] rounded-[11px] grid place-items-center text-[10px] font-semibold";

  const map: Record<FileAsset["type"], string> = {
    XL: "bg-green-100 text-green-800",
    PP: "bg-amber-100 text-amber-800",
    WD: "bg-blue-100 text-blue-700",
    PDF: "bg-rose-100 text-rose-700",
    FIG: "bg-violet-100 text-violet-700",
    LINK: "bg-blue-100 text-blue-700",
  };

  return cn(base, map[type]);
}
