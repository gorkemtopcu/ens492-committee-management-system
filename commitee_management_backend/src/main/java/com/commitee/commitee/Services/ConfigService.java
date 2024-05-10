package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Config;
import com.commitee.commitee.Repositories.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfigService {
    private final ConfigRepository configRepository;

    @Autowired
    public ConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public Config saveConfig(Config config) {
        return configRepository.save(config);
    }

    public List<Config> getAllConfigs() {
        return configRepository.findAll();
    }

    // Other methods for retrieving, updating, and deleting configs can be added here
}
