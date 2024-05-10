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
@Table(name = "programs")
public class Program {
    @Id
    @Column(name = "program", nullable = false)
    private String program;

    @Column(name = "program_full")
    private String programFull;

}
