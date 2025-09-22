package io.github.infreeJ.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.Getter;

@RestControllerAdvice
public class ExceptionController {

	// 아이디 중복 Exception
	@ExceptionHandler(DuplicateLoginIdException.class)
	public ResponseEntity<ErrorResponse> handleDuplicateLoginIdException(DuplicateLoginIdException e) {
		ErrorResponse response = new ErrorResponse(HttpStatus.CONFLICT.value(), e.getMessage());
		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	
	@Getter
	public static class ErrorResponse {
        private int status;
        private String message;

        public ErrorResponse(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
	
}
