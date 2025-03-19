// import ArticleCard from "@/components/ArticleCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import axios from "axios";
async function getRandomArticle() {
  const response = await axios.get("http://localhost:3001/api/wiki/random", {
    cache: "no-store",
  });
  // console.log("Fetched article:", response.data); // Log it!

  return response.data;
}

export default async function Home() {
  const intialArticle = await getRandomArticle();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <InfiniteScroll
        intialArticle={intialArticle}
      />
      <div id="sentinel" className="h-10" />
    </div>
  );
}
