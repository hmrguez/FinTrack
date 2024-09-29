// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, FONT_WEIGHTS } from '@/constants/Constants';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			{/* Add your profile content here */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: SPACING.medium,
	},
	title: {
		fontSize: FONT_SIZES.title,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.text,
		marginBottom: SPACING.medium,
	},
});