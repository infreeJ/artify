package io.github.infreeJ.backend.repository;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import io.github.infreeJ.backend.dto.UserDto;

@Mapper
public interface UserMapper {

	// 특정 유저의 정보 조회
	public UserDto getDetailById(long id);
	
	// 유저 생성
	@Insert("INSERT INTO users(id, login_id, pwd, name, age, gender, persona, org_profile_img_name, uuid_profile_img_name)"
			+ "VALUES(users_seq.NEXTVAL, #{loginId}, #{pwd}, #{name}, #{age}, #{gender}, #{persona}, #{orgProfileImgName}, #{uuidProfileImgName})")
	public int createUser(UserDto dto);
	
	// 유저 삭제
	@Delete("DELETE FROM users WHERE id = #{id}")
	public int deleteUserById(long id);
	
	// 유저 정보 업데이트
	@Update("UPDATE user"
			+ "login_id = #{loginId}, name = #{name}, age = #{age}, gender = #{gendar}, persona = #{persona}, org_profile_img_name = #{orgProfileImgName}, uuid_profile_img_name = #{uuidProfileImgName}"
			+ "WHERE id = #{id}")
	public int updateUserById(long id);
	
	// 유저 비밀번호 변경
	@Update("UPDATE user"
			+ "pwd = #{pwd}"
			+ "WHERE id = #{id}")
	public int updatePwdById();
}




