import { Link } from "react-router-dom";


const tasks = [
  {
    id: 1,
    number: "01",
    title: "HTML Structure",
    category: "HTML",
    topics: ["Tags", "Text Formatting" , "Semantic"],
  },
  {
    id: 2,
    number: "02",
    title: "CSS Styling",
    category: "CSS",
    topics: ["Selectors", "Box Model", "flex"],
  },
  {
    id: 3,
    number: "03",
    title: "Flexbox Layout",
    category: "CSS",
    topics: ["display: flex", "flex-wrap"],
  },
  {
    id: 4,
    number: "04",
    title: "Validation Form",
    category: "JS",
    topics: ["Form", "Events", "Functions"],
  },
  {
    id: 5,
    number: "05",
    title: "Counter App",
    category: "React",
    topics: ["useState"],
  },
  {
    id: 6,
    number: "06",
    title: "Grade Tracker",
    category: "React",
    topics: ["Math", "Form handling", "map"],
  },
];

const categoryMeta = {
  HTML:  { bg: "#fff0e6", text: "#c2500a", accent: "#fb923c" },
  CSS:   { bg: "#eff6ff", text: "#1d4ed8", accent: "#60a5fa" },
  JS:    { bg: "#fefce8", text: "#a16207", accent: "#facc15" },
  React: { bg: "#f0fdf4", text: "#166534", accent: "#4ade80" },
};

function HpTaskCard({ task }) {
  const meta = categoryMeta[task.category];
  return (
    <div className="hp-card">
      <div className="hp-card-accent" style={{ background: meta.accent }} />
      <div className="hp-card-inner">
        <div className="hp-card-top">
          <span className="hp-card-num">{task.number}</span>
          <span className="hp-cat-badge" style={{ background: meta.bg, color: meta.text }}>
            {task.category}
          </span>
        </div>
        <h2 className="hp-card-title">{task.title}</h2>
        <div className="hp-topics">
          {task.topics.map((t) => (
            <span className="hp-topic-chip" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="hp-page">
      <header className="hp-header">
        <p className="hp-header-label">Student Tasks</p>
        <h1 className="hp-header-title">Front<span className="hp-header-highlight">end</span></h1>
        <p className="hp-header-sub">HTML &nbsp;·&nbsp; CSS &nbsp;·&nbsp; JavaScript &nbsp;·&nbsp; React</p>
      </header>

      <main className="hp-grid">
        {tasks.map((task) => (
            <Link key={task.id} to={`task/${task.id}/`}>
                <HpTaskCard task={task} />
            </Link>
        ))}
      </main>
    </div>
  );
}