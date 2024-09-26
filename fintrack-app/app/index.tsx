import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Link} from "expo-router";

const LandingPage = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>FinanceBuddy</Text>
				<Text style={styles.subtitle}>Manage your finances effortlessly</Text>
			</View>
			<Image source={require('../assets/images/lofi-illustration.webp')} style={styles.image} />
			<Link href="/sign-in" style={styles.button}>
				<Text style={styles.buttonText}>Get Started</Text>
			</Link>
		</View>
	);
};

export default LandingPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F0EBF8', // Pastel background color
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		marginBottom: 30,
		alignItems: 'center',
	},
	title: {
		fontSize: 36,
		color: '#3E3A66', // Deep pastel color for text
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 18,
		color: '#7E7A9A', // Soft pastel color for subtitle
		marginTop: 10,
	},
	image: {
		width: 250,
		height: 250,
		marginBottom: 40,
	},
	button: {
		backgroundColor: '#A6E3E9', // Pastel button color
		paddingVertical: 15,
		paddingHorizontal: 60,
		borderRadius: 30,
		shadowColor: '#000', // Shadow for depth
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5, // For Android shadow
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
	},
});