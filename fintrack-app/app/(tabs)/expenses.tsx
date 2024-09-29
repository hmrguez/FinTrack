// ExpensesScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, FONT_WEIGHTS, BORDER_RADIUS } from '@/constants/Constants';
import { ExpensesService } from '@/services/expenses.service';
import { User } from '@/models/User';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '@/components/AppButton';
import {Expense} from "@/models/Expense";
import {getUserId} from "@/services/auth.service";

export default function ExpensesScreen() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [userId, setUserId] = useState(-1);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState(-1);

	useEffect(() => {
		// Fetch user details
		const fetch = async () => {
			const fetchedUser = await getUserId();
			setUserId(fetchedUser);

			// Fetch expenses for the user
			fetchExpenses(fetchedUser.id);
		}

		fetch();
	}, []);

	const getUser = () => {
		// Mocked user data; replace with actual data fetching logic
		return new User(1, 'Jane Doe', 'jane.doe@example.com', 1250.50);
	};

	const fetchExpenses = (userId: number) => {
		setLoading(true);
		ExpensesService.getExpensesByUserId(userId)
			.then((data) => {
				setExpenses(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching expenses:', error);
				setLoading(false);
			});
	};

	const handleDeleteExpense = (id: number) => {
		setDeletingId(id);
		ExpensesService.deleteExpense(id)
			.then(() => {
				setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
				setDeletingId(-1);
			})
			.catch((error) => {
				console.error(`Error deleting expense with id ${id}:`, error);
				setDeletingId(-1);
			});
	};

	const handleAddExpense = () => {
		// Implement the logic to add a new expense
		// For now, we'll mock adding a new expense
		const newExpense = {
			id: Math.random(), // Replace with proper ID from the backend
			userId: userId,
			amount: 50.00,
			category: 'Other',
			description: 'New Expense',
			date: new Date(),
		};

		ExpensesService.createExpense(newExpense)
			.then((createdExpense) => {
				setExpenses((prevExpenses) => [...prevExpenses, createdExpense]);
			})
			.catch((error) => {
				console.error('Error creating expense:', error);
			});
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>Loading Expenses...</Text>
			</View>
		);
	}

	if (expenses.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.noExpensesText}>No expenses found.</Text>
				<AppButton title="Add Expense" onPress={handleAddExpense} style={styles.addButton} />
			</View>
		);
	}

	const renderExpenseItem = ({ item } : {item: Expense}) => (
		<View style={styles.expenseItem}>
			<View style={styles.expenseInfo}>
				<Text style={styles.expenseDescription}>{item.description}</Text>
				<Text style={styles.expenseDate}>{new Date(item.date).toLocaleDateString()}</Text>
			</View>
			<View style={styles.expenseActions}>
				<Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
				<TouchableOpacity
					onPress={() => handleDeleteExpense(item.id)}
					disabled={deletingId === item.id}
					style={styles.deleteButton}
				>
					{deletingId === item.id ? (
						<ActivityIndicator size="small" color={COLORS.error} />
					) : (
						<Icon name="close" size={24} color={COLORS.error} />
					)}
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Expenses</Text>
			<FlatList
				data={expenses}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderExpenseItem}
				contentContainerStyle={styles.listContent}
			/>
			<AppButton title="Add Expense" onPress={handleAddExpense} style={styles.addButton} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingHorizontal: SPACING.large,
		paddingTop: SPACING.large,
	},
	loadingText: {
		fontSize: FONT_SIZES.body,
		color: COLORS.subtext,
		textAlign: 'center',
		marginTop: SPACING.large,
	},
	noExpensesText: {
		fontSize: FONT_SIZES.body,
		color: COLORS.subtext,
		textAlign: 'center',
		marginTop: SPACING.large,
	},
	title: {
		fontSize: FONT_SIZES.title,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.text,
		marginBottom: SPACING.large,
	},
	listContent: {
		paddingBottom: SPACING.large,
	},
	expenseItem: {
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.medium,
		padding: SPACING.medium,
		marginBottom: SPACING.small,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: COLORS.text,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	expenseInfo: {
		flex: 1,
	},
	expenseDescription: {
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.medium,
		color: COLORS.text,
	},
	expenseDate: {
		fontSize: FONT_SIZES.caption,
		color: COLORS.subtext,
		marginTop: SPACING.tiny,
	},
	expenseActions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	expenseAmount: {
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.primary,
		marginRight: SPACING.small,
	},
	deleteButton: {
		padding: SPACING.tiny,
	},
	addButton: {
		marginTop: SPACING.large,
		alignSelf: 'center',
		width: '50%',
	},
});