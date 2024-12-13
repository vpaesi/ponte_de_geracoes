package com.group9.ponte_de_geracoes.config;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.group9.ponte_de_geracoes.dto.ErrorResponseDTO;
import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFoundEntityException(EntityNotFoundException ex){
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now().toString());
        response.setErrors(ex.getErrors());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
}
