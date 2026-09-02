import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ExpenseForm from "../ExpenseForm";
import { describe, it, expect } from "vitest";

function renderForm() {
    render(<BrowserRouter><ExpenseForm /></BrowserRouter>);
}

describe("ExpenseForm", () => {
    it("shows validation errors when submitted empty", () => {
        renderForm();
        fireEvent.click(screen.getByRole("button", { name: /save expense/i }));
        expect(screen.getByText(/date is required/i)).toBeInTheDocument();
        expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });

    it("lets the user type a description", () => {
        renderForm();
        const input = screen.getByLabelText(/description/i);
        fireEvent.change(input, { target: { value: "Train ticket" } });
        expect(input.value).toBe("Train ticket");
    });
});
