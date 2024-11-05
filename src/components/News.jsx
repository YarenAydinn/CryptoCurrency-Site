import { useState, useEffect } from "react";
import { fetchNews } from '@/services'
import axios from "axios";

export default function News() {
    const [news, setNews] = useState([])
    const [link,setLink]=useState()

    const fetchNewsData = async () => {
     try {
        const data=await fetchNews()
        setNews(data.result)
        console.log(data.result)
     } catch (error) {
        console.log(error);
     }
    }
    useEffect(() => {
        fetchNewsData()
    }, [])

    const fetchSourceLink = async(link) => {
        try {
            console.log(link);
        const res = await axios.get(link)
        setLink(res.data.sourceLink)
        console.log("Response:", res.data.sourceLink);
        if (res.status === 200) {
            const data = await res.json()
            console.log("Fetched data:", data);
            window.open(link, "_blank")
        }
        
       } catch (error) {
        console.error("Failed to fetch link:", error);
       }

    }

    return (
        <div className="h-96  flex flex-col justify-center ">
   <table className="w-full py-5 mt-9">
    <thead className="text-center w-full font-bold pt-9 mx-12">
        <tr className="flex justify-start">
            <td className="mr-52 ml-9 mb-3">Title</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
    {
            news.length>0?news.splice(0,4).map((item)=>{
                return(
                    <tr key={item.id} onClick={()=>fetchSourceLink(item.sourceLink)} className="hover:bg-slate-600 h-24 text-center mb-6">
                        <a href={item.sourceLink} className="flex" target="_blank">
                        <td><img src={item.imgUrl} alt={item.relatedCoin} className="flex item-center jutify-center max-w-36 min-w-36 h-24 "/></td>
                        <div className="flex flex-col justify-center text-center">
                        <td className="text-red-600">{item.relatedCoins[0]}</td>
                        <td className="w-96 line-clamp-2">{item.title}</td>
                        </div>
                        </a>
                    </tr>
                )
            }):'No Avaliable Coin'
        }
    </tbody>
   </table>
    </div>
);
    
}