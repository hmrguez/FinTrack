// screens/SignUp.js

import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native';
import AppButton from '@/components/AppButton';
import {
	COLORS,
	FONT_SIZES,
	FONT_WEIGHTS,
	SPACING,
	BORDER_RADIUS,
} from '@/constants/Constants';
import {router, useRouter} from "expo-router";

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Added state for confirm password
	const [confirmPassword, setConfirmPassword] = useState('');
	const router = useRouter();

	const handleSignUp = () => {
		// Handle sign-up logic here
		if (password === confirmPassword) {
			// Proceed with sign-up
		} else {
			// Show error: passwords do not match
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/images/lofi-illustration.webp')}
				style={styles.image}
			/>
			<Text style={styles.title}>Create Account</Text>
			<Text style={styles.subtitle}>Sign up to get started</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor={COLORS.subtext}
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor={COLORS.subtext}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoCapitalize="none"
					autoComplete="password-new"
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					placeholderTextColor={COLORS.subtext}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					autoCapitalize="none"
					autoComplete="password-new"
				/>
			</View>

			<AppButton title="Sign Up" onPress={handleSignUp} />

			<View style={styles.signInContainer}>
				<Text style={styles.signInText}>Already have an account?</Text>
				<TouchableOpacity onPress={() => router.push("/sign-in")}>
					<Text style={styles.signInLink}> Sign In</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background, // Pastel background color
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: SPACING.large,
	},
	image: {
		width: 150,
		height: 150,
		marginBottom: SPACING.large,
	},
	title: {
		fontSize: FONT_SIZES.largeTitle,
		color: COLORS.text, // Deep pastel color for text
		fontWeight: FONT_WEIGHTS.bold,
	},
	subtitle: {
		fontSize: FONT_SIZES.body,
		color: COLORS.subtext, // Soft pastel color for subtitle
		marginBottom: SPACING.large,
	},
	inputContainer: {
		width: '100%',
	},
	input: {
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.large,
		paddingHorizontal: SPACING.medium,
		paddingVertical: SPACING.small,
		fontSize: FONT_SIZES.body,
		color: COLORS.text,
		marginBottom: SPACING.small,
		shadowColor: '#000', // Shadow for depth
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 2, // For Android shadow
	},
	signInContainer: {
		flexDirection: 'row',
		marginTop: SPACING.medium,
	},
	signInText: {
		color: COLORS.subtext,
		fontSize: FONT_SIZES.caption,
	},
	signInLink: {
		color: COLORS.text,
		fontSize: FONT_SIZES.caption,
		fontWeight: FONT_WEIGHTS.bold,
	},
});