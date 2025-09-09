// src/components/Header.jsx
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { netflix_logo } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const handleToggle = () => {
    dispatch(toggleGptSearchView());
  };

  // Detect scroll to apply Netflix-like transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header
      className={`w-screen fixed top-0 left-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-500 ${
        isScrolled ? "bg-black/90 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <img
        src={netflix_logo}
        alt="Netflix Logo"
        className="w-28 md:w-32 cursor-pointer object-contain"
        onClick={() => navigate("/browse")}
      />

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-4 md:gap-6">
          {/* GPT Search Toggle Button */}
          <button
            onClick={handleToggle}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-md shadow-md transition duration-300"
          >
            {showGptSearch ? "Home Page" : "Gpt Search"}
          </button>

          {/* User Avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="user"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-300 hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <FaUserCircle className="text-3xl md:text-4xl text-gray-300 hover:text-white transition-colors duration-300" />
          )}

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-md shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
