import { useState, useContext, useEffect, createContext } from "react";
import "./Task5.css"
// ============================================================
// STEP 1: CREATE A CONTEXT
// useContext lets us share data across components
// without passing props every time
// ============================================================
const ThemeContext = createContext();


// ============================================================
// STEP 2: THEME PROVIDER COMPONENT
// This wraps the whole app and shares the theme value
// ============================================================
function ThemeProvider({ children }) {

  // useState to store the current theme
  const [theme, setTheme] = useState("light");

  // Function to toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // Provide theme and toggleTheme to all child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}


// ============================================================
// STEP 3: TITLE COMPONENT
// Receives a prop called "text" and displays it
// ============================================================
function Title({ text }) {
  return <h1 className="title">{text}</h1>;
}


// ============================================================
// STEP 4: COUNTER DISPLAY COMPONENT
// Receives "count" as a prop and shows it on screen
// ============================================================
function CounterDisplay({ count }) {
  return (
    <div className="counter-display">
      <p className="count-number">{count}</p>
    </div>
  );
}


// ============================================================
// STEP 5: BUTTON COMPONENT
// Receives "label" and "onClick" as props
// ============================================================
function CounterButton({ label, onClick, color }) {
  return (
    <button
      className="counter-btn"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}


// ============================================================
// STEP 6: THEME TOGGLE COMPONENT
// Uses useContext to read and change the theme
// ============================================================
function ThemeToggle() {

  // useContext: grab theme and toggleTheme from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}


// ============================================================
// STEP 7: MESSAGE COMPONENT
// Shows a message based on the current count value (prop)
// ============================================================
function Message({ count }) {
  if (count === 0) return <p className="message neutral">Start counting! 🚀</p>;
  if (count > 0)   return <p className="message positive">Going up! 📈</p>;
  return           <p className="message negative">Going down! 📉</p>;
}


// ============================================================
// STEP 8: MAIN APP COMPONENT
// This is the main component that holds all the logic
// ============================================================
function Task5() {

  // useState: track the counter value
  const [count, setCount] = useState(0);

  // Functions to change the count
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset     = () => setCount(0);

  // useEffect: runs every time "count" changes
  // Here we update the browser tab title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // <- dependency array: runs when count changes

  return (
    <ThemeProvider>

      {/* ThemeToggle - uses useContext inside */}
      <ThemeToggle />

      {/* Title - receives text as a prop */}
      <Title text="My Counter App" />

      {/* CounterDisplay - receives count as a prop */}
      <CounterDisplay count={count} />

      {/* Message - receives count as a prop */}
      <Message count={count} />

      {/* Buttons - each receives label, color, onClick as props */}
      <div className="btn-row">
        <CounterButton label="− Decrease" onClick={decrement} color="#ef4444" />
        <CounterButton label="↺ Reset"    onClick={reset}     color="#6b7280" />
        <CounterButton label="+ Increase" onClick={increment} color="#22c55e" />
      </div>

    </ThemeProvider>
  );
}

export default Task5;