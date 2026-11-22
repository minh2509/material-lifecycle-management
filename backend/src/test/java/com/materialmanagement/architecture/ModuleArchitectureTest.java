package com.materialmanagement.architecture;

import static org.assertj.core.api.Assertions.assertThat;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.materialmanagement.MaterialManagementApplication;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

class ModuleArchitectureTest {
    @Test
    void discoversBusinessModulesAndVerifiesTheirBoundaries() {
        var previousStrategy = System.getProperty("spring.modulith.detection-strategy");
        System.setProperty("spring.modulith.detection-strategy", "explicitly-annotated");
        try {
            var modules = ApplicationModules.of(MaterialManagementApplication.class);
            assertThat(modules.stream().map(module -> module.getIdentifier().toString()))
                    .containsExactlyInAnyOrder("identity", "organization", "material", "warehouse", "inventory",
                            "procurement", "receiving", "issuing", "recovery", "disposal", "stocktaking", "reporting");
            modules.verify();
        } finally {
            if (previousStrategy == null) {
                System.clearProperty("spring.modulith.detection-strategy");
            } else {
                System.setProperty("spring.modulith.detection-strategy", previousStrategy);
            }
        }
    }

    @Test
    void businessModulesDoNotDependOnApplicationConfiguration() {
        var classes = new ClassFileImporter().withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
                .importPackages("com.materialmanagement");
        noClasses().that().resideInAPackage("..modules..")
                .should().dependOnClassesThat().resideInAPackage("..config..")
                .check(classes);
    }

    @Test
    void controllersAndRepositoriesKeepTheirResponsibilitiesSeparate() {
        var classes = new ClassFileImporter().withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
                .importPackages("com.materialmanagement");
        noClasses().that().resideInAPackage("..controller..")
                .should().dependOnClassesThat().resideInAPackage("..repository..")
                .allowEmptyShould(true).check(classes);
        noClasses().that().resideInAPackage("..repository..")
                .should().dependOnClassesThat().resideInAnyPackage("..controller..", "..service..")
                .allowEmptyShould(true).check(classes);
        noClasses().that().resideInAPackage("..service..")
                .should().dependOnClassesThat().resideInAPackage("..controller..")
                .allowEmptyShould(true).check(classes);
    }
}
