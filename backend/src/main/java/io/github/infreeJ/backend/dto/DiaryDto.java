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
public class DiaryDto {
	private long id;
	private String title;
	private String content;
	private int mood;
	private LocalDateTime createdAt;
}
