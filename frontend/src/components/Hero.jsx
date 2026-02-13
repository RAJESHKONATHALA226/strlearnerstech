import logo from "../assets/strBanner.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="text-center px-6 py-12 ">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
        Masters in Mern Stack Development
      </h2>

      <h3 className="mt-4 text-3xl md:text-5xl font-bold text-purple-600">
        Build, Test, Deploy, Earn
      </h3>

      <div className="mt-10 flex justify-center">
        <div className="border-4 border-purple-500 rounded-2xl overflow-hidden max-w-2xl shadow-xl">
          <img src={logo} className="w-md" />
        </div>
      </div>

      <p className="mt-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
        Join our comprehensive strlearners course to master Mern Stack
        with hands-on projects, expert guidance, and a
        supportive community.
      </p>

      <Link to="/courses" className="mt-6 inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 ease-in-out animate-pulse">
        Check the Course on Strlearners
    
      </Link>
    </section>
  );
}
