package com.group9.ponte_de_geracoes.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("assisted")
public class Assisted extends User {
    
    public Assisted() {
        super();
        this.setUserType("assisted");
    }
}
