package com.commitee.commitee.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assigment")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "committee", nullable = false)
    private int committee;

    @Column(name = "member")
    private Integer member;

    @Column(name = "term")
    private Integer term;

    @Column(name = "role")
    private Integer role;

    @Column(name = "programs", columnDefinition = "json")
    private String programs;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;


}