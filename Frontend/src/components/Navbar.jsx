import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 px-24 text-white bg-pink-600 shadow-md p">
      <h1 className="text-lg font-bold"> <Link to="/" className="cursor-pointer">Cosma Beauty</Link></h1>
      <div className="space-x-16">
        <Link to="/" className="cursor-pointer">Home</Link>
        <Link to="/search" className="cursor-pointer">Search</Link>
        <Link to="/admin" className="cursor-pointer">Admin</Link>
      </div>
    </nav>
  );
}
