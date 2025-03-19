import axios from "axios";

export async function GET(){
    try{
        const response = await axios.get(
           "https://en.wikipedia.org/api/rest_v1/page/random/summary"
        )

        const data = response.data

        return Response.json({
            pageid: data.pageid,
            title:data.title,
            extract: data.extract,
            image: data.thumbnail?.source || null
        })
    }catch(error){
            return Response.json({error:"Failed to fetch article"}, {status:500})
    }
}