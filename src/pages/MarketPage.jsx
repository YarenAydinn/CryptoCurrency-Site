import { useState, useEffect } from "react"
import { fetchCoinsPage } from "@/services";
import { SearchBar } from '@/components'
import { useNavigate } from "react-router-dom";
function MarketPage() {
    
    const [coinList, setCoinList] = useState([])
    const [page, setPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()

    const fetchcoinList = async () => {
        const { page, result } = await fetchCoinsPage(currentPage)
        setCoinList((current) => [...current, ...result])
        console.log(result);
        setPage(page)
    }
    useEffect(() => {
        fetchcoinList()
    }, [currentPage])

    useEffect(() => {
        const handleScroll = () => {
            console.log('offsetHeight', document.documentElement.offsetHeight);
            console.log('innerHeight', window.innerHeight);
            console.log('scrollTop', document.documentElement.scrollTop);
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setCurrentPage((page) => page + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (id) => navigate("/cryptodetailpage/" + id)
    return (
        <div>
            <SearchBar />
            <div className="grid bg-slate-900 p-7 rounded-3xl my-9
                max-w-7xl mx-auto text-center w-2.5/3">
                <table>
                    <thead className="font-bold border border-slate-500 bg-slate-500 rounded-xl text-white">
                        <tr>
                            <td className="p-3">Icon</td>
                            <td className="p-3">Name</td>
                            <td className="p-3">Change</td>
                            <td className="p-3">Symbol</td>
                            <td className="p-3">Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coinList.length > 0 ? (coinList.map((coin) => {

                                return (
                                    <tr key={coin.id} className="border border-slate-500 hover:bg-slate-500 hover:text-white" onClick={()=>handleClick(coin.id)}>
                                        <td className="flex justify-center p-3"><img src={coin.icon} alt={coin.name} style={{ width: '40px' }} /></td>
                                        <td>{coin.name}</td>
                                        <td className={`${coin.priceChange1d > 0 ? 'text-green-600 ' : 'text-red-600 '}`}>{coin.priceChange1d.toFixed(2) + '%'}</td>
                                        <td>{coin.symbol}</td>
                                        <td>$ {coin.price.toLocaleString(undefined,{minimumFractionDigit:2,maximumFractionDigits:2})}</td>
                                    </tr>
                                )
                            })) : ''
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default MarketPage;