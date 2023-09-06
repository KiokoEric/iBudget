import './App.css';
import { Routes, Route } from 'react-router-dom';
import { SideBar } from './Components/SideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Incomes from '../src/Pages/Incomes/Incomes';
import Expenses from './Pages/Expenses/Expenses';
import Loan_Calculator from './Pages/Loan_Calculator/Loan_Calculator';
import Invest from './Pages/Invest/Invest';


function App() {
  return (
    <div className="App">
      <section>
        <SideBar />
      </section>
      <section>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/Income' element={<Incomes />} />
          <Route path='/Expense' element={<Expenses />} />
          <Route path='/Loan_Calculator' element={<Loan_Calculator />} />
          <Route path='/Invest' element={<Invest />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
