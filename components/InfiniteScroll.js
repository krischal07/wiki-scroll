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
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        setLoading(true);
        if (entries[0].isIntersecting) {
          const response = await axios.get("/api/wiki/random");
          const newArticle = response.data;
          setArticles((prev) => [...prev, newArticle]);
          setLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
      <div className="flex">
        <div>

      <div className="flex">
        <LogoutButton />
        <ThemeToggle />
        <Link href="/profile">
          <button className="btn btn-secondary">View Profile</button>
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
      {loading && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
</div>
<div>

      {showBackToTop && (
        <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 btn btn-circle btn-primary text-white"
        >
          Top
        </button>
      )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
