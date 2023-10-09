import React from 'react';
import "../Dashboard/Dashboard.css";
import { useAppContext }  from '../../Components/Context/AppContext';

const Dashboard = () => {

    const { Income, Expenses, Transactions } = useAppContext()

return (
    <div className='Dashboard' >
        <section>
            <div>
                <h1>Total Income</h1>
                <h2>Kshs. {Income} </h2>
            </div>
            <div>
                <h1>Total Expense</h1>
                <h2>Kshs. {Expenses} </h2>
            </div>
            <div>
                <h1>Total Balance</h1>
                <h2>Kshs. {Income - Expenses}</h2>
            </div> 
        </section>
        <section className='History' >
            <h2>Recent Transaction History</h2>
            <article>
                {
                Transactions.map((Transaction) => {
                    return(
                    <li key={Transaction.id} >
                        <i id='Bill' class="fa-solid fa-money-bills"></i>
                        <div>
                            <section>
                                <h3>{Transaction.name}</h3> 
                            </section>
                            <section>
                                <p> <i class="fa-solid fa-coins"></i> Kshs. {Transaction.figure}</p>
                                <p> <i class="fa-solid fa-calendar-days"></i> Date: {Transaction.Date}</p>
                                <p id='Details'><i class="fa-solid fa-comment"></i> {Transaction.Details}</p>
                            </section>
                        </div>
                    </li>
                )})
                }
            </article>
        </section>
    </div>
)
}

export default Dashboard