package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.group9.ponte_de_geracoes.model.HelpSession;

public interface HelpSessionRepository extends JpaRepository<HelpSession, Long> {
    @NonNull
    Page<HelpSession> findAll(@NonNull Pageable pageable);
}
