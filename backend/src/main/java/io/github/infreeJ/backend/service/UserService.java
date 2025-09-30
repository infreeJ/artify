package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.LoginRequestDto;
import io.github.infreeJ.backend.dto.UserDto;

public interface UserService {
	
	// id로 유저 상세정보 출력
	public UserDto getById(long id);

	// loginId로 유저 상세정보 출력
	public UserDto getByLoginId(String loginId);

	// 유저 생성
	public long createUser(UserDto dto);

	// id로 유저 삭제
	public int deleteUserById(long id);

	// id로 유저 정보 업데이트
	public int updateUserById(UserDto dto);

	// id로 유저 비밀번호 변경
	public int updatePwdById(UserDto dto);

	
	// 유령코드 문제없을 시 곧 삭제
//	public UserDto login(LoginRequestDto dto);
}
