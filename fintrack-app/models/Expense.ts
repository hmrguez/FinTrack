export class Expense {
	constructor(id: number, description: string, category: string, amount: number, date: Date) {
		this.id = id;
		this.description = description;
		this.category = category;
		this.amount = amount;
		this.date = date;
	}

	id: number;
	description: string;
	category: string;
	amount: number;
	date: Date;
}