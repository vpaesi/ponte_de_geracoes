package com.group9.ponte_de_geracoes.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ErrorResponseDTO {
    private String error;
    private List<String> messages;
    private LocalDateTime timestamp;
    private int status;

    public ErrorResponseDTO(String error, List<String> messages) {
        this.error = error;
        this.messages = messages;
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponseDTO() {

    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }


    public void setMessage(String message) {
    }


}