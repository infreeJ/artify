package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.DiaryImageDto;

public interface DiaryImageSerive {
	
	// 일기 이미지 저장
	public int createDiaryImage(DiaryImageDto dto);
	
	// 일기 이미지 수정
	public int updateDiaryImage(DiaryImageDto dto);
	
	// 일기 이미지 삭제
	public int deleteDiaryImage(long id);
}
