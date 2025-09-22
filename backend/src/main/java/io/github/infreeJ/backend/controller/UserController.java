package io.github.infreeJ.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service;
	
	// 로그인 폼에 아이디 저장기능 예정
//	@GetMapping("/login-form")
	
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequestDto dto) {
		UserDto loggedInUser = service.login(dto);
		
		if(loggedInUser != null) {
			
			// 여기서 JWT 로직 구현
			
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
	}
	
	
	// 사용자 세부 정보 조회
	@GetMapping("/user/{id}")
	public UserDto getDetailById(long id) {
		return service.getDetailById(id);
	}
	
	// 사용자 삭제
	@DeleteMapping("/user")
	public int deleteUserById(@RequestBody long id) {
		return service.deleteUserById(id);
	}
	
	// 사용자 생성
	@PostMapping("/user")
	public ResponseEntity<Map<String, Long>> createUser(@RequestBody UserDto dto) {
		Long newId = service.createUser(dto);
		Map<String, Long> responseBody = Map.of("id", newId);
	
		return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
	}
	

	// 사용자 정보 수정
	@PutMapping("/user")
	public int updateUserById(@RequestBody UserDto dto) {
		return service.updateUserById(dto);
	}
	
	// 사용자 비밀번호 수정
	@PatchMapping("/user")
	public int updatePwdById(@RequestBody UserDto dto) {
		return service.updatePwdById(dto);
	}
}


