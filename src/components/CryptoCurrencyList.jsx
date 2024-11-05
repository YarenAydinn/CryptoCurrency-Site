import { useState, useEffect } from "react"
import { fetchListingLatest } from '@/services'
import { Pagination } from "@/components"
import { useNavigate } from "react-router-dom"

export default function CryptoCurrencyList() {
    const [curr, setCurr] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const sendApiReq = async () => {
        setIsLoading(true)
        fetchListingLatest().then(response => {
            setCurr(response)
            setIsLoading(false)
            console.log(response);
        })
    }
    useEffect(() => {
        sendApiReq()
        // console.log("currentPage",currentPage);
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPots = curr.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumbers => setCurrentPage(pageNumbers)

    const handleClick = (id) => {
        navigate('/cryptodetailpage/' + id)
    }

    return (
        <div className="grid gap-4 justify-center bg-slate-900 p-4 rounded-3xl my-8
        max-w-7xl mx-auto">
             <h2 className="text-center font-bold text-2xl mb-4 text-yellow-600">Crypto Currency</h2>
             <table>
                 <thead className="font-bold border border-slate-500 bg-slate-500 rounded-xl text-white">
                     <tr>
                         <td className="p-3">Sign</td>
                         <td className="p-3">Name</td>
                         <td className="p-3">Change 24h</td>
                         <td className="p-3">Symbol</td>
                         <td className="p-3">Price</td>
                     </tr>
                 </thead>
                 <tbody className="border border-slate-500">
                     {currentPots.length > 0 ? currentPots.map((item) => {
                         return (
                             <tr key={item.id} className="border border-slate-500 hover:bg-slate-500 cursor-pointer hover:text-white " onClick={() => handleClick(item.slug)}>
                                 <td className="px-3 py-2">
                                     <img className="w-8 h-8" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} alt={item.name} />
                                 </td>
                                 <td className="px-3 py-2">{item.name}</td>
                                 <td className={`px-3 py-2 ${item.quote.USD.percent_change_24h > 0 ? 'text-green-600 ' : 'text-red-600 '}`} >{item.quote.USD.percent_change_24h.toFixed(2) + '%'}</td>
                                 <td className="px-3 py-2">{item.symbol} USD</td>
                                 <td className="px-3 py-2"> {item.quote.USD.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD'}
                                 </td>
 
                             </tr>
                         )
                     })
                         : <tr>Loading...</tr>
                     }
                 </tbody>
             </table>
             <Pagination postsPerPage={postsPerPage} totalPosts={curr.length} paginate={paginate} activePage={currentPage} />
         
        
           </div>
    )
}