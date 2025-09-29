package io.github.infreeJ.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.service.DiaryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DiaryController {
	
	private final DiaryService service;
	
	@GetMapping("diary/detail/{id}")
	public DiaryDto getDiaryDetailByDiaryId(@PathVariable Long id) {
		return service.getDiaryDetailByDiaryId(id);
	}
	
	@GetMapping("/diary/list/{id}")
	public UserDto getDiaryListByUserId(@PathVariable Long id) {
		return service.getDiaryListByUserId(id);
	}
	
	@PostMapping("/diary")
	public long createDiary(@RequestBody DiaryDto dto) {
		return service.createDiary(dto);
	}
	
	@PutMapping("/diary")
	public int updateDiary(@RequestBody DiaryDto dto) {
		return service.updateDiary(dto);
	}

	@DeleteMapping("/diary")
	public int deleteDiary(@RequestBody Long id) {
		return service.deleteDiary(id);
	}

}
