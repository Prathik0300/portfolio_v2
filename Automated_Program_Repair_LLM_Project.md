# Automated Program Repair using LLM - Project Summary

## Overview

This project presents a practical pipeline that integrates **coverage-guided fuzzing** (AFL/AFL++) and **runtime stack traces** (GDB) with **LLM-based repair** to target crash-inducing defects in C/C++ programs.

**Key Achievement**: The system repairs 11 of 13 crash-inducing programs within three iterations while remaining model-agnostic.

## Problem Statement

- Large Language Models (LLMs) can reason about code semantics and propose patches, but they often lack concrete execution context
- Many industrial failures are runtime defects (e.g., buffer overflows, use-after-free) that require precise, crash-triggering inputs and signals for localization
- Traditional APR methods are effective on logical faults but struggle with runtime defects

## System Architecture

The system combines three complementary techniques:
1. **Coverage-Guided Fuzzing** (AFL/AFL++)
2. **Symbolic Debugging** (GDB)
3. **Large Language Model Reasoning**

### Pipeline Stages

#### A. Preprocessing
- Strips comments and annotations from source code
- Ensures clean testing baseline
- Prevents LLM from drawing on non-essential hints during first repair attempt
- In subsequent cycles, comments introduced by the LLM are retained for self-generated memory

#### B. Input Generation via LLM
- Uses LLM to write a Python script that generates seed inputs for AFL
- Seeds initialize the fuzzer with syntactically valid and diverse test cases
- Identifies how the program receives data (stdin vs. input file)
- AFL treats `@` as stdin and `@@` as a file reference

#### C. Fuzzing with AFL
- Performs coverage-guided fuzzing on instrumented program
- AFL mutates inputs iteratively to explore new execution paths
- When a crash occurs, AFL applies `afl-tmin` utility to shrink the input file
- Minimized inputs act as focused test cases capturing exact failure conditions

#### D. GDB Stacktrace Collection
- For each distinct failure, GDB executes in batch mode to extract stack traces
- Only the **five most representative traces** are preserved (identified through stack-hash-based deduplication)
- Helps identify exact function and line of code where failure occurs
- Enables focused repair attempts on most relevant program portions

#### E. LLM-Based Repair
- LLM (e.g., GPT-4o mini) receives structured prompt containing:
  - Sanitized source code
  - Minimized crash inputs
  - Corresponding stack traces
- Model produces revised version of program to correct root cause
- Each candidate patch is compiled and tested
- Process iterates until crash is resolved or maximum iterations reached

## Technical Components

### 1. Crash Deduplication (Stack-Hash)
Uses FNV-1a 64-bit hashing to deduplicate crashes by hashing the backtrace:

```
H = FNV1a_64(⟨a₀, a₁, ..., aₖ⟩)
```

With FNV-1a 64-bit:
- Basis B = 14695981039346656037
- Prime p = 1099511628211

### 2. Patch Scoring and Metrics
Ranking function for candidate patches:

```
S(q) = w₁·𝟙{compiles} + w₂·min(1, Δcov(q)/C₀)
     + w₃·𝟙{no crash on crashers} + w₄·𝟙{tests pass}
     - w₅·edit(q)/E₀
```

Additional metrics:
- **Novelty**: `Novelty(q) = |B(q)\B_base| / |B_universe|`
- **Stability**: `Stability(q) = 1 - flaky_fails(q) / runs`

## Experimental Setup

### Dataset
- **13 total examples**: 10 synthetic (GPT-generated) + 3 from AFL demos on GitHub
- Synthetic programs labeled bug1 to bug10
- Two GPT-generated programs were unable to be fixed (highlighting limitations)

### Evaluation Conditions
Three prompting conditions compared:
1. **LLM-only**: Code only
2. **+Traces**: Code + GDB backtraces
3. **+Traces+Crashes**: Code + backtraces + minimized crashing inputs

## Results

### Performance Comparison

| Condition | Success Rate | Median Attempts | Median Time |
|-----------|--------------|-----------------|-------------|
| LLM-only | 5/13 (38%) | 4 | 36 min |
| +Traces | 9/13 (69%) | 3 | 41 min |
| +Traces+Crashes | **11/13 (85%)** | **2** | 44 min |

### Key Findings
- Adding fuzzer-minimized crashing inputs and stack traces to the prompt **improves repair reliability**
- Reduces the number of iterations required to obtain a valid patch
- **Best performance**: 11/13 success rate with 2 median attempts when using both traces and crashes

## Limitations

1. **Scope**: Limited to single-file targets
2. **Dataset bias**: Synthetic bugs may bias CWE coverage
3. **Semantic regressions**: Crash removal does not preclude semantic regressions
4. **Overhead**: AFL instrumentation adds overhead
5. **Complex bugs**: Certain classes of complex bugs remain challenging

## Recommendations

- Use containerized fuzzing for safety
- Follow responsible disclosure practices
- Consider increasing fuzz time and iterations for difficult cases

## Future Work

1. **Multi-file projects**: Extend to handle larger codebases
2. **Integration**: Combine with symbolic execution and taint analysis
3. **Richer scoring**: Enhanced patch evaluation metrics
4. **Evaluation**: Test on SARD/Juliet benchmarks
5. **Model-agnostic**: System remains compatible with various LLM backends

## Technologies Used

- **AFL/AFL++**: Coverage-guided fuzzing
- **GDB**: Stack trace collection and debugging
- **LLMs**: GPT-4o mini, GPT (o1) for dataset generation
- **Python**: Orchestration layer
- **C/C++**: Target languages

## Key Innovation

The integration of **execution-aware prompting** with fuzzing and debugging tools creates a feedback loop that provides LLMs with concrete execution context, significantly improving their ability to repair crash-inducing defects compared to code-only approaches.

## References

- Defects4J, ManyBugs/IntroClass, RunBugRun benchmarks
- AFL/AFL++ documentation and tools
- GDB debugging utilities
- FNV-1a hashing algorithm
- SARD/Juliet test suites for future evaluation
