package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Program;
import com.commitee.commitee.Entities.Role;
import com.commitee.commitee.Services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/programs")
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Program>> getAllPrograms() {
        List<Program> programs = programService.getAllPrograms();
        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Program> createProgram(@RequestBody Program program) {
        Program savedProgram = programService.saveProgram(program);
        return new ResponseEntity<>(savedProgram, HttpStatus.CREATED);
    }
}
