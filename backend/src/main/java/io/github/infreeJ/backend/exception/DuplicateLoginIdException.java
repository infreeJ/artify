package io.github.infreeJ.backend.exception;

//아이디 중복 Exception
public class DuplicateLoginIdException extends RuntimeException{
	
	public DuplicateLoginIdException(String message) {
		super(message);
	}
}
