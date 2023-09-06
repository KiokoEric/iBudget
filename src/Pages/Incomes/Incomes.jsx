import React, { useEffect, useState } from 'react';
import "../Incomes/Incomes.css";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext }  from '../../Components/Context/AppContext';

const Incomes = () => {

    const { AddIncomes, AddTransaction } = useAppContext()

    const IncomeState = () => {
        let Record = localStorage.getItem("Records");

        if (Record) {
            return JSON.parse(localStorage.getItem("Records"))
        } else {
            return [];
        }
    }

    // UseState

    const [Transactions, setTransactions] = useState(IncomeState())
    const [Income, setIncome] = useState("")
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

    const AddIncome = (e) => {
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
                ...Transactions, { id: uuidv4(), name: Description, figure: Amount, Details: Memo, Date: Date }
            ])
            AddTransaction([
                ...Transactions, { id: uuidv4(), name: Description, figure: Amount, Details: Memo, Date: Date }
            ])
        }
    } 

    // Calculation of Total Expense

    const CalculateIncome = () => {
        let TotalIncome = 0;
        Transactions.forEach((Transaction) => {
            TotalIncome += parseInt(Transaction.figure);
        });
        return TotalIncome;
    };

    // Delete Income Transaction

    const handleDelete= (id) => {
        const deleteTransactions = Transactions.filter((Transaction) => Transaction.id !== id);
        setTransactions(deleteTransactions);
    }

    // Use Effect

    useEffect(() => {
        localStorage.setItem("Records", JSON.stringify(Transactions))
    },[Transactions]);

    useEffect(()=> {
        const TotalIncome = CalculateIncome();
        setIncome(TotalIncome);
        AddIncomes(TotalIncome)
    },[Transactions])

return (
    <article className='Income' >
        <section>
            <h1>Incomes</h1>
            <div>
                <h3>Total Income: {Income}</h3>
            </div>
        </section>
        <section>
            <form onSubmit={AddIncome}>
                <p>
                    <input type='text' placeholder='Income/Revenue Description' value={Description} onChange={DescriptionChange} required />
                    <span>{DescriptionError}</span>
                </p>
                <p>
                    <input type="number" placeholder='Income/Revenue Amount' value={Amount} onChange={AmountChange} required />
                    <span>{AmountError}</span>
                </p>
                <p>
                    <input type="date" placeholder='Enter the Date' value={Date} onChange={DateChange} />
                    <span>{DateError}</span>
                </p>
                <textarea type="text" name="" id="" cols="30" rows="5" placeholder='Add a Memo' value={Memo} onChange={MemoChange} ></textarea>
                <button onClick={AddIncome} type="submit">Add Income/Revenue</button>
            </form>
            <div className='IncomeHistory' >
            {
            Transactions.map((Transaction) => (
            <li key={Transaction.id} >
                <div>
                    <section>
                        <p>{Transaction.name}</p> 
                    </section>
                    <section>
                        <p>Kshs. {Transaction.figure}</p>
                        <p>Date: {Transaction.Date}</p>
                        <p id='Memo'>{Transaction.Details}</p>
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

export default Incomes