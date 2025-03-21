// import ArticleCard from "@/components/ArticleCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FilterCheck from "@/components/FilterCheck";
async function getRandomArticle() {
  const response = await axios.get("http://localhost:3000/api/wiki/random",{
    cache: "force-cache"
  });
  // console.log("Fetched article:", response.data); // Log it!

  return response.data;
}

export const revalidate = 3600

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  if(!session){
    redirect("/login")
  }
  const {user} = session
  const intialArticle = await getRandomArticle();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 dark:bg-black">
      <FilterCheck />

      
      <p className=""><span className="font-bold text-3xl">Welcome</span>,{user.email}</p>
      <InfiniteScroll
        intialArticle={intialArticle}
      />
      <div id="sentinel" className="h-10" />
    </div>
  );
}
