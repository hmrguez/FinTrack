import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING} from '@/constants/Constants';
import {User} from '@/models/User';
import {getUser, signOut} from "@/services/auth.service";
import {useRouter} from "expo-router";
import AppButton from "@/components/AppButton";

export default function ProfileScreen() {
	const [user, setUser] = useState<User>();
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			setUser(await getUser());
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await signOut();
		router.replace("/sign-in");
	};

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>Loading Profile...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>

			<View style={styles.profileCard}>
				<Text style={styles.label}>Email</Text>
				<Text style={styles.value}>{user.email}</Text>

				<Text style={styles.label}>Balance</Text>
				<Text style={styles.value}>${user.balance.toFixed(2)}</Text>
			</View>

			<AppButton title="Logout" onPress={handleLogout}/>
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
	title: {
		fontSize: FONT_SIZES.title,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.text,
		marginBottom: SPACING.large,
	},
	profileCard: {
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.large,
		padding: SPACING.large,
		shadowColor: COLORS.text,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	label: {
		fontSize: FONT_SIZES.caption,
		fontWeight: FONT_WEIGHTS.medium,
		color: COLORS.subtext,
		marginTop: SPACING.medium,
	},
	value: {
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.regular,
		color: COLORS.text,
		marginBottom: SPACING.small,
	},
});