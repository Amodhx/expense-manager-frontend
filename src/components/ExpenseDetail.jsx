import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { expenseApi } from "../expenseApi.js";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function ExpenseDetail() {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        expenseApi
            .getOne(id)
            .then((data) => setExpense(data.data ?? data))
            .catch(() => setError("Expense not found."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="max-w-xl mx-auto p-4">
            <Link to="/" className="text-blue-600 hover:underline">&larr; Back to list</Link>
            <div className="bg-white rounded shadow p-6 mt-4">
                <h1 className="text-xl font-bold mb-4">{expense.description}</h1>
                <dl className="grid grid-cols-2 gap-y-2">
                    <dt className="text-gray-500">Date</dt>
                    <dd>{expense.date}</dd>
                    <dt className="text-gray-500">Cost</dt>
                    <dd>£{Number(expense.cost).toFixed(2)}</dd>
                    <dt className="text-gray-500">Type</dt>
                    <dd className="capitalize">{expense.expense_type}</dd>
                </dl>
            </div>
        </div>
    );
}
