package com.soa.canete.funcionary_soa_canete.domain.mapper;

import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryRequestDto;
import com.soa.canete.funcionary_soa_canete.domain.dto.FuncionaryResponseDto;
import com.soa.canete.funcionary_soa_canete.domain.model.Funcionary;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FuncionaryMapper {

    public static Funcionary toModel(FuncionaryRequestDto dto) {
        return new Funcionary(
                dto.getName(),
                dto.getSurnamefather(),
                dto.getSurnamemother(),
                dto.getDni(),
                dto.getPhonenumber(),
                dto.getRank(),
                dto.getDepartment(),
                dto.getAddress(),
                dto.getEmail(),
                dto.getEstado()
        );
    }

    public static Funcionary toModel(FuncionaryRequestDto dto, Integer id_funcionary) {
        return new Funcionary(
                id_funcionary,
                dto.getName(),
                dto.getSurnamefather(),
                dto.getSurnamemother(),
                dto.getDni(),
                dto.getPhonenumber(),
                dto.getRank(),
                dto.getDepartment(),
                dto.getAddress(),
                dto.getEmail(),
                dto.getEstado()
        );
    }

    public static FuncionaryResponseDto toDto(Funcionary model) {
        return new FuncionaryResponseDto(
                model.getId_funcionary(),
                model.getName(),
                model.getSurnamefather(),
                model.getSurnamemother(),
                model.getDni(),
                model.getPhonenumber(),
                model.getRank(),
                model.getDepartment(),
                model.getAddress(),
                model.getEmail(),
                model.getEstado()
        );
    }

}
