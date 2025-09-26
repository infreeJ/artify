package io.github.infreeJ.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GeminiResponseDto {
    private List<Candidate> candidates;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Candidate {
        private Content content;
    }

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
        private InlineData inlineData; // 이미지 데이터
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InlineData {
        private String mimeType;  // "image/png"
        private String data;      // base64 인코딩된 이미지
    }
}
