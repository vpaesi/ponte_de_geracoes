package com.group9.ponte_de_geracoes.repository;

import com.group9.ponte_de_geracoes.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @NonNull
    Page<User> findAll(@NonNull Pageable pageable);
    
    Page<User> findByUserType(String userType, Pageable pageable);
    Page<User> findByUserTypeAndIsAvailable(String userType, boolean isAvailable, Pageable pageable);
    Page<User> findByUserTypeAndAddress_City(String userType, String city, Pageable pageable);
    Page<User> findByUserTypeAndAddress_CityAndIsAvailable(String userType, String city, boolean isAvailable, Pageable pageable);
    Page<User> findByUserTypeAndAvailableDaysContainsAndIsAvailable(String userType, String day, boolean isAvailable, Pageable pageable);
}