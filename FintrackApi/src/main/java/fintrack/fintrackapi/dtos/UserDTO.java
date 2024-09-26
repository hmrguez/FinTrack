package fintrack.fintrackapi.dtos;

import fintrack.fintrackapi.models.Expense;

import java.util.Set;


public class UserDTO {

    private Long id;
    private String email;
    private Double balance;
    private Set<Expense> expenses;

    // Constructor
    public UserDTO(Long id, String email, Double balance, Set<Expense> expenses) {
        this.id = id;
        this.email = email;
        this.balance = balance;
        this.expenses = expenses;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Double getBalance() {
        return balance;
    }

    public Set<Expense> getExpenses() {
        return expenses;
    }
}