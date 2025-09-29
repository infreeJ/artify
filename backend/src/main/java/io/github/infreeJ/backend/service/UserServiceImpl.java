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

	// id로 유저 상세정보 출력
	@Override
	public UserDto getById(long id) {
		return mapper.getById(id);
	}
	

	// loginId로 유저 상세정보 출력
	@Override
	public UserDto getByLoginId(String loginId) {
		return mapper.getByLoginId(loginId);
	}

	
	// 유저 생성
	@Override
	public long createUser(UserDto dto) {
		UserDto result = mapper.getByLoginId(dto.getLoginId());
		
		// loginId 중복 검사
		if(result != null) {
			throw new DuplicateLoginIdException("이미 사용 중인 아이디입니다.");
		}
		
		// 암호화
		String encoedPassword = passwordEncoder.encode(dto.getPwd());
		dto.setPwd(encoedPassword);
		return mapper.createUser(dto);
	}
	

	// id로 유저 삭제
	@Override
	public int deleteUserById(long id) {
		return mapper.deleteUserById(id);
	}

	
	// id로 유저 정보 업데이트
	@Override
	public int updateUserById(UserDto dto) {
		return mapper.updateUserById(dto);
	}

	
	// id로 유저 비밀번호 변경
	@Override
	public int updatePwdById(UserDto dto) {
		return mapper.updatePwdById(dto);
	}

	
	
	// 유령 코드(문제없을 시 곧 삭제)
//	@Override
//	public UserDto login(LoginRequestDto dto) {
//		UserDto userFromDb = mapper.getByLoginId(dto.getLoginId());
//		
//		if(userFromDb != null) {
//			String rawPassword = dto.getPwd();
//			String encodedPassword = userFromDb.getPwd();
//			
//			if(passwordEncoder.matches(rawPassword, encodedPassword)) {
//				return userFromDb;
//			}
//		}
//		
//		return null;
//	}

	
}



