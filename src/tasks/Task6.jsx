import { useState, useEffect, useContext, createContext } from "react";
import "./Task6.css";

// ── Context ──────────────────────────────────────────────
const GradeContext = createContext();

function GradeProvider({ children }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", score: 88 },
    { id: 2, name: "Physics",     score: 45 },
    { id: 3, name: "English",     score: 72 },
  ]);

  const addSubject = (name, score) => {
    setSubjects((prev) => [...prev, { id: Date.now(), name, score }]);
  };

  const removeSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <GradeContext.Provider value={{ subjects, addSubject, removeSubject }}>
      {children}
    </GradeContext.Provider>
  );
}   

// ── Helper ───────────────────────────────────────────────
function getGrade(score) {
  if (score >= 90) return { letter: "A", color: "#16a34a" };
  if (score >= 80) return { letter: "B", color: "#2563eb" };
  if (score >= 70) return { letter: "C", color: "#d97706" };
  if (score >= 60) return { letter: "D", color: "#ea580c" };
  return { letter: "F", color: "#dc2626" };
}

// ── Stat Card (props) ─────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div className="t6-stat" style={{ borderTopColor: accent }}>
      <p className="t6-stat-value" style={{ color: accent }}>{value}</p>
      <p className="t6-stat-label">{label}</p>
      {sub && <p className="t6-stat-sub">{sub}</p>}
    </div>
  );
}

// ── Subject Row (props) ───────────────────────────────────
function SubjectRow({ subject, onRemove }) {
  const { letter, color } = getGrade(subject.score);
  const pass = subject.score >= 50;

  return (
    <div className="t6-row">
      <span className="t6-row-name">{subject.name}</span>

      <div className="t6-bar-wrap">
        <div
          className="t6-bar-fill"
          style={{ width: `${subject.score}%`, background: color }}
        />
      </div>

      <span className="t6-row-score">{subject.score}%</span>

      <span className="t6-grade" style={{ color }}>{letter}</span>

      <span className={`t6-status ${pass ? "pass" : "fail"}`}>
        {pass ? "Pass" : "Fail"}
      </span>

      <button className="t6-del" onClick={() => onRemove(subject.id)}>✕</button>
    </div>
  );
}

// ── Add Form (useState) ───────────────────────────────────
function AddForm() {
  const { addSubject } = useContext(GradeContext);
  const [name,  setName]  = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim())                        return setError("Enter a subject name.");
    if (score === "" || score < 0 || score > 100) return setError("Score must be 0 – 100.");
    addSubject(name.trim(), Number(score));
    setName(""); setScore(""); setError("");
  };

  return (
    <form className="t6-form" onSubmit={handleAdd}>
      <h2 className="t6-form-title">Add Subject</h2>
      {error && <p className="t6-error">⚠ {error}</p>}
      <div className="t6-form-row">
        <input
          className="t6-input"
          type="text"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="t6-input t6-input-score"
          type="number"
          placeholder="Score (0–100)"
          value={score}
          min="0" max="100"
          onChange={(e) => setScore(e.target.value)}
        />
        <button className="t6-add-btn" type="submit">+ Add</button>
      </div>
    </form>
  );
}

// ── Stats Row ─────────────────────────────────────────────
function StatsRow() {
  const { subjects } = useContext(GradeContext);

  const total   = subjects.length;
  const avg     = total ? Math.round(subjects.reduce((s, x) => s + x.score, 0) / total) : 0;
  const highest = total ? Math.max(...subjects.map((x) => x.score)) : 0;
  const passing = subjects.filter((x) => x.score >= 50).length;
  const failing = total - passing;

  // useEffect: update tab title
  useEffect(() => {
    document.title = total ? `Grades · Avg ${avg}%` : "Grade Tracker";
  }, [subjects]);

  return (
    <div className="t6-stats">
      <StatCard label="Average"  value={`${avg}%`}     accent="#6366f1" />
      <StatCard label="Highest"  value={`${highest}%`} accent="#16a34a" />
      <StatCard label="Passing"  value={passing}        accent="#2563eb" sub={`of ${total}`} />
      <StatCard label="Failing"  value={failing}        accent="#dc2626" sub={`of ${total}`} />
    </div>
  );
}

// ── Subject List ──────────────────────────────────────────
function SubjectList() {
  const { subjects, removeSubject } = useContext(GradeContext);

  return (
    <div className="t6-list">
      <h2 className="t6-list-title">Subjects</h2>
      {subjects.length === 0
        ? <p className="t6-empty">No subjects yet. Add one above!</p>
        : subjects.map((s) => (
            <SubjectRow key={s.id} subject={s} onRemove={removeSubject} />
          ))
      }
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function Task6() {
  return (
    <GradeProvider>
      <div className="t6-page">
        <header className="t6-header">
          <h1 className="t6-header-title">Grade Tracker</h1> 
        </header>

        <StatsRow />
        <AddForm />
        <SubjectList />
      </div>
    </GradeProvider>
  );
}