package fintrack.fintrackapi.controllers;

import fintrack.fintrackapi.interfaces.IUserService;
import fintrack.fintrackapi.models.Expense;
import fintrack.fintrackapi.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.saveUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{userId}/expenses")
    public ResponseEntity<String> addExpenseToUser(@PathVariable Long userId, @RequestBody Expense expense) {
        try {
            userService.addExpenseToUser(userId, expense);
            return ResponseEntity.ok("Expense added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}