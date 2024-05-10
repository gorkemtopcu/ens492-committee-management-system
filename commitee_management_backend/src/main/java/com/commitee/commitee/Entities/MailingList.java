package com.commitee.commitee.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mailing_lists")
public class MailingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "member", length = 50)
    private String member;

    @Column(name = "member_email", nullable = false, length = 50)
    private String memberEmail;

    @Column(name = "list_email", nullable = false, length = 80)
    private String listEmail;

    @Column(name = "term", length = 10)
    private String term;
}
