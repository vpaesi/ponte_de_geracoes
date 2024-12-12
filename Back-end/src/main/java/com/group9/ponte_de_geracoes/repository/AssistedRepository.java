package com.group9.ponte_de_geracoes.repository;

import com.group9.ponte_de_geracoes.model.Assisted;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface AssistedRepository extends JpaRepository<Assisted, Long> {
    @NonNull
    Page<Assisted> findAll(@NonNull Pageable pageable);
    Page<Assisted> findByNeedsHelp(boolean needsHelp, Pageable pageable);
    Page<Assisted> findByAddress_CityAndNeedsHelp(String city, boolean needsHelp, Pageable pageable);
    Page<Assisted> findByAvailableDaysContainsAndNeedsHelp(String day, boolean needsHelp, Pageable pageable);
}