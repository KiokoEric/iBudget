import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../Expenses/Expenses.css";
import { useAppContext }  from '../../Components/Context/AppContext';

const Expenses = () => {

    const { AddExpenses, AddTransaction } = useAppContext()

    const ExpenseState = () => {
        let list = localStorage.getItem("lists");

        if (list) {
            return JSON.parse(localStorage.getItem("lists"))
        } else {
            return [];
        }
    }

    const [Transactions, setTransactions] = useState(ExpenseState())
    const [Expenses,  setExpenses] = useState("")
    const [Description, setDescription] = useState("")
    const [Amount, setAmount] = useState("")
    const [Memo, setMemo] = useState("")
    const [Date, setDate] = useState("")
    const [DescriptionError, setDescriptionError] = useState("")
    const [AmountError, setAmountError] = useState("")
    const [DateError, setDateError] = useState("")

    // HandleChanges : OnChange

    const DescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const AmountChange = (e) => {
        setAmount(e.target.value)
    }

    const MemoChange = (e) => {
        setMemo(e.target.value)
    }

    const DateChange = (e) => {
        setDate(e.target.value)
    }


    // Transaction Array

    const AddExpense = (e) => {
        e.preventDefault()

        if (Description === "") {
            setDescriptionError("Description is required")
        } else if(Amount === ""  ) {
            setAmountError("Amount is required")
        } else if (Date === "") {
            setDateError("Date is required")
        } else {
            setDescription("")
            setDescriptionError("")
            setAmount("")
            setAmountError("")
            setMemo("")
            setDate("")
            setDateError("")
            setTransactions([
                ...Transactions, { id: uuidv4() , name: Description, figure: Amount, Details: Memo, Date: Date }
            ])
            AddTransaction([
                ...Transactions, { id: uuidv4() , name: Description, figure: Amount, Details: Memo, Date: Date }
            ])
        }
    }

    // Calculation of Total Expense

    const CalculateExpense = () => {
        let TotalExpense = 0;
        Transactions.forEach((Transaction) => {
            TotalExpense += parseInt(Transaction.figure);
        });
        return TotalExpense;
    };

    // Delete Expense Transaction

    const handleDelete= (id) => {
        const deleteTransactions = Transactions.filter((Transaction) => Transaction.id !== id);
        setTransactions(deleteTransactions);
    }

    // USE EFFECT

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(Transactions))
    },[Transactions]);

    useEffect(()=> {
        const TotalExpense = CalculateExpense();
        setExpenses(TotalExpense);
        AddExpenses(TotalExpense)
    },[Transactions])

return (
    <article className='Expense' >
        <section>
            <h1>Expenses</h1>
            <div>
                <h3>Total Expense: <span>Kshs.{parseInt(Expenses)}</span></h3>
            </div>
        </section>
        <section>
            <form onSubmit={AddExpense}>
                <p>
                    <input type='text' placeholder='Expense Description' value={Description} onChange={DescriptionChange} required />
                    <span>{DescriptionError}</span>
                </p>
                <p>
                    <input type='number' placeholder='Expense Amount' value={Amount} onChange={AmountChange} required />
                    <span>{AmountError}</span>
                </p>
                <p>
                    <input type="date" placeholder='Enter the Date' value={Date} onChange={DateChange}  name="" id="" />
                    <span>{DateError}</span>
                </p>
                <textarea type="text" name="" id="" cols="30" rows="5" placeholder='Add a Memo' value={Memo} onChange={MemoChange} ></textarea>
                <button onClick={AddExpense} type="submit">Add Expense</button>
            </form>
            <div className='ExpenseHistory' >
            {
                Transactions.map((Transaction) => (
                <li key={Transaction.id} >
                    <i id='Icon' class="fa-solid fa-money-bill-transfer"></i>
                    <div>
                        <section>
                            <h3>{Transaction.name}</h3> 
                        </section>
                        <section>
                            <p> <i class="fa-solid fa-coins"></i> Kshs. {Transaction.figure}</p>
                            <p> <i class="fa-solid fa-calendar-days"></i> Date: {Transaction.Date}</p>
                            <p id='Memo' > <i class="fa-solid fa-comment"></i> {Transaction.Details}</p>
                        </section>
                    </div>
                    <i onClick={() => handleDelete(Transaction.id)} id='Delete' class="fa-solid fa-trash"></i>
                </li>
                ))
            }
            </div>
        </section>
    </article> 
)
}

export default Expenses