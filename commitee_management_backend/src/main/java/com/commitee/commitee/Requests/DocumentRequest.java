package com.commitee.commitee.Requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequest {
    private int suid;
    private String documentType;
    private String filePath;
    private LocalDateTime uploadDate;
}
