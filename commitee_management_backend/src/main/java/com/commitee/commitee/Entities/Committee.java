package com.commitee.commitee.Entities;

import com.commitee.commitee.Entities.CommitteeCategory;
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
@Table(name = "committees")
public class Committee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "committee")
    private String committee;

    @Column(name = "category")
    private Integer category;

    @Column(name = "about", columnDefinition = "TEXT")
    private String about;

    @Column(name = "email_list_address")
    private String emailListAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
