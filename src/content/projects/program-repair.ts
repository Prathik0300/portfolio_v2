import type { ProjectItem } from "../types";

export const programRepair: ProjectItem = {
  name: "Automated Program Repair Using LLM",
  slug: "automated-program-repair-llm",
  blurb:
    "Feeds AFL++ crash inputs and GDB stack traces into an LLM repair loop. Execution context took repair success from 38% to 85%.",
  featured: true,
  badge: "Research \u00b7 UIC",
  badgeTone: "faint",
  outcomes: [
    { value: "38 \u2192 85%", label: "repair success" },
    { value: "4 \u2192 2", label: "median attempts" },
    { value: "11 / 13", label: "programs fixed" },
  ],
  description:
    "An LLM-powered bug-fixing pipeline that integrates coverage-guided fuzzing (AFL/AFL++) and runtime stack traces (GDB) with LLM reasoning to automatically repair crash-inducing defects in C/C++ programs.",
  techStack: [
    "Python",
    "AFL/AFL++",
    "GDB",
    "LLMs",
    "GPT-4o mini",
    "C/C++",
    "Fuzzing",
    "Automated Program Repair",
  ],
  detailSubtitle:
    "Integrating Coverage-Guided Fuzzing and LLM Reasoning for Automated Repair of Crash-Inducing Bugs",
  detailDateRange: "Sept 2024 - Dec 2024",
  detailOrganization: {
    name: "University of Illinois Chicago",
  },
  detailAssociation: "Associated with University of Illinois Chicago",
  detailProjectType: "Research Project | Automated Program Repair",
  detailTechStack:
    "Python · AFL/AFL++ · GDB · GPT-4o mini · C/C++ · Fuzzing · Stack Trace Analysis · FNV-1a Hashing · Patch Scoring",
  detailOverview:
    "An automated repair pipeline that combines AFL/AFL++ fuzzing, GDB stack traces, and LLM reasoning to fix crash-inducing bugs in C/C++ programs. The system achieves 85% success rate (11/13 programs) by providing LLMs with concrete execution context—minimized crash inputs and stack traces—rather than code alone.",
  detailProblem:
    "LLMs can reason about code but lack execution context. Traditional repair methods struggle with runtime defects like buffer overflows that need precise crash-triggering inputs and stack traces for accurate localization.",
  detailMotivation:
    "By combining fuzzing to discover crashes, GDB to extract stack traces, and LLM reasoning with execution context, we create an execution-aware repair loop that significantly improves bug localization and repair accuracy.",
  detailSolution:
    "A five-stage pipeline: (1) preprocess code to remove hints, (2) generate seed inputs via LLM, (3) fuzz with AFL to discover and minimize crashes, (4) extract stack traces with GDB, (5) iteratively repair with LLM using execution context. Crash deduplication and patch scoring optimize the process.",
  detailSolutionPoints: [
    "Fuzzing & Crash Discovery – AFL mutates inputs to find crashes, then minimizes them to create focused test cases that capture exact failure conditions.",
    "Stack Trace Extraction – GDB extracts execution paths for each crash, with FNV-1a hashing to deduplicate and preserve only unique failure signatures.",
    "Execution-Aware Prompting – LLM receives sanitized code, minimized crash inputs, and stack traces (not just code), enabling precise bug localization.",
    "Iterative Repair Loop – Each patch is compiled and tested. The model refines repairs across iterations, with persistent memory of previous attempts.",
    "Patch Scoring – Ranks candidates by compilation success, crash elimination, test passing, and edit distance to select optimal fixes.",
  ],
  detailDesignProcessSteps: [
    {
      id: "preprocessing",
      title: "Preprocessing",
      subtitle: "Clean code baseline",
      paragraphs: [
        "Strips comments and annotations to force the LLM to reason from code structure and execution evidence alone. In later iterations, the model's own comments are retained as self-generated memory.",
      ],
      bullets: [
        "Removes human-written hints before first repair attempt",
        "Retains LLM-generated comments in subsequent cycles for memory",
      ],
      summary:
        "Preprocessing creates a clean baseline by removing hints, then builds memory by retaining the model's own comments across iterations.",
    },
    {
      id: "input-generation",
      title: "Seed Input Generation",
      subtitle: "LLM creates fuzzing seeds",
      paragraphs: [
        "The LLM writes Python scripts to generate syntactically valid seed inputs for AFL. This automates seed creation and ensures the fuzzer starts with diverse test cases that exercise different code paths.",
      ],
      bullets: [
        "LLM generates Python scripts for seed input creation",
        "Identifies input method (stdin vs. file) for AFL configuration",
        "Populates AFL seed corpus automatically",
      ],
      summary:
        "Automates seed input generation, giving AFL high-quality starting points for efficient crash discovery.",
    },
    {
      id: "fuzzing",
      title: "Fuzzing & Crash Discovery",
      subtitle: "AFL finds and minimizes crashes",
      paragraphs: [
        "AFL performs coverage-guided fuzzing, mutating inputs to explore execution paths and discover crashes. When crashes occur, afl-tmin shrinks inputs while keeping them reproducible. These minimized inputs become focused test cases that show exactly what triggers the bug.",
      ],
      bullets: [
        "Coverage-guided mutation explores new execution paths",
        "Minimizes crash inputs to capture exact failure conditions",
        "Provides concrete examples for LLM repair",
      ],
      summary:
        "Fuzzing discovers crashes and minimizes inputs to create precise test cases that help the LLM understand and fix the bug.",
    },
    {
      id: "stacktrace-collection",
      title: "Stack Trace Extraction",
      subtitle: "GDB identifies fault location",
      paragraphs: [
        "GDB extracts stack traces for each crash, showing the execution path that led to failure. FNV-1a hashing deduplicates crashes, preserving only the five most representative traces. This pinpoints the exact function and line where the bug occurs.",
      ],
      bullets: [
        "Extracts execution paths via GDB batch mode",
        "Deduplicates using FNV-1a hashing to preserve unique signatures",
        "Identifies exact function and line of failure",
      ],
      summary:
        "Stack traces provide precise fault localization, showing where crashes occur so the LLM can target repairs accurately.",
    },
    {
      id: "llm-repair",
      title: "LLM Repair",
      subtitle: "Execution-aware iterative fixing",
      paragraphs: [
        "The LLM receives code, crash inputs, and stack traces—not just code. It generates patches that are compiled and tested iteratively. Execution context (traces + crashes) improves success from 38% (code-only) to 85% (+traces+crashes) with fewer attempts.",
      ],
      bullets: [
        "Structured prompt includes code, crash inputs, and stack traces",
        "Iterative compilation and testing validates each patch",
        "85% success rate with execution context vs 38% without",
      ],
      summary:
        "Execution-aware prompting with concrete crash data enables precise bug localization and repair, achieving 85% success rate.",
    },
    {
      id: "evaluation-results",
      title: "Results",
      subtitle: "Execution context improves repair",
      paragraphs: [
        "Tested on 13 crash-inducing programs. Results: code-only (38% success, 4 attempts), +traces (69%, 3 attempts), +traces+crashes (85%, 2 attempts). Execution context cuts attempts in half and doubles success rate.",
      ],
      bullets: [
        "13 programs tested: 10 synthetic + 3 from AFL demos",
        "Best: 85% success with 2 median attempts (+traces+crashes)",
        "Baseline: 38% success with 4 median attempts (code-only)",
        "11 of 13 programs fixed within 3 iterations",
      ],
      summary:
        "Execution-aware prompting doubles success rate (38% → 85%) and halves repair attempts, proving execution context is essential for automated repair.",
    },
  ],
  detailHighlights: [
    "85% Success Rate – 11 of 13 programs fixed within 3 iterations",
    "Execution-Aware Prompting – Crash inputs + stack traces improve repair from 38% to 85%",
    "Iterative Repair Loop – Persistent memory across iterations refines patches",
    "Crash Deduplication – FNV-1a hashing preserves unique failure signatures",
    "Model-Agnostic – Works with various LLM backends",
  ],
  detailReflectionOutcomes:
    "Execution-aware prompting doubles repair success (38% → 85%) and halves attempts needed. Key insight: LLMs need concrete execution context (crashes + traces), not just code. The pipeline demonstrates that combining fuzzing, debugging, and LLM reasoning creates a practical solution for automated repair of runtime defects.",
  detailReflectionMoreTime:
    "Future work: extend to multi-file projects, integrate symbolic execution for richer fault localization, evaluate on SARD/Juliet benchmarks, and explore parallel fuzzing for faster crash discovery.",
  detailLinks: [
    {
      label: "Paper",
      url: "https://www.academia.edu/144366072/Integrating_Coverage_Guided_Fuzzing_and_LLM_Reasoning_for_Automated_Repair_of_Crash_Inducing_Bugs?source=swp_share",
      icon: "paper",
    },
  ],
};
