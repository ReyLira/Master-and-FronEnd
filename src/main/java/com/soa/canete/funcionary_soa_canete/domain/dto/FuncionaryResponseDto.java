package com.soa.canete.funcionary_soa_canete.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class FuncionaryResponseDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 8222253670338491507L;

    @Id
    private Integer id_funcionary;
    @Column
    private String name;
    @Column
    private String surnamefather;
    @Column
    private String surnamemother;
    @Column
    private String dni;
    @Column
    private String phonenumber;
    @Column
    private String rank;
    @Column
    private String department;
    @Column
    private String address;
    @Column
    private String email;
    @Column
    private String estado ;
}
