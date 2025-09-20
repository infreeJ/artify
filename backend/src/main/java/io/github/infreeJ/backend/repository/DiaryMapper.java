package io.github.infreeJ.backend.repository;

import org.apache.ibatis.annotations.Mapper;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;

@Mapper
public interface DiaryMapper {

	public DiaryDto getDiaryDetailByDiaryId(long id);
	
	public UserDto getDiaryListByUserId(long id);
	
	public int createDiary(DiaryDto dto);
	
	public int updateDiary(DiaryDto dto);
	
	public int deleteDiary(long id);
}
