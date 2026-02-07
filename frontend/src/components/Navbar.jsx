

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-purple-600">
            StrLearners
        </h1>
        <p className="text-xs text-gray-500">
          powered by Strs
        </p>
      </div>

      <ul className="hidden md:flex gap-6 text-gray-700">
        <li>Home</li>
        <li>Courses</li>
        <li>Blog</li>
        <li>Contact</li>
      </ul>

    </nav>
  );
}
