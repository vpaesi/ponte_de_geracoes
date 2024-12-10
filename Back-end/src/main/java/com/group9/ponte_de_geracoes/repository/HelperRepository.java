package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group9.ponte_de_geracoes.model.Helper;

public interface HelperRepository extends JpaRepository<Helper, Long> {
    
}
