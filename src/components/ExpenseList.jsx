import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { expenseApi } from "../expenseApi.js";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        expenseApi
            .getAll()
            .then((data) => {
                const result = data.data ?? data;

                if (Array.isArray(result)) {
                    setExpenses(result);
                } else {
                    setExpenses([]);
                }
            })
            .catch(() => {
                setExpenses(null)
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Expenses</h1>
                <Link
                    to="/expenses/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Expense
                </Link>
            </div>

            <ErrorMessage message={error} />

            {expenses.length === 0 && !error && (
                <p className="text-gray-500">No expenses yet — add your first one.</p>
            )}

            <ul className="divide-y divide-gray-200 bg-white rounded shadow">
                {expenses.map((e) => (
                    <li key={e.id}>
                        <Link
                            to={`/expenses/${e.id}`}
                            className="flex justify-between p-4 hover:bg-gray-50"
                            aria-label={`View details for ${e.description}, cost ${e.cost}`}
                        >
                            <div>
                                <p className="font-medium">{e.description}</p>
                                <p className="text-sm text-gray-500">
                                    {e.date} · <span className="capitalize">{e.expense_type}</span>
                                </p>
                            </div>
                            <span className="font-semibold">£{Number(e.cost).toFixed(2)}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
