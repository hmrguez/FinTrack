package fintrack.fintrackapi.services;

import fintrack.fintrackapi.interfaces.IExpenseService;
import fintrack.fintrackapi.models.Expense;
import fintrack.fintrackapi.repositories.IExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService implements IExpenseService {

    private final IExpenseRepository IExpenseRepository;

    @Autowired
    public ExpenseService(IExpenseRepository IExpenseRepository) {
        this.IExpenseRepository = IExpenseRepository;
    }

    @Override
    public Expense saveExpense(Expense expense) {
        return IExpenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return IExpenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(Long id) {
        Optional<Expense> optionalExpense = IExpenseRepository.findById(id);
        return optionalExpense.orElse(null);
    }

    @Override
    public void deleteExpense(Long id) {
        IExpenseRepository.deleteById(id);
    }

    @Override
    public List<Expense> getExpensesByUserId(Long userId) {
        return IExpenseRepository.findByUserId(userId);
    }
}