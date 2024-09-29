import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ExpensesScreen from './expenses';
import ProfileScreen from './profile';

import {BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING} from '@/constants/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
	return (
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarIcon: ({color, size}) => {
					let iconName;

					if (route.name === 'Expenses') {
						iconName = 'attach-money';
					} else if (route.name === 'Profile') {
						iconName = 'person';
					}

					return <Icon name={iconName} size={size} color={color}/>;
				},
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.subtext,
				tabBarStyle: {
					position: 'absolute',
					bottom: SPACING.small,
					left: SPACING.small,
					right: SPACING.small,
					backgroundColor: COLORS.surface,
					borderRadius: BORDER_RADIUS.large,
					height: 60,
					shadowColor: COLORS.text,
					shadowOffset: {width: 0, height: 2},
					shadowOpacity: 0.1,
					shadowRadius: 8,
					elevation: 5,
				},
				tabBarLabelStyle: {
					fontSize: FONT_SIZES.caption,
					fontWeight: FONT_WEIGHTS.medium,
				},
				headerShown: false,
			})}
		>
			<Tab.Screen name="Expenses" component={ExpensesScreen}/>
			<Tab.Screen name="Profile" component={ProfileScreen}/>
		</Tab.Navigator>
	);
}