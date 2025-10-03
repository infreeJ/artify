package io.github.infreeJ.backend.service;

import java.io.IOException;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;

public interface DiaryService {
	
	// id로 일기 상세정보 출력
	public DiaryDto getDiaryDetailByDiaryId(Long id);
	
	// 유저 id로 해당 유저 일기 목록 출력
	public UserDto getDiaryListByUserId(Long id);
	
	// 일기 생성
	public long createDiary(DiaryDto dto) throws IOException;
	
	// 일기 내용 업데이트
	public long updateDiary(DiaryDto dto) throws IOException;
	
	// 일기 삭제
	public int deleteDiary(long id);
}
