"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Add error state
  const router = useRouter(); // For redirect after success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear old errors
    const result = await signIn("credentials", {
      redirect: false, // Don’t redirect automatically
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password"); 
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Login to Wiki Scroll</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error display */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full bg-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full bg-white"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn btn-secondary w-full mt-4"
        >
          Sign In with Google
        </button>
     
      </div>
    </div>
  );
}