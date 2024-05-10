package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.CommitteeCategory;
import com.commitee.commitee.Services.CommitteeCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/committee-categories")
public class CommitteeCategoryController {
    private final CommitteeCategoryService committeeCategoryService;

    @Autowired
    public CommitteeCategoryController(CommitteeCategoryService committeeCategoryService) {
        this.committeeCategoryService = committeeCategoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CommitteeCategory>> getAllCategories() {
        List<CommitteeCategory> categories = committeeCategoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CommitteeCategory> createCategory(@RequestBody CommitteeCategory category) {
        CommitteeCategory savedCategory = committeeCategoryService.saveCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

}
