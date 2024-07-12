package com.flashcards.flashcardsapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Konfiguracja dla wszystkich endpointów
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:3000") // Adresy frontendów
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Zezwolone metody HTTP
                .allowedHeaders("*") // Zezwolenie na wszystkie nagłówki
                .allowCredentials(true) // Pozwolenie na wysyłanie cookies / uwierzytelnianie
                .maxAge(3600); // Czas, przez który odpowiedź na żądanie pre-flight jest ważna
    }
}