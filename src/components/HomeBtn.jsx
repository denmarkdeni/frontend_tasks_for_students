import { Link } from "react-router-dom"; 
import { FaHome } from "react-icons/fa";
    
export default function HomeBtn() {
  return (
    <Link to="/" className="hb-btn">
      <FaHome /> Home
    </Link>
  );
}