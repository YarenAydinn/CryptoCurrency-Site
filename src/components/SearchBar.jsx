import { useState, useEffect } from "react";
import { fetchSearchCoins } from '@/services';
import { useDebounce } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import '@/css/style.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchHN = async () => {
      let results = [];
      if (debouncedSearchTerm) {
        const data = await fetchSearchCoins(debouncedSearchTerm);
        results = data || [];
      }
      setResults(results);
    };

    searchHN();
  }, [debouncedSearchTerm]);

  const handleClick = (id) => navigate("/cryptodetailpage/" + id)
  return (
    <div className="grid justify-center mt-12">
      <input
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={handleChange}
        className="searchBar"
      />
      <div className="text-center">
        {/* Coin List */}
        <table className={'mb-48 justify-center searchResult '+(results.length > 0 ?'':'hide')}>
          <thead></thead>
          <tbody>
            {
              results.length > 0 ? results.map((coin) => (
                <tr key={coin.id} className="text-center border-y border-slate-300 hover:bg-slate-500 hover:text-white" onClick={()=>handleClick(coin.id)}>
                  <td className="px-4"><img style={{ width: '40px', height: '40px' }} src={coin.icon} alt={coin.name} /></td>
                  <td className="px-4">{coin.name}</td>
                  <td className="px-4">{coin.symbol}</td>
                  <td className="px-4">{coin.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                </tr>
              )) : ("")
            }
          </tbody>
        </table>

      </div>
    </div>
  );
}
