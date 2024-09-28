import {Stack, Tabs} from 'expo-router';
import React from 'react';

import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

export default function AuthLayout() {

	return (
		<>
			<Stack>
				{/*<Text>Auth Layout</Text>*/}
				<Stack.Screen name="sign-in" options={{title: 'Sign In', headerShown: false}}/>
				<Stack.Screen name="sign-up" options={{title: 'Sign Up', headerShown: false}}/>
			</Stack>
		</>
	);
}
