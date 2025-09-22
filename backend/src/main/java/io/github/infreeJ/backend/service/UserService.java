package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;

public interface UserService {
	public UserDto getDetailById(long id);
	
	public long createUser(UserDto dto);
	
	public int deleteUserById(long id);
	
	public int updateUserById(UserDto dto);
	
	public int updatePwdById(UserDto dto);

	public UserDto getByLoginId(String loginId);
	
	public UserDto login(LoginRequestDto dto);
}
