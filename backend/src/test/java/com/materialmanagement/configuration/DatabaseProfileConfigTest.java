package com.materialmanagement.configuration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalStateException;

import com.materialmanagement.config.DatabaseProfileConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.ConfigDataApplicationContextInitializer;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.mock.env.MockEnvironment;

class DatabaseProfileConfigTest {
    @Test
    void rejectsCombiningLocalAndPostgresProfiles() {
        var environment = new MockEnvironment();
        environment.setActiveProfiles("local", "postgres");
        assertThatIllegalStateException().isThrownBy(() -> new DatabaseProfileConfig(environment));
    }

    @Test
    void postgresConfigurationKeepsPersistenceEnabledAndDocumentationClosed() {
        new ApplicationContextRunner()
                .withInitializer(new ConfigDataApplicationContextInitializer())
                .withPropertyValues("spring.profiles.active=postgres",
                        "DB_URL=jdbc:postgresql://127.0.0.1:5432/config_test_only",
                        "DB_USERNAME=config_test_only", "DB_PASSWORD=config_test_only")
                .run(context -> {
                    var environment = context.getEnvironment();
                    assertThat(environment.getProperty("spring.autoconfigure.exclude")).isNull();
                    assertThat(environment.getProperty("spring.jpa.hibernate.ddl-auto")).isEqualTo("validate");
                    assertThat(environment.getProperty("spring.jpa.open-in-view", Boolean.class)).isFalse();
                    assertThat(environment.getProperty("springdoc.api-docs.enabled", Boolean.class)).isFalse();
                    assertThat(environment.getProperty("spring.flyway.clean-disabled", Boolean.class)).isTrue();
                    assertThat(environment.getProperty("spring.datasource.url"))
                            .isEqualTo("jdbc:postgresql://127.0.0.1:5432/config_test_only");
                });
    }
}
