import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* <h1 className="text-4xl font-bold">
        Wiki Scroll: Knowledge Meets Tiktok
      </h1> */}
      <ArticleCard />
    </div>
  );
}
