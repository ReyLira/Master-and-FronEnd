package com.soa.canete.funcionary_soa_canete.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ServerWebInputException;

import java.time.format.DateTimeParseException;


@ControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseBody
    public ErrorMessage notFound(Exception e) {
        return new ErrorMessage(e, HttpStatus.NOT_FOUND.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            BadRequestException.class,
            DateTimeParseException.class,
            WebExchangeBindException.class,
            HttpMessageNotReadableException.class,
            ServerWebInputException.class
    })
    @ResponseBody
    public ErrorMessage badRequest(Exception e) {
        return new ErrorMessage(e, HttpStatus.BAD_REQUEST.value());
    }


}
