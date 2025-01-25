import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center pt-[200px]">
      <NavLink to="form">
        <button className="rounded-full bg-blue-600 py-2 px-4 hover:bg-blue-800 text-white">
          React Form Validation
        </button>
      </NavLink>
    </div>
  );
}
