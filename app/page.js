import ArticleCard from "@/components/ArticleCard";
import axios from "axios";
async function getRandomArticle(){
  const response = await axios.get('http://localhost:3001/api/wiki/random')
  // console.log("Fetched article:", response.data); // Log it!

  return response.data
}

export default async function Home() {
  const article = await getRandomArticle()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <ArticleCard image={article.image} extract={article.extract} title={article.title}/>
    </div>
  );
}
