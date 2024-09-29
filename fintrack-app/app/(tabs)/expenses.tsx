// ExpensesScreen.js

import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING} from '@/constants/Constants';
import {ExpensesService} from '@/services/expenses.service';
import {User} from '@/models/User';
import {getUserId} from "@/services/auth.service";
import {Expense} from "@/models/Expense";

export default function ExpensesScreen() {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch user details
		const fetch = async () => {
			const fetchedUser = await getUserId();

			// Fetch expenses for the user
			ExpensesService.getExpensesByUserId(parseInt(fetchedUser))
				.then((data) => {
					setExpenses(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching expenses:', error);
					setLoading(false);
				});
		}

		fetch()

	}, []);

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
			</View>
		);
	}

	const renderExpenseItem = ({item} : {item: Expense}) => (
		<View style={styles.expenseItem}>
			<View style={styles.expenseInfo}>
				<Text style={styles.expenseDescription}>{item.description}</Text>
				<Text style={styles.expenseDate}>{new Date(item.date).toLocaleDateString()}</Text>
			</View>
			<Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: SPACING.large,
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
		shadowOffset: {width: 0, height: 2},
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
	expenseAmount: {
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.primary,
		marginLeft: SPACING.medium,
	},
});