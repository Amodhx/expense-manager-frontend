import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
});

export const expenseApi = {
    getAll: (type) =>
        client.get("/expenses", { params: type ? { type } : {} }).then((res) => res.data),
    getOne: (id) => client.get(`/expenses/${id}`).then((res) => res.data),
    create: (payload) => client.post("/expenses", payload).then((res) => res.data),
};

export default client;
