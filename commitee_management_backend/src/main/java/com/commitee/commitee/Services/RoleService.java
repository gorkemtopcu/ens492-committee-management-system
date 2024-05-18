package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Role;
import com.commitee.commitee.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public Optional<Role> getById(Long id) {
        return roleRepository.findById(id);
    }

    // Other methods for retrieving, updating, and deleting roles can be added here
}