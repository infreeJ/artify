package io.github.infreeJ.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.security.JwtUtil;
import io.github.infreeJ.backend.service.CustomUserDetails;
import io.github.infreeJ.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final JwtUtil jwtUtil;
	private final AuthenticationManager authManager;
	
	// 토큰 유효시간 확인용
	@GetMapping("/ping")
	public String ping() {
		return "pong";
	}
	
	// 로그인 폼에 아이디 저장기능 예정
//	@GetMapping("/login-form")
	
	
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequestDto dto) {
		
		Authentication authentication = null;
		
		try {
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.getLoginId(), dto.getPwd());
			authentication = authManager.authenticate(authToken); // 비밀번호 검증
		} catch (BadCredentialsException e) {
            log.error("Login failed for user: {}", dto.getLoginId(), e);
            Map<String, String> errorBody = Map.of("error", "아이디 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
        }
		
		// 인증 결과에서 CustomUserDetails 가져오기
	    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

	    // CustomUserDetails에서 id와 username 가져오기
	    Long userId = userDetails.getId();
	    String username = userDetails.getUsername();

	    // id와 username을 모두 사용하는 generateToken로 토큰 생성
	    String token = jwtUtil.generateToken(userId, username);

        Map<String, String> responseBody = Map.of("token", "Bearer " + token);
        return ResponseEntity.ok(responseBody);
	}
	
	
	// id로 유저 상세정보 조회
	@GetMapping("/user/{userId}")
	public UserDto getById(@PathVariable long userId) {
		return userService.getById(userId);
	}
	
	
	// loginId 유저 상세정보 조회
	@GetMapping("/user/loginId/{loginId}")
	public UserDto getByLoginId(@PathVariable String loginId) {
		return userService.getByLoginId(loginId);
	}
	
		
	// id로 유저 삭제
	@DeleteMapping("/user")
	public int deleteUserById(@RequestBody long id) {
		return userService.deleteUserById(id);
	}
	
	
	// 유저 생성
	@PostMapping("/user")
	public ResponseEntity<Map<String, Long>> createUser(@RequestBody UserDto dto) {
		Long newId = userService.createUser(dto);
		Map<String, Long> responseBody = Map.of("id", newId);
	
		return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
	}
	

	// id로 유저 정보 업데이트
	@PatchMapping("/user")
	public int updateUserById(@RequestBody UserDto dto) {
		return userService.updateUserById(dto);
	}
	
	
	// id로 유저 비밀번호 변경
	@PatchMapping("/user-pwd")
	public int updatePwdById(@RequestBody UserDto dto) {
		return userService.updatePwdById(dto);
	}
}


