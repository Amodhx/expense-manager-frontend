import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import ExpenseDetail from "./components/ExpenseDetail";
import ExpenseForm from "./components/ExpenseForm";

export default function App() {
    return (
        <BrowserRouter>
            <nav className="bg-white border-b shadow-sm p-4" aria-label="Main navigation">
                <a href="/" className="font-bold text-lg">Expense Manager</a>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<ExpenseList />} />
                    <Route path="/expenses/new" element={<ExpenseForm />} />
                    <Route path="/expenses/:id" element={<ExpenseDetail />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
