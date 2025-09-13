import { useRef, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";  
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { userdefultprofile } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name  = useRef(null);

  const handleClick = async () => {
    if (email.current && password.current) {
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      try {
        if (isSignInForm) {
          // ✅ Login
          const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
          const user = userCredential.user;

          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          alert("Login successful!");

        } else {
          // ✅ Signup
          const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: name.current.value,
            photoURL:userdefultprofile 
          });

          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));

          alert("Account created successfully!");
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Email/Password field is empty!");
    }
  };

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
    setError("");
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/BgImage.jpg')" }} // ✅ Public folder image
    >
      <Header />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Form */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-75 p-6 w-80 flex flex-col gap-4 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 mb-8 mt-4 bg-red-600 rounded text-white font-semibold hover:bg-red-700 transition"
            onClick={handleClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p onClick={toggleSignInForm} className="cursor-pointer hover:underline">
            {isSignInForm
              ? "Are you new? Sign Up Now"
              : "Already Registered? Please Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
