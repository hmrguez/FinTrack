package fintrack.fintrackapi.services;

import fintrack.fintrackapi.interfaces.IUserService;
import fintrack.fintrackapi.models.Expense;
import fintrack.fintrackapi.models.User;
import fintrack.fintrackapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void addExpenseToUser(Long userId, Expense expense) {
        User user = getUserById(userId);
        if (user != null && user.getBalance() >= expense.getAmount()) {
            user.addExpense(expense);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found or insufficient balance");
        }
    }
}