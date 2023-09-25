package com.soa.canete.funcionary_soa_canete.exception;

import lombok.Data;

@Data
public class ErrorMessage {

    final String error;
    final String message;
    final Integer code;

    public ErrorMessage(Exception exception, Integer code) {
        this.error = exception.getClass().getSimpleName();
        this.message = exception.getMessage();
        this.code = code;
    }
}
