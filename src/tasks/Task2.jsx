
import "./Task2.css";

export default function Task2({ name = "Dhana Raj", age = 25 }) {
  const firstLetter = name.charAt(0);
  const restOfName = name.slice(1);

  return (
        <div className="id-card1">
        <h1 className="id-card-title">Id card</h1>

        <div className="id-card-avatar">
            <div className="id-card-avatar-inner">
            <svg viewBox="0 0 24 24" width="42" height="42" fill="#ffffff">
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
            </svg>
            </div>
        </div>

        <p className="id-card-name">
            <span className="drop-cap">{firstLetter}</span>
            {restOfName}
        </p>

        <p className="id-card-age">Age : {age}</p>

        <p className="id-card-subtitle">Blood 🩸 : O +ve</p>

        <p className="id-card-thanks">
            Location :  <span role="img" aria-label="thumbs up">Chennai</span>
        </p>
        </div>
  );
}