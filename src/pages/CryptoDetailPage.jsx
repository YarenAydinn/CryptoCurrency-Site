import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchCoinDetail, fetchCoinChart, fetchNewsId } from '@/services'
import { Line } from 'react-chartjs-2'
import { Swap } from "@/components"


const chartData = (coinChart) => {
    const lines = coinChart.map(item => {
        const date = new Date(item[0]);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    });
    const prices = coinChart.map(items => items[1])
    return {
        labels: lines,
        datasets: [
            {
                label: 'Price',
                data: prices,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: '#ca8a04'
            }
        ]
    }
}

export default function CryptoDetailPage() {

    const [isLoadding, setIsLoadding] = useState(true)
    const [coinDetail, setCoinDetail] = useState()
    const [coinChart, setCoinChart] = useState()
    const [news, SetNews] = useState([])
    const { id } = useParams()

    const fetchDetail = async (id) => {
        setIsLoadding(true)
        const [detailResponse, chartResponse] = await Promise.all([
            fetchCoinDetail(id),
            fetchCoinChart(id)
        ])
        setCoinDetail(detailResponse)
        setCoinChart(chartResponse)
        setIsLoadding(false)
        console.log(chartData);
    }

    const fetchNewsIdData = async (id) => {
        fetchNewsId(id).then(res => SetNews(res.result))
        console.log('news', news);
    }
    useEffect(() => {
        fetchNewsIdData(id)
    }, [id])

    useEffect(() => {
        fetchDetail(id)
    }, [id])

    return (
        <div className="mx-6 my-6">
            {/* <LineChartComponent/> */}
            {isLoadding ? (
                <p>Loading...</p>
            ) : (
                coinDetail && (
                    <div>
                        <div className="bg-slate-900 flex flex-col justify-center rounded-3xl my-8 h-48
                    max-w-7xl mx-auto text-center">
                            <div className="flex  p-6">
                                <img src={coinDetail.icon} alt={coinDetail.name} />
                                <h1 className="text-center text-2xl p-4 font-bold text-yellow-600">
                                    {coinDetail.name} Price
                                </h1>
                                <p className="text-slate-400 text-center p-5">{coinDetail.symbol}</p>
                            </div>
                            <div className="flex ml-7 gap-6">
                                <h1 className="font-bold text-2xl">{coinDetail.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                <h1 className={coinDetail.priceChange1h > 0 ? ' text-green-600 bg-green-500 w-12 rounded-full text-center p-1 bg-opacity-20' : 'text-red-600  bg-red-500 w-12 rounded-full text-center p-1 bg-opacity-20'}>
                                    {coinDetail.priceChange1h}
                                </h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl text-center p-4">{coinDetail.name} Chart</h1>
                            <div className="flex justify-center w-1/2 mx-auto">
                                <Line data={chartData(coinChart)} />
                                <Swap />
                            </div>
                        </div>
                    </div>

                )
            )}
            <div className=" flex flex-wrap mx-32 mt-12 p-10 gap-9 ">
                {
                    news.length > 0 ? news.splice(0,12).map((item) => {
                        return (
                            <div className="  bg-slate-800 w-96 h-auto" key={item.id}>
                                <a href={item.sourceLink} target="_blank" className=" text-white-600">
                                    <img src={item.imgUrl} alt="" className="flex item-center rounded-xl my-5 mx-10 pt-12 h-56" />
                                    <p className="p-4  line-clamp-2 text-wrap text-white text-center">{item.title}</p>
                                </a>
                            </div>
                        )
                    }) : "no response"
                }
            </div>
        </div>
    );

}