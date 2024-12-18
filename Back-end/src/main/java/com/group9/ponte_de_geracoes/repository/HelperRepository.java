package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.group9.ponte_de_geracoes.model.Helper;

public interface HelperRepository extends JpaRepository<Helper, Long> {
    @NonNull
    Page<Helper> findAll(@NonNull Pageable pageable);
    Page<Helper> findByIsAvailable(boolean isAvailable, Pageable pageable);
    Page<Helper> findByAddress_CityAndIsAvailable(String city, boolean isAvailable, Pageable pageable);
    Page<Helper> findByAddress_City(String city, Pageable pageable);
    Page<Helper> findByAvailableDaysContainsAndIsAvailable(String day, boolean isAvailable, Pageable pageable);

}
