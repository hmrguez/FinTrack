package fintrack.fintrackapi.interfaces;

import fintrack.fintrackapi.models.Expense;
import fintrack.fintrackapi.models.User;

import java.util.List;

public interface IUserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
    User getByEmail(String email);
    void addExpenseToUser(Long userId, Expense expense);
}