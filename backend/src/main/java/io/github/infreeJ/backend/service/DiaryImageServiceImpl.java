package io.github.infreeJ.backend.service;

import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.DiaryImageDto;
import io.github.infreeJ.backend.repository.DiaryImageMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryImageServiceImpl implements DiaryImageService{
	
	private final DiaryImageMapper imageMapper;

	@Override
	public int diaryImageInsert(DiaryImageDto dto) {
		return imageMapper.diaryImageInsert(dto);
	}

	@Override
	public int diaryImageUpdate(DiaryImageDto dto) {
		return imageMapper.diaryImageUpdate(dto);
	}

	@Override
	public int diaryImageDelete(long id) {
		return imageMapper.diaryImageDelete(id);
	}

}
