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
@NoArgsConstructor
public class GeminiRequestDto {
    private List<Content> contents;
    private GenerationConfig generationConfig;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Content {
        private List<Part> parts;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Part {
        private String text;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GenerationConfig {
        private List<String> responseModalities; // TEXT, IMAGE
    }
}

