import { useState, useEffect } from "react";
import { fetchBlogNews } from "@/services";

export default function BlogPage() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchNews = async () => {
        const { result } = await fetchBlogNews(currentPage);
        setNews((current) => [...current, ...result]);
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-wrap mx-auto p-10 gap-9">
            {news.length > 0 ? (
                news.map((item) => (
                    <a href={item.sourceLink} className="cursor-pointer" target="_blank" key={item.id}>
                        <div className="w-96 h-96 bg-slate-600 rounded-xl text-center">
                            <img
                                src={item.imgUrl}
                                alt={item.relatedCoins[0]}
                                className="rounded-xl w-72 my-5 mx-10 pt-12 h-56"
                            />
                            <p className="p-4  line-clamp-2 text-white text-center">
                                {item.title}
                            </p>
                        </div>
                    </a>
                ))
            ) : (
                ""
            )}
        </div>
    );
}
