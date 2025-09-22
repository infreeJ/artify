package io.github.infreeJ.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.exception.DuplicateLoginIdException;
import io.github.infreeJ.backend.repository.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserMapper mapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDto getDetailById(long id) {
		return mapper.getDetailById(id);
	}
	

	@Override
	public UserDto getByLoginId(String loginId) {
		return mapper.getByLoginId(loginId);
	}

	
	@Override
	public long createUser(UserDto dto) {
		UserDto result = mapper.getByLoginId(dto.getLoginId());
		if(result != null) {
			throw new DuplicateLoginIdException("이미 사용 중인 아이디입니다.");
		}
		
		String encoedPassword = passwordEncoder.encode(dto.getPwd());
		dto.setPwd(encoedPassword);
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


	@Override
	public UserDto login(LoginRequestDto dto) {
		UserDto userFromDb = mapper.getByLoginId(dto.getLoginId());
		
		if(userFromDb != null) {
			String rawPassword = dto.getPwd();
			String encodedPassword = userFromDb.getPwd();
			
			if(passwordEncoder.matches(rawPassword, encodedPassword)) {
				return userFromDb;
			}
		}
		
		return null;
	}

	
}



