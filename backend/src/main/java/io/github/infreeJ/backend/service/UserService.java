package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;

public interface UserService {
	public UserDto getById(long id);

	public UserDto getByLoginId(String loginId);
	
	public long createUser(UserDto dto);
	
	public int deleteUserById(long id);
	
	public int updateUserById(UserDto dto);
	
	public int updatePwdById(UserDto dto);

	
	// 유령코드 문제없을 시 곧 삭제
//	public UserDto login(LoginRequestDto dto);
}
