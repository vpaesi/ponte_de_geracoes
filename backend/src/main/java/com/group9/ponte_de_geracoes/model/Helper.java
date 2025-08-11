package com.group9.ponte_de_geracoes.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("helper")
public class Helper extends User {
    
    public Helper() {
        super();
        this.setUserType("helper");
    }
}
