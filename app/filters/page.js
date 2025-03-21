"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Filters() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const router = useRouter();

  const topics = [
    "Science",
    "History",
    "Technology",
    "Art",
    "Music",
    "Sports",
    "Nature",
    "Politics",
    "Food",
    "Travel",
  ]; // 10 to start

  const handleToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else if (selectedTopics.length < 10) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("filters", JSON.stringify(selectedTopics));
    router.push("/");
  };

  const handleSkip = () => {
    localStorage.setItem("filters", JSON.stringify([])); // Empty = random
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <div className="card w-full max-w-md p-6 bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Pick Your Topics
        </h1>
        <p className="text-black dark:text-white mb-4">
          Choose up to 10 (Selected: {selectedTopics.length}/10)
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleToggle(topic)}
              className={`btn ${
                selectedTopics.includes(topic)
                  ? "btn-primary"
                  : "btn-outline"
              } text-black dark:text-white`}
              disabled={
                !selectedTopics.includes(topic) && selectedTopics.length >= 10
              }
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="btn btn-primary flex-1"
            disabled={selectedTopics.length === 0}
          >
            Save
          </button>
          <button onClick={handleSkip} className="btn btn-outline flex-1">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}