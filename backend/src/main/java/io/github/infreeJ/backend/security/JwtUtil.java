package io.github.infreeJ.backend.security;

import java.security.Key;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
    @Value("${jwt.secret}") // properties 값
    private String secretKey;

    @Value("${jwt.expiration}") // properties 값
    private long expiration;

    private Key getSigningKey() { // 평문 secret Key를 암호화된 Key 객체로 변환
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
    }

	// token에서 원하는 정보를 추출하는 메서드
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public String extractUsername(String token) { // userName 추출
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) { // 만료시간 추출
        return extractClaim(token, Claims::getExpiration);
    }

    public Claims extractAllClaims(String token) { // JWT의 모든 정보 추출
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token) // 추출하면서 검증도 하기
                .getBody();
    }

    private Boolean isTokenExpired(String token) { // 토큰 만료 여부 확인
        return extractExpiration(token).before(new Date());
    }
    
    // 복잡한 createToken 로직을 내부에 숨겨두고 간단히 토큰을 생성을 하는 메서드
    // Role 정보가 없는 경우의 토큰 생성
    public String generateToken(String username) {
        // 내부적으로 기존 createToken 메서드를 빈 claims 맵과 함께 호출합니다.
        return createToken(Collections.emptyMap(), username);
    }

	// 복잡한 createToken 로직을 내부에 숨겨두고 간단히 토큰을 생성을 하는 메서드
    // Role 정보가 있는 경우의 토큰 생성
    public String generateToken(String username, Map<String, Object> extraClaims) {
        Map<String, Object> claims = new HashMap<>(extraClaims);
        return createToken(claims, username);
    }
    
    // 복잡한 토큰 생성 로직
    private String createToken(Map<String, Object> claims, String subject) {
    	final Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 추가 정보 설정
                .setSubject(subject) // 주요 정보 설정 (주로 userName)
                .setIssuer("artify") // 발급한 주체 설정
                .setIssuedAt(now) // 발급 시간 설정
                .setExpiration(new Date(now.getTime() + expiration)) // 만료시간 설정
                .signWith(getSigningKey()) // HS256 알고리즘으로 만든 비밀키로 서명
                .compact(); // 모든 정보 조합 및 서명 후 인코딩
    }
    
    // token 검증 메서드
    public boolean validateToken(String token, UserDetails userDetails) {
        final String usernameFromToken = extractUsername(token);
        return (usernameFromToken.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}