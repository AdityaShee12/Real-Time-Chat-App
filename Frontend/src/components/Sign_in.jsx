import React, { useState } from "react";
import { loginUser } from "../services/userService.jsx";
import { useNavigate } from "react-router-dom";
const Sign_in = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username,
      email,
      password,
    };

    try {
      const response = await loginUser(credentials);
      const userName = response.data.user.fullName;
      const userId = response.data.user._id;
      navigate("/layout", { state: { userId, userName } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen p-4 flex flex-col items-center justify-center space-y-4">
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full p-8 rounded-xl flex flex-col  items-center border border-gray-300 space-y-4">
        <h1 className="text-4xl text-center font-bold mb-4 font-mono">
          Chat_Book
        </h1>
        <input
          id="email"
          type="email"
          placeholder="Phone number, username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-slate-100"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-slate-100"
        />{" "}
        <button
          onClick={handleLogin}
          className="mt-4 max-w-xs sm:max-w-sm md:max-w-md w-full text-black font-bold py-2 px-4 rounded transition duration-300 font-mono hover:shadow-lg hover:shadow-sky-400 border border-gray-300 text-center">
          Sign in
        </button>
        <div>Forgot password?</div>
      </div>
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full p-4 rounded-xl flex items-center justify-center border border-gray-300 text-gray-700 text-center">
        Don't have an account?
        <a href="/" className="ml-1 text-blue-500 hover:underline">
          {" "}
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Sign_in;

// import React, { useState } from "react";
// import { loginUser } from "../services/userService.jsx";
// import { useNavigate, useLocation } from "react-router-dom";
// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const credentials = {
//       username,
//       email,
//       password,
//     };

//     try {
//       const response = await loginUser(credentials);
//       console.log(response); // Handle successful login
//       const userName = response.data.name;
//       const userId = response.data.userId;
//       navigate("/search", { state: { userId, userName } });
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Welcome Back
//         </h2>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email">
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300">
//             Login
//           </button>
//         </div>
//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/register" className="text-indigo-500 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
