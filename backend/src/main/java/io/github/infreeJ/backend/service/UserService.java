package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.UserDto;

public interface UserService {
	public UserDto getDetailById(long id);
	
	public int createUser(UserDto dto);
	
	public int deleteUserById(long id);
	
	public int updateUserById(UserDto dto);
	
	public int updatePwdById(UserDto dto);
}
