import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import ExpenseList from "../ExpenseList";
import { expenseApi } from "../../api/expenseApi";

vi.mock("../../api/expenseApi");

describe("ExpenseList", () => {
    it("renders expenses returned from the API", async () => {
        expenseApi.getAll.mockResolvedValue({
            data: [{ id: 1, description: "Lunch", cost: 12.5, date: "2026-01-01", expense_type: "food" }],
        });
        render(<BrowserRouter><ExpenseList /></BrowserRouter>);
        expect(await screen.findByText("Lunch")).toBeInTheDocument();
    });

    it("shows an empty state when there are no expenses", async () => {
        expenseApi.getAll.mockResolvedValue({ data: [] });
        render(<BrowserRouter><ExpenseList /></BrowserRouter>);
        expect(await screen.findByText(/no expenses yet/i)).toBeInTheDocument();
    });
});
