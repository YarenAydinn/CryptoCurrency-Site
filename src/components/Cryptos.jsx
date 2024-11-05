import { useState, useEffect } from 'react'
import { fetchListingLatest } from "@/services"

export default function HotCryptos() {
    const [crps, setCrps] = useState([])
    const sendApiReq = async () => {
        const response = await fetchListingLatest()
        setCrps(response)
    }
    useEffect(() => {
        sendApiReq()
    }, [])
    return (
        <div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {crps.length > 0 ? crps.map((item) => {
                    return (
                        <tbody>
                            <tr key={item.id} className='h-12'>
                                <td><img className="w-8 h-8" src={"https://s2.coinmarketcap.com/static/img/coins/64x64/" + item.id + ".png"} /></td>
                                <td> {item.name}</td>
                                <td> {item.symbol}</td>
                                <td> {item.quote.USD.price} USD</td>
                            </tr>
                        </tbody>
                    )
                })
                    : <tr><td colSpan={4}>Loading...</td></tr>
                }

            </table>
        </div>
    )
}