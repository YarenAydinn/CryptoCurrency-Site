import { useState, useEffect } from 'react'
import { fetchListingLatest } from "@/services"
import { useNavigate } from 'react-router-dom'

export default function HotCryptos() {
    const navigate = useNavigate()
    const [crps, setCrps] = useState([])
    const sendApiReq = async () => {
        fetchListingLatest().then(response => {
            setCrps(response)
        })
    }
    useEffect(() => {
        sendApiReq()
    }, [])
    const handleClick = (id) => navigate("/cryptodetailpage/" + id)
    return (
        <div className='w-full px-2 h-80 flex flex-col justify-center content-center text-center text-white'>
            <table className=''>
                <thead >
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody className='mx-24'>
                    {crps.length > 0 ? crps.splice(0, 5).map((item) => {
                        return (
                            <tr key={item.id} className='h-12 cursor-pointer hover:bg-slate-500 hover:text-white' onClick={() => handleClick(item.slug)}> 
                                <td><img className="w-8 h-8" src={"https://s2.coinmarketcap.com/static/img/coins/64x64/" + item.id + ".png"} /></td>
                                <td> {item.name}</td>
                                <td> {item.symbol}</td>
                                <td> {item.quote.USD.price.toFixed(2)} USD</td>
                            </tr>
                        )

                    })
                        : <tr><td colSpan={4}>Loading...</td></tr>
                    }
                </tbody>
            </table>

        </div>
    )
}