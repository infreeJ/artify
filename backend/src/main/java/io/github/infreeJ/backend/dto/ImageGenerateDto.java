package io.github.infreeJ.backend.dto;

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
public class ImageGenerateDto {
	
	private Long userId;
	private String title;
	private String content;
	private String style;
	private String option;
	private int age;
	private int gender;
	private String persona;
}
