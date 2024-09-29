import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from "@/models/User";
import jwtDecode from 'jwt-decode';


const API_URL = 'http://localhost:9001/api/users';

/**
 * Registers a new user with the backend.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {object} The created user object.
 * @throws Will throw an error if the sign-up fails.
 */
export async function signUp(email: string, password: string) {
	const user = {
		email,
		password,
	};

	try {
		const response = await fetch(`${API_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			const data = await response.json();
			return data; // The created user object
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign up');
		}
	} catch (error) {
		console.error('Error during sign up:', error);
		throw error;
	}
}

/**
 * Logs in a user by validating credentials with the backend.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {object} The authentication response containing the token.
 * @throws Will throw an error if the sign-in fails.
 */
export async function signIn(email: string, password: string) {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email, password}),
		});

		if (response.ok) {
			const data = await response.json();
			// Store the token in AsyncStorage for future authenticated requests
			await AsyncStorage.setItem('token', data.token);
			await AsyncStorage.setItem('userId', data.userId);
			return data;
		} else if (response.status === 401) {
			throw new Error('Invalid email or password');
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign in');
		}
	} catch (error) {
		console.error('Error during sign in:', error);
		throw error;
	}
}

/**
 * Logs out the user by removing the token from storage.
 */
export async function signOut() {
	await AsyncStorage.removeItem('token');
	await AsyncStorage.removeItem('userId');
}

/**
 * Retrieves the stored authentication token.
 * @returns {string|null} The stored token or null if not found.
 */
export async function getToken() {
	return await AsyncStorage.getItem('token');
}

/**
 * Checks if the user is logged in.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */

export async function isLoggedIn() {
	const token = await getToken();

	if (!token) {
		return false;
	}

	try {
		const decodedToken: { exp: number } = jwtDecode.jwtDecode(token);
		const currentTime = Date.now() / 1000;

		return decodedToken.exp > currentTime;
	} catch (error) {
		console.error('Error decoding token:', error);
		return false;
	}
}

/**
 * Retrieves the stored user ID.
 * @returns {number|null} The stored user ID or null if not found.
 */
export async function getUserId() {
	const userId = await AsyncStorage.getItem('userId');


	return userId ? JSON.parse(userId) : null;
}

/**
 * Retrieves the user object from the backend.
 * @param {number} id - The user's ID. If omitted gets the logged-in user.
 * @returns {object} The user object.
 * @throws Will throw an error if the request fails.
 */
export async function getUser(id: number = -1): Promise<User> {

	if (id === -1) {
		id = await getUserId();
	}

	try {
		const response = await fetch(`${API_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${await getToken()}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to get user');
		}
	} catch (error) {
		console.error('Error during get user:', error);
		throw error;
	}
}