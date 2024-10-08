package com.backend.server.security.config;
import com.backend.server.security.config.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
@EnableWebSecurity
@Component
public class HttpSecurityConfig {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter authenticationFilter;




    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:8085"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf( csrfConfig -> csrfConfig.disable())
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .authorizeHttpRequests( authConfig ->{
//                    authConfig.requestMatchers("/error").permitAll();
                    authConfig.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/mail/sendemail").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/mail/sendverifyemail").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll();


                    authConfig.requestMatchers(HttpMethod.PUT, "/api/usuario/admin/update").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/usuario/**").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/usuario/**").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword1").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword2").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword3").permitAll();

                    authConfig.anyRequest().denyAll();



                })
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
    }






}
