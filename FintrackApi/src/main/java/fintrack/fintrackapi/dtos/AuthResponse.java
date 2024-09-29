package fintrack.fintrackapi.dtos;

public class AuthResponse {

    private String token;
    private Long userId;

    public AuthResponse(String token, Long user) {
        this.token = token;
        this.userId = user;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Getter
    public Long getUserId() {
        return userId;
    }
}