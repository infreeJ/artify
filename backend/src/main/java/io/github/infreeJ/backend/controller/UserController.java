package io.github.infreeJ.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service;
	
	// 로그인 폼에 아이디 저장기능 예정
//	@GetMapping("/login-form")
	
	
//	@PostMapping("/login")
//	public UserDto login(@RequestBody UserDto dto) {
//		service.get
//		return null;
//	}
	
	@GetMapping("/user/{id}")
	public UserDto getDetailById(long id) {
		return service.getDetailById(id);
	}
	
	@DeleteMapping("/user")
	public int deleteUserById(@RequestBody long id) {
		return service.deleteUserById(id);
	}
	
	@PostMapping("/user")
	public int createUser(@RequestBody UserDto dto) {
		return service.createUser(dto);
	}

	@PutMapping("/user")
	public int updateUserById(@RequestBody UserDto dto) {
		return service.updateUserById(dto);
	}
	
	@PatchMapping("/user")
	public int updatePwdById(@RequestBody UserDto dto) {
		return service.updatePwdById(dto);
	}
}


