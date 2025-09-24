package io.github.infreeJ.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtFilter jwtFilter;
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		String[] whiteList = {"/user", "/login", "/signup", "/swagger-ui/**", "/v3/api-docs/**"};
		
        http
        	.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize -> authorize
            	.requestMatchers(whiteList).permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(config -> // 세션 정책 설정
			config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 X
            // JWT 검증이 먼저 이루어 지도록 커스텀 필터를 추가하고 순서 설정
    		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http,
			BCryptPasswordEncoder encoder, UserDetailsService service) throws Exception{
		return http.getSharedObject(AuthenticationManagerBuilder.class)
				.userDetailsService(service)
				.passwordEncoder(encoder)
				.and()
				.build();
	}
	
}
