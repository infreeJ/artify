package io.github.infreeJ.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
	
	@GetMapping("/ping")
	public String ping() {
		return "pong";
	}
	
	// 로그인 폼에 아이디 저장기능 예정
//	@GetMapping("/login-form")
	
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequestDto dto) {
		
		Authentication authentication = null;
		
		try {
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.getLoginId(), dto.getPwd());
			authentication = authManager.authenticate(authToken);
		} catch (BadCredentialsException e) {
            log.error("Login failed for user: {}", dto.getLoginId(), e);
            Map<String, String> errorBody = Map.of("error", "아이디 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
        }

        String token = jwtUtil.generateToken(dto.getLoginId());

        Map<String, String> responseBody = Map.of("token", "Bearer " + token);
        return ResponseEntity.ok(responseBody);
	}
	
	
	// 사용자 세부 정보 조회
	@GetMapping("/user/{id}")
	public UserDto getDetailById(long id) {
		return userService.getDetailById(id);
	}
	
	// 사용자 삭제
	@DeleteMapping("/user")
	public int deleteUserById(@RequestBody long id) {
		return userService.deleteUserById(id);
	}
	
	// 사용자 생성
	@PostMapping("/user")
	public ResponseEntity<Map<String, Long>> createUser(@RequestBody UserDto dto) {
		Long newId = userService.createUser(dto);
		Map<String, Long> responseBody = Map.of("id", newId);
	
		return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
	}
	

	// 사용자 정보 수정
	@PutMapping("/user")
	public int updateUserById(@RequestBody UserDto dto) {
		return userService.updateUserById(dto);
	}
	
	// 사용자 비밀번호 수정
	@PatchMapping("/user")
	public int updatePwdById(@RequestBody UserDto dto) {
		return userService.updatePwdById(dto);
	}
	
	@GetMapping("/user/loginId/{loginId}")
	public UserDto getByLoginId(@PathVariable String loginId) {
		return userService.getByLoginId(loginId);
	}
}


