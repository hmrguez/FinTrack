// components/AppButton.js

import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING,} from '../constants/Constants';

interface AppButtonProps {
	title: string;
	onPress: () => void;
	loading?: boolean;
	disabled?: boolean;
	style?: object;
	textStyle?: object;
}

const AppButton: React.FC<AppButtonProps> = ({
												 title,
												 onPress,
												 loading = false,
												 disabled = false,
												 style,
												 textStyle,
											 }) => (
	<TouchableOpacity
		style={[
			styles.button,
			disabled && styles.disabledButton,
			style,
		]}
		onPress={onPress}
		activeOpacity={0.7}
		disabled={disabled || loading}
	>
		{loading ? (
			<ActivityIndicator size="small" color={COLORS.surface}/>
		) : (
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		)}
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.primary,
		paddingVertical: SPACING.small,
		paddingHorizontal: SPACING.large,
		borderRadius: BORDER_RADIUS.medium,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: SPACING.small,
	},
	disabledButton: {
		backgroundColor: COLORS.subtext,
	},
	buttonText: {
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.medium,
		color: COLORS.surface,
	},
});

export default AppButton;