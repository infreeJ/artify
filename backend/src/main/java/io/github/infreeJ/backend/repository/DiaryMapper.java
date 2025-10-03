package io.github.infreeJ.backend.repository;

import org.apache.ibatis.annotations.Mapper;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;

@Mapper
public interface DiaryMapper {

	// id로 일기 상세정보 출력
	public DiaryDto getDiaryDetailByDiaryId(long id);
	
	// 유저 id로 해당 유저 일기 목록 출력
	public UserDto getDiaryListByUserId(long id);
	
	// 일기 생성
	public int createDiary(DiaryDto dto);
	
	// 일기 내용 업데이트(이미지 포함)
	public int updateDiary(DiaryDto dto);
	
	// 일기 내용 업데이트(일기 내용만)
	public int updateDiaryOnlyContent(DiaryDto dto);
	
	// 일기 삭제
	public int deleteDiary(long id);
}
