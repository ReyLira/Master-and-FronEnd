package com.soa.canete.funcionary_soa_canete.service;

import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryRequestDto;
import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryResponseDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface FuncionaryService {

    Mono<FuncionaryResponseDto> findById(Integer id_funcionary);
    Flux<FuncionaryResponseDto> findAll();
    Flux<FuncionaryResponseDto> findAllActive();
    Flux<FuncionaryResponseDto> findAllInactive();
    Mono<FuncionaryResponseDto> saveNewLegalGuardian(FuncionaryRequestDto request);
    Mono<FuncionaryResponseDto> updateLegalGuardian(FuncionaryRequestDto request, Integer id_funcionary);
    Mono<FuncionaryResponseDto> deleteLogicalLegalGuardian(Integer id_funcionary);
    Mono<FuncionaryResponseDto> reactiveLogicalLegalGuardian(Integer id_funcionary);
    Mono<Void> deleteLegalGuardian(Integer id_funcionary);

}
