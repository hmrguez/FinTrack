import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AppButton from "@/components/AppButton";
import {useRouter} from "expo-router";
import {signIn} from "@/services/auth.service";
import ToastService from "@/services/toast.service";

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleSignIn = async () => {

		try {
			await signIn(email, password);
			router.push("/expenses");
		} catch (error) {
			ToastService.show('Invalid credentials', 'error');
		}
	};

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/images/lofi-illustration.webp')} style={styles.image}/>
			<Text style={styles.title}>Welcome Back</Text>
			<Text style={styles.subtitle}>Sign in to continue</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#B0AECA"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor="#B0AECA"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoCapitalize="none"
					autoComplete="password"
				/>
			</View>

			<TouchableOpacity style={styles.forgotPassword}>
				<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
			</TouchableOpacity>

			<AppButton title={"Sign In"} onPress={handleSignIn}/>

			<View style={styles.signUpContainer}>
				<Text style={styles.signUpText}>Don't have an account?</Text>
				<TouchableOpacity onPress={() => router.push("/sign-up")}>
					<Text style={styles.signUpLink}> Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F0EBF8', // Pastel background color
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 30,
	},
	image: {
		width: 150,
		height: 150,
		marginBottom: 30,
	},
	title: {
		fontSize: 32,
		color: '#3E3A66', // Deep pastel color for text
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 16,
		color: '#7E7A9A', // Soft pastel color for subtitle
		marginBottom: 30,
	},
	inputContainer: {
		width: '100%',
	},
	input: {
		backgroundColor: '#FFFFFF',
		borderRadius: 25,
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontSize: 16,
		color: '#3E3A66',
		marginBottom: 15,
		shadowColor: '#000', // Shadow for depth
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 2, // For Android shadow
	},
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: 30,
	},
	forgotPasswordText: {
		color: '#7E7A9A',
		fontSize: 14,
	},
	button: {
		backgroundColor: '#A6E3E9', // Pastel button color
		paddingVertical: 15,
		paddingHorizontal: 80,
		borderRadius: 30,
		shadowColor: '#000', // Shadow for depth
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5, // For Android shadow
		marginBottom: 20,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
	},
	signUpContainer: {
		flexDirection: 'row',
	},
	signUpText: {
		color: '#7E7A9A',
		fontSize: 14,
	},
	signUpLink: {
		color: '#3E3A66',
		fontSize: 14,
		fontWeight: 'bold',
	},
});