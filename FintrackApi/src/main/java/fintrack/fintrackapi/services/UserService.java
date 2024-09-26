package fintrack.fintrackapi.services;

import fintrack.fintrackapi.interfaces.IUserService;
import fintrack.fintrackapi.models.Expense;
import fintrack.fintrackapi.models.User;
import fintrack.fintrackapi.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final IUserRepository IUserRepository;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder


    @Autowired
    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.IUserRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return IUserRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return IUserRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = IUserRepository.findById(id);
        return optionalUser.orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        IUserRepository.deleteById(id);
    }

    @Override
    public User getByEmail(String email) {
        return IUserRepository.findByEmail(email);
    }

    @Override
    public void addExpenseToUser(Long userId, Expense expense) {
        User user = getUserById(userId);
        if (user != null && user.getBalance() >= expense.getAmount()) {
            user.addExpense(expense);
            IUserRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found or insufficient balance");
        }
    }
}