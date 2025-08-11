package com.group9.ponte_de_geracoes.exception;

import java.util.List;

public class EntityNotFoundException extends RuntimeException {
    private List<String> userMessages;

    public EntityNotFoundException(String message, List<String> userMessages) {
        super(message);
        this.userMessages = userMessages;
    }

    public List<String> getUserMessages() {
        return userMessages;
    }

    public void setUserMessages(List<String> userMessages) {
        this.userMessages = userMessages;
    }

    public String getErrors() {
        return "";
    }
}