package com.soa.canete.funcionary_soa_canete.service.impl;

import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryRequestDto;
import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryResponseDto;
import com.soa.canete.funcionary_soa_canete.domain.mapper.FuncionaryMapper;
import com.soa.canete.funcionary_soa_canete.domain.model.Funcionary;
import com.soa.canete.funcionary_soa_canete.exception.ResourceNotFoundException;
import com.soa.canete.funcionary_soa_canete.repository.FuncionaryRepository;
import com.soa.canete.funcionary_soa_canete.service.FuncionaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Comparator;

import static com.soa.canete.funcionary_soa_canete.domain.mapper.FuncionaryMapper.toModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class FuncionaryImpl implements FuncionaryService {

    final FuncionaryRepository funcionaryRepository;

    @Override
    public Mono<FuncionaryResponseDto> findById(Integer id_funcionary) {
        return this.funcionaryRepository.findById(id_funcionary)
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Flux<FuncionaryResponseDto> findAll() {
        return this.funcionaryRepository.findAll()
                .sort(Comparator.comparing(Funcionary::getId_funcionary).reversed())
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Flux<FuncionaryResponseDto> findAllActive() {
        return this.funcionaryRepository.findAll()
                .sort(Comparator.comparing(Funcionary::getId_funcionary).reversed())
                .filter(active -> active.getEstado().equals("A"))
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Flux<FuncionaryResponseDto> findAllInactive() {
        return this.funcionaryRepository.findAll()
                .sort(Comparator.comparing(Funcionary::getId_funcionary).reversed())
                .filter(active -> active.getEstado().equals("I"))
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Mono<FuncionaryResponseDto> saveNewLegalGuardian(FuncionaryRequestDto request) {
        return this.funcionaryRepository.save(toModel(request))
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Mono<FuncionaryResponseDto> updateLegalGuardian(FuncionaryRequestDto request, Integer id_funcionary) {
        return this.funcionaryRepository.findById(id_funcionary)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("El identificador: " + id_funcionary + "no fue encontrado.")))
                .flatMap(dataFuncionary -> this.funcionaryRepository.save(toModel(request, dataFuncionary.getId_funcionary())))
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Mono<FuncionaryResponseDto> deleteLogicalLegalGuardian(Integer id_funcionary) {
        return this.funcionaryRepository.findById(id_funcionary)
                .map((delete) -> {
                    delete.setEstado("I");
                    return delete;
                })
                .flatMap(funcionaryRepository::save)
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Mono<FuncionaryResponseDto> reactiveLogicalLegalGuardian(Integer id_funcionary) {
        return this.funcionaryRepository.findById(id_funcionary)
                .map((reactive) -> {
                    reactive.setEstado("A");
                    return reactive;
                })
                .flatMap(funcionaryRepository::save)
                .map(FuncionaryMapper::toDto);
    }

    @Override
    public Mono<Void> deleteLegalGuardian(Integer id_funcionary) {
        return this.funcionaryRepository.deleteById(id_funcionary);
    }
}
