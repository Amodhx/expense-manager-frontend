import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { expenseApi } from "../api/expenseApi";
import ErrorMessage from "./ErrorMessage";

const TYPES = ["travel", "food", "other"];

export default function ExpenseForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ date: "", cost: "", description: "", expense_type: "travel" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        const errs = {};
        if (!form.date) errs.date = "Date is required.";
        if (!form.cost || Number(form.cost) <= 0) errs.cost = "Cost must be a positive number.";
        if (!form.description.trim()) errs.description = "Description is required.";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setSubmitting(true);
        try {
            const created = await expenseApi.create(form);
            const id = (created.data ?? created).id;
            navigate(`/expenses/${id}`);
        } catch (err) {
            setErrors({ form: "Could not save expense. Check the fields and try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Add Expense</h1>
            <ErrorMessage message={errors.form} />
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4" noValidate>
                <div>
                    <label htmlFor="date" className="block font-medium mb-1">Date</label>
                    <input
                        id="date" name="date" type="date" value={form.date} onChange={handleChange}
                        className="w-full border rounded p-2" aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "date-error" : undefined}
                    />
                    {errors.date && <p id="date-error" className="text-red-600 text-sm">{errors.date}</p>}
                </div>

                <div>
                    <label htmlFor="cost" className="block font-medium mb-1">Cost (£)</label>
                    <input
                        id="cost" name="cost" type="number" step="0.01" value={form.cost} onChange={handleChange}
                        className="w-full border rounded p-2" aria-invalid={!!errors.cost}
                        aria-describedby={errors.cost ? "cost-error" : undefined}
                    />
                    {errors.cost && <p id="cost-error" className="text-red-600 text-sm">{errors.cost}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <input
                        id="description" name="description" type="text" value={form.description} onChange={handleChange}
                        className="w-full border rounded p-2" aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? "desc-error" : undefined}
                    />
                    {errors.description && <p id="desc-error" className="text-red-600 text-sm">{errors.description}</p>}
                </div>

                <div>
                    <label htmlFor="expense_type" className="block font-medium mb-1">Type</label>
                    <select
                        id="expense_type" name="expense_type" value={form.expense_type} onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <button
                    type="submit" disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? "Saving…" : "Save Expense"}
                </button>
            </form>
        </div>
    );
}
