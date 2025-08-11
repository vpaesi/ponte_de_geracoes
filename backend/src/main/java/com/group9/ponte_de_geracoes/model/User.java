package com.group9.ponte_de_geracoes.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, name = "tipo_usuario")
    private String userType;

    @Column(nullable = false, name = "nome")
    private String name;

    @Column(nullable = false, name = "data_nascimento")
    private LocalDate birthDate;

    @Column(nullable = false, unique = true, length = 11, name = "cpf")
    private String cpf;

    @Column(nullable = false, unique = true, length = 100, name = "email")
    private String email;

    @Column(nullable = false, unique = true, length = 15, name = "telefone")
    private String phone;

    @Column(nullable = false, name = "senha")
    private String password;

    @Column(nullable = false, name = "confirmacao_senha")
    private String confirmPassword;

    @Column(nullable = false, name = "disponibilidade")
    private boolean isAvailable;

    @Column(name = "imagem_perfil")
    private String profileImageUrl;

    @ElementCollection
    @Column(name = "dias_disponiveis")
    private List<String> availableDays;

    @ElementCollection
    @Column(name = "necessidades_habilidades")
    private List<String> needsAndSkills;

    @Column(name = "sobre_voce")
    private String aboutYou;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
}
