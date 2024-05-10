package com.commitee.commitee.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "members")
public class Member {
    @Id
    @Column(name = "suid")
    private Integer suid;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "program")
    private String program;

    @Column(name = "exclude")
    private Boolean exclude;

    @Column(name = "active")
    private Boolean active;

    // Constructors, getters, and setters
    // Omitted for brevity
}
