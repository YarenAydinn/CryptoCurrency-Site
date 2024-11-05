import { useState, useEffect } from "react"
import { fetchFiatList } from "@/services"

export default function HotFiat() {
    const [fiatList, setFiatList] = useState([])
    const fetchHotFiatList = async () => {
        const result = await fetchFiatList()
        setFiatList(result)
    }
    useEffect(() => {
        fetchHotFiatList()
    }, [])
    return (
        <div>

            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Sign</th>
                        <th>Name</th>
                        <th>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {fiatList.length > 0 ? fiatList.splice(0, 5).map((item) => {
                        return (
                            <tr key={item.id} className='h-12'>
                                <td><img className="w-8 h-8" src={"https://s2.coinmarketcap.com/static/img/coins/64x64/" + item.id + ".png"} /></td>
                                <td> {item.sign}</td>
                                <td> {item.name}</td>
                                <td> {item.symbol} USD</td>
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