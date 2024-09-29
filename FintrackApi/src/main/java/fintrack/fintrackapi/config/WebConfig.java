package fintrack.fintrackapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")            // Allow CORS on all endpoints
                .allowedOrigins("*")          // Allow all origins
                .allowedMethods("*")          // Allow all HTTP methods (GET, POST, etc.)
                .allowedHeaders("*");         // Allow all headers
    }
}