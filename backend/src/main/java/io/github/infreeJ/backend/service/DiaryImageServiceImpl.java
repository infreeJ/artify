package io.github.infreeJ.backend.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.DiaryImageDto;
import io.github.infreeJ.backend.repository.DiaryImageMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryImageServiceImpl implements DiaryImageSerive{
	
	private final DiaryImageMapper diaryImageMapper;
	private final ImageManagerService imageManagerService;

	// 일기 이미지 저장
	@Override
	public int createDiaryImage(DiaryImageDto dto) throws IOException {
		
		dto = imageManagerService.downloadAndSaveImage(dto);
		
		return diaryImageMapper.createDiaryImage(dto);
	}

	// 일기 이미지 수정
	@Override
	public int updateDiaryImage(DiaryImageDto dto) {
		return diaryImageMapper.updateDiaryImage(dto);
	}

	// 일기 이미지 삭제
	@Override
	public int deleteDiaryImage(long id) {
		return diaryImageMapper.deleteDiaryImage(id);
	}

}
