package io.github.infreeJ.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class GeminiResponseDto {
    private List<Candidate> candidates;

    @Setter
    @Getter
    @NoArgsConstructor
    public static class Candidate {
        private Content content;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class Content {
        private List<Part> parts;
        private String role;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class Part {
        private String text;
    }
}