package io.github.infreeJ.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiaryImageDto {
	private long id;
	private long diaryId;
	private String prompt;
	private String imageUrl;
	private LocalDateTime createdAt;
}




