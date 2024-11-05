import { useState } from "react"

export default function KronoPage() {


    const handleStart=()=>{
        console.log("bastı")
    }

    return (
        <div>
            <div className="flex justify-center gap-3 mb-8">
                <div className="flex flex-col gap-4 justify-center align-middle text-center ">
                    <p className="px-6 p-6  border bg-blue-400 rounded-xl text-2xl">00</p>
                    <p>Saat</p>
                </div>
                <div className="flex flex-col gap-4 justify-center align-middle text-center ">
                    <p className="px-6 p-6  border bg-blue-400 rounded-xl text-2xl">00</p>
                    <p>Dakika</p>
                </div>
                <div className="flex flex-col gap-4 justify-center align-middle text-center ">
                    <p className="px-6 p-6  border bg-blue-400 rounded-xl text-2xl">00</p>
                    <p>Saniye</p>
                </div>
                <div className="flex flex-col gap-4 justify-center align-middle text-center ">
                    <p className="px-6 p-6  border bg-blue-400 rounded-xl text-2xl">00</p>
                    <p>Salise</p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button className="px-6 py-2 border bg-slate-500 rounded-xl" onClick={()=>handleStart}>Başlat</button>
                <button className="px-6 py-2 border bg-slate-500 rounded-xl">Duraklat</button>
                <button className="px-6 py-2 border bg-slate-500 rounded-xl">Sıfırla</button>
            </div>
        </div>
    )
}