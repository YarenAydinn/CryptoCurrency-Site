import { useState, useEffect } from "react";
import { fetchCoins } from "@/services";

export default function Swap() {
  const [coins, setCoins] = useState([]);
  const [dataSelected, setDataSelected] = useState();
  const [isSpendOpen, setIsSpendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [receivedNumber, setReceivedNumber] = useState(0)
  const [receivedCoin, setReceivedCoin] = useState()
  const [turnedValue,setTurendValue]=useState(0)

  
  const fetchCoinsSwap = async () => {
    const data = await fetchCoins();
    setCoins(data.result);
    console.log("coins", data.result);
  };
  
  useEffect(() => {
    fetchCoinsSwap();
  }, []);

  const toggleSpendDropdown = () => {
    setIsSpendOpen(!isSpendOpen);
  };
  const toggleReceiveDropdown = () => {
    setIsReceiveOpen(!isReceiveOpen);
  };

  const handleOptionClick = (coin) => {
    setSelectedCoin(coin.id);
    setDataSelected(coin.id);
    setIsSpendOpen(false);
  };
  const handleReceivedOptionClick=(coin)=>{
    setReceivedCoin(coin.id)
    setIsReceiveOpen(false)
  }
  
  
  useEffect(()=>{
    if(selectedCoin && receivedNumber){
      const selectedPrice=coins.find(coin=>coin.id===selectedCoin)?.price
      const receivedPrice=coins.find(coin=>coin.id===receivedCoin)?.price
      const turnValue=(receivedNumber*selectedPrice)/receivedPrice
      setTurendValue(turnValue.toLocaleString(undefined,{minimumFractionDigit:2,maximumFractionDigits:2}))
    }
    else{
      setTurendValue(0)
    }
  },[selectedCoin, receivedNumber, coins, receivedCoin])

  return (
    <div className="mx-12 px-6 py-8 border border-slate-800  rounded-xl flex h-auto justify-center flex-col" style={{width:'450px'}} >
      <div className="mt-9 flex justify-center gap-6">
        <input type="text" className="bg-slate-900 border border-slate-900 w-72 h-12 rounded-xl p-2" placeholder="Connnect to Wallet" />
        <button className="bg-yellow-600 border border-slate-900 w-24 h-12 rounded-xl">Connect</button>
      </div>
      <label htmlFor="cryptoSelect" className="m-3">Spend</label>
      <div className="text-center align-center ">
        <div className="flex flex-row">
          <button onClick={toggleSpendDropdown} className="border hover:border-yellow-600 hover:bg-slate-900 text-center text-yellow-600 bg-slate-900  border-slate-900 w-72 h-12 rounded-xl">
            {selectedCoin ? (
              <div className="flex items-center">
                <img src={coins.find(coin => coin.id === selectedCoin)?.icon} alt="" style={{ width: '25px' }} />
                <div>{coins.find(coin => coin.id === selectedCoin)?.name}</div>
              </div>
            ) : (
              <p className="w-72 flex justify-items-start p-3">Select a Crypto</p>
            )}
          </button>
          <input className="text-yellow-600 bg-slate-900 border border-slate-900 w-24 h-12 rounded-xl p-2 mx-3" value={receivedNumber} onChange={(e) => setReceivedNumber(e.target.value)} placeholder="0" />
        </div>

        {isSpendOpen && (
          <ul className="text-yellow-600 bg-slate-900 border max-h-40 overflow-y-auto rounded-xl border-slate-900 shadow-lg w-72 z-10">
            {coins.length > 0 ? (
              coins.map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleOptionClick(coin)}
                  className="flex items-center p-2 hover:border-yellow-600 cursor-pointer"
                >
                  <img src={coin.icon} alt={coin.name} style={{ width: '25px' }} />
                  <div className="ml-2">{coin.name}</div>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Loading coins...</li>
            )}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="cryptoReceive" className="m-3">Receive</label>
        <div className="text-center align-center ">
          <div className="flex flex-row  hover:border-yellow-600">
            <button onClick={toggleReceiveDropdown} className="text-yellow-600 bg-slate-900 border border-slate-900 w-72 h-12 rounded-xl hover:border-yellow-600 hover:bg-slate-900">
              {receivedCoin ? (
                <div className="flex items-center">
                  <img src={coins.find(coin => coin.id === receivedCoin)?.icon} alt="" style={{ width: '25px' }} />
                  <div>{coins.find(coin => coin.id === receivedCoin)?.name}</div>
                </div>
              ) : (
                <p className="w-72 flex justify-items-start p-3">Received a Crypto</p>
              )}
            </button>
            <input
             className="text-yellow-600 bg-slate-900 border border-slate-900 w-24 h-12 rounded-xl p-2 mx-3"
             value={turnedValue}
             readOnly
             placeholder="0" />
          </div>
          {isReceiveOpen && (
            <ul className="text-yellow-600 bg-slate-900 border max-h-40 overflow-y-auto rounded-xl border-slate-900 shadow-lg w-72 z-10">
              {
                coins.length > 0 ? (
                  coins.map((coin) => (
                    <li
                      key={coin.id}
                      onClick={() => handleReceivedOptionClick(coin)}
                      className="flex items-center p-2 hover:border-yellow-600 cursor-pointer"
                    >
                      <img src={coin.icon} alt={coin.name} style={{ width: '25px' }} />
                      <div className="ml-2">{coin.name}</div>
                    </li>
                  ))
                ):(
                  <li className="p-2 text-gray-500">Loading coins...</li>
                )
            }
            </ul>
          )
          }
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4">
      <button className="bg-yellow-600 border border-slate-900 w-24 h-12 rounded-xl">BUY</button>
      <button className="bg-yellow-600 border border-slate-900 w-24 h-12 rounded-xl">SELL</button>
      </div>
    </div>

  );
}
