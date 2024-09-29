// components/Toast.js

import React, { useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ToastService from '@/services/toast.service';
import {
	COLORS,
	FONT_SIZES,
	FONT_WEIGHTS,
	SPACING,
	BORDER_RADIUS,
} from '@/constants/Constants';

const Toast = () => {
	const [toast, setToast] = useState<{message: string, type: string, duration: number} | null>(null);
	const [translateY] = useState(new Animated.Value(-100));

	useEffect(() => {
		// @ts-ignore
		const showListener = ({ message, type, duration }) => {
			setToast({ message, type, duration });
			Animated.timing(translateY, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();

			setTimeout(() => {
				Animated.timing(translateY, {
					toValue: -100,
					duration: 300,
					useNativeDriver: true,
				}).start(() => setToast(null));
			}, duration);
		};

		ToastService.on('showToast', showListener);

		return () => {
			ToastService.off('showToast', showListener);
		};
	}, [translateY]);

	if (!toast) return null;

	return (
		<Animated.View
			style={[
				styles.toastContainer,
				{ transform: [{ translateY }] },
				toast.type === 'success' && styles.success,
				toast.type === 'error' && styles.error,
				toast.type === 'warning' && styles.warning,
			]}
		>
			<Text style={styles.toastText}>{toast.message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		top: SPACING.medium,
		left: SPACING.medium,
		right: SPACING.medium,
		paddingVertical: SPACING.small,
		paddingHorizontal: SPACING.medium,
		backgroundColor: COLORS.text,
		borderRadius: BORDER_RADIUS.medium,
		zIndex: 1000,
	},
	toastText: {
		color: COLORS.surface,
		fontSize: FONT_SIZES.body,
		fontWeight: FONT_WEIGHTS.medium,
		textAlign: 'center',
	},
	success: {
		backgroundColor: COLORS.success,
	},
	error: {
		backgroundColor: COLORS.error,
	},
	warning: {
		backgroundColor: COLORS.warning,
	},
});

export default Toast;