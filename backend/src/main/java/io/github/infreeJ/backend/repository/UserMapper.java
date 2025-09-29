package io.github.infreeJ.backend.repository;

import org.apache.ibatis.annotations.Mapper;

import io.github.infreeJ.backend.dto.UserDto;

@Mapper
public interface UserMapper {

	// 특정 유저의 정보 조회
	public UserDto getDetailById(long id);
	
	// 유저 생성
	public int createUser(UserDto dto);
	
	// 유저 삭제
	public int deleteUserById(long id);
	
	// 유저 정보 업데이트
	public int updateUserById(UserDto dto);
	
	// 유저 비밀번호 변경
	public int updatePwdById(UserDto dto);
	
	// loginId 중복 조회용 / Redux 저장용
	public UserDto getByLoginId(String loginId);
}




