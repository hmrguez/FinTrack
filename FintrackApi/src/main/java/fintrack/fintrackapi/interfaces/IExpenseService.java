package fintrack.fintrackapi.interfaces;

import fintrack.fintrackapi.models.Expense;

import java.util.List;

public interface IExpenseService {
    Expense saveExpense(Expense expense);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);

    List<Expense> getExpensesByUserId(Long userId);

    void deleteExpense(Long id);
}