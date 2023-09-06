import React, { useState } from 'react';
import "../Invest/Invest.css"

const Invest = () => {

    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")
    const[Stocks, setStock] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const getStock = async (e)=> {
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly input a Stock name.")
        } else {
            const url = `https://real-time-finance-data.p.rapidapi.com/search?query=${Search}&language=en`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setSearchError("")
                setStock(result.data.stock)
            } catch (error) {
                console.error(error);
            }
        }
    }

return (
    <div className='Invest' >
        <section>
            <h1>Search your favourite stock</h1>
            <form onSubmit={getStock}>
                <input type="text" name="" id="" placeholder='Enter your favourite stock...' value={Search} onChange={handleSearch} />
                <button onClick={getStock} type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <span>{SearchError}</span>
        </section>
        <section>
            <table>
                <thead>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Previous_Close</th>
                    <th>Exchange_Open</th>
                    <th>Exchange_Close</th>
                </thead>
            {
            Stocks.map((Stock, Index) => {
                return(
                    <tbody key={Index} >
                        <td>{Stock.symbol}</td>
                        <td>{Stock.name}</td>
                        <td>{Stock.price.toFixed(2)}</td>
                        <td>{Stock.previous_close.toFixed(2)}</td>
                        <td>{Stock.exchange_open}</td>
                        <td>{Stock.exchange_close}</td>
                    </tbody>
                )
            })
            }
            </table>
        </section>
        
    </div>
)
}

export default Invest