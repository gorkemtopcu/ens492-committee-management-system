package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Group;
import com.commitee.commitee.Services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/groups")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.getAll();
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {
        Group savedGroup = groupService.save(group);
        return new ResponseEntity<>(savedGroup, HttpStatus.CREATED);
    }

}
