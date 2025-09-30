package io.github.infreeJ.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ImageConfig implements WebMvcConfigurer{
	
	// 클라이언트가 이미지를 요청할 패턴
	private final String urlPath = "/images/**";
	
	// 이미지가 실제로 저장된 로컬 폴더 경로
	private final String resourcePath = "file:../../images/";
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(urlPath).addResourceLocations(resourcePath);
	}
}
