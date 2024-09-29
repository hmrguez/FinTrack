import {getToken} from "@/services/auth.service";
import {Expense} from "@/models/Expense";


const API_BASE_URL = 'http://localhost:9001';

export const ExpensesService = {
	getAllExpenses: async () => {
		try {
			const token = await getToken();
			const response = await fetch(`${API_BASE_URL}/api/expenses`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const expenses = await response.json();
			return expenses;
		} catch (error) {
			console.error('Error fetching all expenses:', error);
			throw error;
		}
	},

	getExpensesByUserId: async (userId: number) => {
		try {
			const token = await getToken();
			const response = await fetch(`${API_BASE_URL}/api/expenses/user/${userId}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const expenses = await response.json();
			return expenses;
		} catch (error) {
			console.error(`Error fetching expenses for user ${userId}:`, error);
			throw error;
		}
	},

	createExpense: async (expense: Expense) => {
		try {
			const token = await getToken();
			const response = await fetch(`${API_BASE_URL}/api/expenses`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify(expense),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const newExpense = await response.json();
			return newExpense;
		} catch (error) {
			console.error('Error creating expense:', error);
			throw error;
		}
	},

	deleteExpense: async (id: number) => {
		try {
			const token = await getToken();
			const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return;
		} catch (error) {
			console.error(`Error deleting expense with id ${id}:`, error);
			throw error;
		}
	},
};