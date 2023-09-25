package com.soa.canete.funcionary_soa_canete.web;

import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryRequestDto;
import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryResponseDto;
import com.soa.canete.funcionary_soa_canete.repository.FuncionaryRepository;
import com.soa.canete.funcionary_soa_canete.service.FuncionaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RequestMapping("/api/funcionaryData")
@RequiredArgsConstructor
public class FuncionaryController {

    final FuncionaryService funcionaryService;

    final FuncionaryRepository funcionaryRepository;

    @GetMapping("{id_funcionary}")
    public Mono<FuncionaryResponseDto> getDataFuncionaryById(@PathVariable Integer id_funcionary) {
        return this.funcionaryService.findById(id_funcionary);
    }

    @GetMapping("/listData")
    public Flux<FuncionaryResponseDto> getDataFuncionaryComplete() {
        return this.funcionaryService.findAll();
    }

    @GetMapping("/listData/active")
    public Flux<FuncionaryResponseDto> getDataFuncionaryActive() {
        return this.funcionaryService.findAllActive();
    }

    @GetMapping("/listData/inactive")
    public Flux<FuncionaryResponseDto> getDataFuncionaryInactive() {
        return this.funcionaryService.findAllInactive();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Mono<FuncionaryResponseDto> saveNewDataFuncionary(@RequestBody FuncionaryRequestDto dto) {
        return this.funcionaryService.saveNewLegalGuardian(dto);
    }

    @PutMapping("/{id_funcionary}")
    public Mono<FuncionaryResponseDto> updateDataFuncionary(@RequestBody FuncionaryRequestDto dto, @PathVariable Integer id_funcionary) {
        return this.funcionaryService.updateLegalGuardian(dto, id_funcionary);
    }

    @PatchMapping("/deleteLogical/{id_funcionary}")
    public Mono<FuncionaryResponseDto> deleteLogicalFuncionary(@PathVariable Integer id_funcionary) {
        return this.funcionaryService.deleteLogicalLegalGuardian(id_funcionary);
    }

    @PatchMapping("/reactiveLogical/{id_funcionary}")
    public Mono<FuncionaryResponseDto> reactiveLogicalFuncionary(@PathVariable Integer id_funcionary) {
        return this.funcionaryService.reactiveLogicalLegalGuardian(id_funcionary);
    }

    @DeleteMapping("/{id_funcionary}")
    public Mono<Void> deleteTotalFuncionary(@PathVariable Integer id_funcionary) {
        return this.funcionaryService.deleteLegalGuardian(id_funcionary);
    }

}
