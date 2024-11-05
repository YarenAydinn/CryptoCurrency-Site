
import { SearchBar,CryptoCurrencyList,Pagination } from '@/components'

export default function CryptoListPage() {
    

    const paginate = pageNumbers => setCurrentPage(pageNumbers)

    return (
        <div className="flex flex-col m-auto p-4 justify-center mb-24">
            <SearchBar/>
            <CryptoCurrencyList/>
      </div>
    )
}