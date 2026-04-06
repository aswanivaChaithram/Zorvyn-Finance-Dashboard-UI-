import React, { useState } from 'react';
import close from "../assets/cross_icon.png";

const Login = ({ setShowLogin, registerUser, loginUser }) => {

    const [currentState, setCurrentState] = useState("Login");
    const [role, setRole] = useState("User");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

    if (currentState === "Sign Up") {
      const success = registerUser({ username, email, password });
      if (success) {
        setCurrentState("Login");
      }
    } else {
      loginUser({ email, password, role, username });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">

      <div className="w-[90%] sm:w-[350px] bg-gray-800 text-white
       p-6 rounded-xl shadow-lg relative">

        <img src={close} alt="close" onClick={() => setShowLogin(false)}
          className="w-4 absolute right-4 top-4 cursor-pointer"/>

        <h2 className="text-2xl font-bold mb-5 text-center">
          {currentState}
        </h2>

        <div className="flex gap-3 mt-4 mb-2 justify-center">

          {/* User button */}
          <button onClick={() => setRole("User")}
            className={`px-4 py-1.5 rounded-full font-bold transition cursor-pointer
              ${role === "User" ? "bg-blue-600 text-white"
                : "border-2 border-blue-500 text-blue-500"}`}>
            User
          </button>

          {/* Admin button */}
          <button onClick={() => { setRole("Admin"); setCurrentState("Login"); }}
            className={`px-4 py-1.5 rounded-full font-bold transition cursor-pointer
              ${role === "Admin" ? "bg-blue-600 text-white"
                : "border-2 border-blue-500 text-blue-500"}`}>
            Admin
          </button>

        </div>

        {role === "Admin" && (
          <div className="mt-3 text-sm text-gray-400 text-center">
            <p>Username: Admin</p>
            <p>Password: admin@1234</p>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-4">

         {currentState === "Sign Up" && role === "User" && (
          <input type="text" placeholder="Username" value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="p-2.5 rounded bg-gray-800 border border-gray-600 text-white outline-none"/>
         )}

          {role === "Admin" ? (
            <input type="text" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2.5 rounded bg-gray-800 border border-gray-600 text-white outline-none"/>
          ) : (
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2.5 rounded bg-gray-800 border border-gray-600 text-white outline-none"/>
          )}

          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2.5 rounded bg-gray-800 border border-gray-600 text-white outline-none"/>

        </div>

        <button onClick={handleSubmit} className="w-full mt-5 py-2.5 rounded bg-blue-600
         hover:bg-blue-700 transition cursor-pointer">
           {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {role === "User" && (
          currentState === "Login" ? (
            <p className="text-sm text-center mt-4 text-gray-400">
              Don't have an account?{" "}
              <span onClick={() => setCurrentState("Sign Up")} 
              className="text-blue-400 cursor-pointer">
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-sm text-center mt-4 text-gray-400">
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}
                className="text-blue-400 cursor-pointer">
                  Login here
              </span>
            </p>
          )
        )}

      </div>
    </div>
  );
};

export default Login;