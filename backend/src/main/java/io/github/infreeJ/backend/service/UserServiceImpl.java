package io.github.infreeJ.backend.service;

import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.repository.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserMapper mapper;

	@Override
	public UserDto getDetailById(long id) {
		return mapper.getDetailById(id);
	}

	@Override
	public int createUser(UserDto dto) {
		// 암호화 필요
		return mapper.createUser(dto);
	}

	@Override
	public int deleteUserById(long id) {
		return mapper.deleteUserById(id);
	}

	@Override
	public int updateUserById(UserDto dto) {
		return mapper.updateUserById(dto);
	}

	@Override
	public int updatePwdById(UserDto dto) {
		return mapper.updatePwdById(dto);
	}
}



