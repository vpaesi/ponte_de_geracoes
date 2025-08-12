package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group9.ponte_de_geracoes.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Page<User> findByUserType(String userType, Pageable pageable);
    Page<User> findByUserTypeAndIsAvailable(String userType, Boolean isAvailable, Pageable pageable);
    Page<User> findByUserTypeAndAddress_City(String userType, String city, Pageable pageable);
    Page<User> findByUserTypeAndAddress_CityAndIsAvailable(String userType, String city, Boolean isAvailable, Pageable pageable);
    Page<User> findByUserTypeAndAvailableDaysContainsAndIsAvailable(String userType, String day, Boolean isAvailable, Pageable pageable);
    Page<User> findByIsAvailable(Boolean isAvailable, Pageable pageable);
    Page<User> findByAddress_City(String city, Pageable pageable);
    Page<User> findByAddress_CityAndIsAvailable(String city, Boolean isAvailable, Pageable pageable);
}