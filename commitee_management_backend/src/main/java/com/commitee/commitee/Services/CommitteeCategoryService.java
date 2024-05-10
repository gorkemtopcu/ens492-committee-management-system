package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.CommitteeCategory;
import com.commitee.commitee.Repositories.CommitteeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitteeCategoryService {
    private final CommitteeCategoryRepository committeeCategoryRepository;

    @Autowired
    public CommitteeCategoryService(CommitteeCategoryRepository committeeCategoryRepository) {
        this.committeeCategoryRepository = committeeCategoryRepository;
    }

    public List<CommitteeCategory> getAllCategories() {
        return committeeCategoryRepository.findAll();
    }

    public CommitteeCategory saveCategory(CommitteeCategory category) {
        return committeeCategoryRepository.save(category);
    }

    // Other methods for updating and deleting categories can be added here
}
