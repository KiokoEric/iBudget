import React from 'react';
import "../SideBar/SideBar.css";
import { RiStockFill } from "react-icons/ri"
import { Link } from "react-router-dom";

export const SideBar = () => {
return (
    <article className='SideBar' >   
        <div>
            <h1>iBudget</h1>
        </div>
        <div>
            <Link to="/" className='Link' >
                <i class="fa-solid fa-chart-line"></i>
                Dashboard
            </Link>
            <Link to="/Income" className='Link' >
                <i class="fa-solid fa-money-bill-trend-up"></i>
                Incomes
            </Link>
            <Link to="/Expense" className='Link' >
                <i class="fa-solid fa-money-bill-transfer"></i>
                Expenses
            </Link>
            <Link to="/Loan_Calculator" className='Link' >
                <i class="fa-solid fa-building-columns"></i>
                Loan Calculator
            </Link>
            <Link to="/Invest" className='Link' >
                < RiStockFill className='ReactIcon' />
                Invest
            </Link>
        </div>
    </article>
)
}
