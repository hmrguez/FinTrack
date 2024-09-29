export class User {
	id: number;
	email: string;
	balance: number;

	constructor(id: number, name: string, email: string, balance: number) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.balance = balance;
	}
}