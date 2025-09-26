package io.github.infreeJ.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class GeminiRequestDto {
	private List<Content> contents;
	
	@Setter
	@Getter
	@AllArgsConstructor
	public static class Content {
		private List<Part> parts;
	}
	
	@Setter
	@Getter
	@AllArgsConstructor
	public static class Part {
		private String text;
	}
}
