package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Config;
import com.commitee.commitee.Services.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/config")
public class ConfigController {
    private final ConfigService configService;

    @Autowired
    public ConfigController(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Config>> getAllConfigs() {
        List<Config> configs = configService.getAllConfigs();
        return new ResponseEntity<>(configs, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Config> createConfig(@RequestBody Config config) {
        Config savedConfig = configService.saveConfig(config);
        return new ResponseEntity<>(savedConfig, HttpStatus.CREATED);
    }
}
