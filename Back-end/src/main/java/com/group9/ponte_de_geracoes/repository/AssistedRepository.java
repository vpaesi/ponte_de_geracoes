package com.group9.ponte_de_geracoes.repository;

import com.group9.ponte_de_geracoes.model.Assisted;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssistedRepository extends JpaRepository<Assisted, Long> {
    Page<Assisted> findAll(Pageable pageable);
}