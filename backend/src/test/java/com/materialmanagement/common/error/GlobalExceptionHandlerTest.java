package com.materialmanagement.common.error;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

class GlobalExceptionHandlerTest {
    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(new ProbeController())
                .setControllerAdvice(new GlobalExceptionHandler()).build();
    }

    @Test
    void validationProducesProblemDetailWithoutEchoingRejectedInput() throws Exception {
        var result = mvc.perform(post("/probe").contentType(MediaType.APPLICATION_JSON).content("""
                {"name":""}
                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.errors[0].field").value("name"))
                .andReturn();
        assertThat(result.getResponse().getContentAsString()).doesNotContain("rejectedValue", "NotBlank");
    }

    @Test
    void malformedJsonIsAClientError() throws Exception {
        mvc.perform(post("/probe").contentType(MediaType.APPLICATION_JSON).content("{"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
    }

    @Test
    void unexpectedFailureDoesNotExposeInternalExceptionMessage() throws Exception {
        var result = mvc.perform(get("/probe/failure")).andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500)).andReturn();
        assertThat(result.getResponse().getContentAsString()).doesNotContain("internal-diagnostic-marker", "IllegalStateException");
    }

    @RestController
    static class ProbeController {
        @PostMapping("/probe")
        ProbeRequest create(@Valid @RequestBody ProbeRequest request) { return request; }

        @GetMapping("/probe/failure")
        void fail() { throw new IllegalStateException("internal-diagnostic-marker"); }
    }

    record ProbeRequest(@NotBlank String name) { }
}
