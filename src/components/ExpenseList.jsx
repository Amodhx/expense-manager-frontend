import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { expenseApi } from "../expenseApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const TYPES = ["travel", "food", "other"];

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        expenseApi
            .getAll(filterType || undefined)
            .then((data) => setExpenses(data.data ?? data))
            .catch(() => setError("Could not load expenses. Is the backend running?"))
            .finally(() => setLoading(false));
    }, [filterType]);

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

            <div className="mb-4">
                <label htmlFor="type-filter" className="block text-sm font-medium mb-1">
                    Filter by type
                </label>
                <select
                    id="type-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">All types</option>
                    {TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <ErrorMessage message={error} />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {expenses.length === 0 && !error && (
                        <p className="text-gray-500">
                            {filterType ? `No ${filterType} expenses yet.` : "No expenses yet — add your first one."}
                        </p>
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
                                            {e.date} ·{" "}
                                            <span className="capitalize">{e.expense_type}</span>
                                        </p>
                                    </div>

                                    <span className="font-semibold">
                LKR {Number(e.cost).toFixed(2)}
            </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
