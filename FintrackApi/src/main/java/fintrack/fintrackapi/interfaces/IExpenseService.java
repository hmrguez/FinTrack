package fintrack.fintrackapi.interfaces;

import fintrack.fintrackapi.models.Expense;

import java.util.List;

public interface IExpenseService {
    Expense saveExpense(Expense expense);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);

    void deleteExpense(Long id);
}