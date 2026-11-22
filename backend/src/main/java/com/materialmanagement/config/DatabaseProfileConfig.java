package com.materialmanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

@Configuration(proxyBeanMethods = false)
@Profile("postgres")
public class DatabaseProfileConfig {
    public DatabaseProfileConfig(Environment environment) {
        if (environment.acceptsProfiles(Profiles.of("local"))) {
            throw new IllegalStateException("Use postgres without local; local disables persistence auto-configuration.");
        }
    }
}
