package com.group9.ponte_de_geracoes.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable // ✅ Apenas @Embeddable, NÃO @Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String zipCode;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String number;

    private String complement;
}