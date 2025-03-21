"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light"); // Default for server
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only runs client-side
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true); // Mark as mounted
  }, []); // Empty deps—runs once on mount

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <button className="btn btn-outline text-black dark:text-white">
        Loading...
      </button>
    ); // Placeholder—matches structure
  }

  return (
    <button
      onClick={handleToggle}
      className="btn btn-outline text-black dark:text-white"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}