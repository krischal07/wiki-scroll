"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
type WikiPage = {
  pageid:number,
  title:string,
  extract: string
}
const Home = () => {
  const [keyword, setKeyword] = useState("")
  const[search, setSearch] = useState("")
  const[loading, setLoading] = useState(false)
  const [info, setInfo] = useState("")
  const[image, setImage] = useState("")
  const [text, setText] = useState("")

  // const [info, setInfo] = useState<WikiPage | null>(null)
  console.log(search)
  console.log(keyword,"keyword")

  // console.log("heelo")
  // useEffect(()=>{
  //     const fetchData = async ()=>{
  //       const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${keyword}`)
  //       const data = await response.json()
  //       const pages = Object.values(data.query.pages) as WikiPage[]
  //       setInfo(pages[0])
  //       // setInfo(data)
  //       // console.log(info)
  //     }
  //     if(search){

  //       fetchData()
  //     }
  // },[keyword])

  // const searchWiki = async()=>{
  //   // setKeyword(search)
  //   setLoading(true)
  //   if(!keyword) return
  //   try {
  //     const url = "https://en.wikipedia.org/w/api.php"
  //     const params = new URLSearchParams({
  //       action:'query',
  //       list:"search",
  //       srsearch:keyword,
  //       // prop:"images",
  //       format:"json",
  //       origin: "*"
  //     })
      
  //     const res = await fetch(`${url}?${params}`)
  //     const data = await res?.json()
      
  //     if((data?.query?.search[0]?.title)){
  //       console.log(data)
  //       setPages(data?.query?.search )
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     setLoading(false)
  //   }

  // }
  // const showPage = async (page)=>{
  //   console.log(page)
  //   setLoading(true)
  //   try {
  //     const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${page?.title}&prop=text&formatversion=2&origin=*&format=json`
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     console.log(data,"data")
  //     setInfo(data)
  //     // console.log(info,"info")
  //   } catch (error) {
  
  //   }
  // }

  useEffect(()=>{
      const fetchWiki =async ()=>{
          setLoading(true)
          try {
                const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${keyword}&prop=text&formatversion=2&origin=*&format=json`
                const res = await fetch(url)
                const data = await res.json()
                console.log(data,"data")
                setInfo(data?.parse?.text)
                // Extracting the first paragraphn only
                const pageHtml = data?.parse?.text
                const tempDiv = document.createElement("div")
                tempDiv.innerHTML = pageHtml

                // Remove unwanted elements
                 tempDiv.querySelectorAll("table, style, script, .hatnote").forEach((el) => el.remove());

                 const firstPara = [...tempDiv.querySelectorAll("p")]
                 .find((p) => p.innerText.trim().length > 1)?.innerText || "No content found.";
       
                console.log(firstPara, "firstPara")
                console.log(pageHtml, "pageHtml")
                setText(firstPara)

                // Extracting Images only
                const firstImg = tempDiv.querySelector("img")
                let imgUrl = ""
                if(firstImg){
                  const src = firstImg.getAttribute("src")
                  if(src){
                    imgUrl = src.startsWith("//") ? `https:${src}` : `https://en.wikipedia.org${src}`;

                  }
                }
                setImage(imgUrl)
                
              } catch (error) {
                console.log(error)
              }finally{
                setLoading(false)
              }
      }
      fetchWiki()

  },[keyword])
  return (
  
    <div>
      <div className='flex m-5'>
      <Input type='text' placeholder='Search for anything...' className='w-56 mr-4' onChange={(e)=>setSearch(e.target.value)}/>
      <Button onClick={()=>setKeyword(search)}>Search</Button>

      </div>
      {loading===true?<div>Loading.....</div>:<div>
        {/* <div dangerouslySetInnerHTML={{__html:info}}/> */}
        {image && <img src={image} style={{width:"300px", borderRadius:"8px"}}/>}
        <p className='border-2 border-red-500'>{text}</p>
      </div>}
      
   
    </div>
  )
}

export default Home