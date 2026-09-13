import React from "react";
import "./Task3.css";

function IdCard({ name, age, blood, location }) {
  const firstLetter = name.charAt(0);
  const restOfName = name.slice(1);

  return (
    <div className="id-card">
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

      <p className="id-card-subtitle">Blood 🩸 : {blood}</p>

      <p className="id-card-thanks">Location : {location}</p>
    </div>
  );
}

const STUDENTS = [
  { name: "Dhana Raj", age: 25, blood: "O +ve", location: "Chennai" },
  { name: "Priya Sharma", age: 22, blood: "A +ve", location: "Mumbai" },
  { name: "Arjun Kumar", age: 27, blood: "B -ve", location: "Bengaluru" },
  { name: "Fatima Khan", age: 24, blood: "AB +ve", location: "Hyderabad" },
  { name: "Ravi Teja", age: 23, blood: "O -ve", location: "Vijayawada" },
  { name: "Meera Nair", age: 26, blood: "B +ve", location: "Kochi" },
  { name: "Karthik Iyer", age: 21, blood: "A -ve", location: "Coimbatore" },
  { name: "Sana Ali", age: 28, blood: "AB -ve", location: "Delhi" },
];

export default function Task3() {
  return (
    <div className="id-card-grid">
      {STUDENTS.map((student) => (
        <IdCard key={student.name} {...student} />
      ))}
    </div>
  );
}