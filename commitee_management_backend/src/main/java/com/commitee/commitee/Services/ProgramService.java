package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Program;
import com.commitee.commitee.Repositories.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    @Autowired
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<Program> getAll() {
        return programRepository.findAll();
    }

    public Program save(Program program) {
        return programRepository.save(program);
    }


}
