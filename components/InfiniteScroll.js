"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const InfiniteScroll = ({ intialArticle }) => {
  const [articles, setArticles] = useState([intialArticle]);
  const sentinelRef = useRef(null);
  //   console.log(intialArticle, "intialArticle");
  //   console.log("articles",articles)
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          const response = await axios.get("/api/wiki/random");
          const newArticle = response.data;
          setArticles((prev) => [...prev, newArticle]);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <div className="flex">
        <LogoutButton />
        <ThemeToggle />
        <Link href="/profile">
          <button className="btn btn-secondary">
            View Profile
          </button>
        </Link>
      </div>
      {articles.map((article) => (
        <ArticleCard
          key={article.pageid}
          title={article.title}
          extract={article.extract}
          image={article.image}
        />
      ))}
      <div ref={sentinelRef} className="h-10" />
    </div>
  );
};

export default InfiniteScroll;
