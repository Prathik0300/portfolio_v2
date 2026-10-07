import type { Project } from "../types";

export const programRepair: Project = {
  slug: "automated-program-repair-llm",
  file: "program-repair",
  name: "Automated program repair with an LLM",
  seoTitle: "Automated program repair with an LLM",
  blurb: "Gives an LLM the crashing input and stack trace along with the code. It fixed 11 of 13 programs.",
  description:
    "Research on repairing crashes in C/C++ with an LLM, using AFL fuzzing and GDB stack traces as context. Fixes rose from 38% with code alone to 85% with runtime evidence.",
  date: "2024-12",
  dateLabel: "Sep – Dec 2024",
  where: "University of Illinois Chicago (research project)",
  role: "Researcher, paper author",
  glance: {
    problem: "An LLM reads code but cannot see what the program does when it runs, which matters for crashes like buffer overflows.",
    built: "A pipeline that fuzzes the program with AFL, collects GDB stack traces, and gives the LLM the code plus the crashing inputs and traces.",
    result: "11 of 13 programs fixed (85%), up from 5 of 13 (38%) with code alone, in half the attempts.",
  },
  stack: ["Python", "AFL / AFL++", "GDB", "GPT-4o mini", "C / C++"],
  links: [
    { label: "paper", url: "https://www.academia.edu/144366072/Integrating_Coverage_Guided_Fuzzing_and_LLM_Reasoning_for_Automated_Repair_of_Crash_Inducing_Bugs?source=swp_share" },
  ],
  sections: [
    {
      title: "The question",
      blocks: [
        {
          type: "p",
          text: "LLMs read code well, but they can't see what a program does when it runs. For bugs like buffer overflows, it matters a lot which input crashes the program and where it crashes. I wanted to know how much that runtime evidence helps a model fix the crash.",
        },
        {
          type: "callout",
          text: "The idea: use fuzzing to find crashes and GDB to locate them, then hand the model that evidence along with the code.",
        },
      ],
    },
    {
      title: "The pipeline",
      subtitle: "Six steps, then a loop",
      blocks: [
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/program-repair-pipeline.svg",
          alt: "Program repair pipeline: strip comments, LLM writes a seed script, AFL fuzzing finds and shrinks crashing inputs, GDB collects stack traces, the LLM writes a patch, then the patch is compiled, tested and scored, looping back if it is not fixed",
          width: 960,
          height: 440,
          caption: "The repair pipeline. Purple steps use the LLM, green steps run tools on the program.",
        },
        {
          type: "steps",
          items: [
            "Strip the comments from the source so the model can't lean on human hints. In later rounds the model's own comments stay in, as its memory of what it tried.",
            "Have the LLM write a script that generates valid starting inputs for the fuzzer, and note whether the program reads stdin or a file.",
            "Run AFL or AFL++ to find crashing inputs, then shrink each one to a minimal input with afl-tmin.",
            "Collect a stack trace for each crash with GDB. Deduplicate them with an FNV-1a hash and keep the five most representative.",
            "Give the model the code, the minimized crashing inputs and the traces, and ask for a patch.",
            "Compile and test each patch and score it: does it compile, does the crash go away, do the tests pass, and how much did it change. Loop, with the model remembering earlier attempts.",
          ],
        },
      ],
    },
    {
      title: "Results",
      subtitle: "Three ways of prompting, same 13 programs",
      blocks: [
        {
          type: "p",
          text: "I tested on 13 crashing C programs: 10 that I wrote and 3 from AFL's demos. I compared giving the model the code only, the code plus stack traces, and the code plus stack traces and crashing inputs.",
        },
        {
          type: "facts",
          items: [
            { value: "38%", label: "fixed, code only" },
            { value: "69%", label: "fixed, with stack traces" },
            { value: "85%", label: "fixed, with traces and crashing inputs" },
          ],
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/program-repair-results.svg",
          alt: "Bar charts: share of 13 programs fixed rose from 38 to 69 to 85 percent, and median attempts fell from 4 to 3 to 2",
          width: 960,
          height: 410,
          caption: "Fix rate and median attempts for each prompt.",
        },
        {
          type: "list",
          items: [
            "Code only: 5 of 13 fixed (38%), median 4 attempts.",
            "Code plus stack traces: 9 of 13 (69%), median 3 attempts.",
            "Code plus stack traces and crashing inputs: 11 of 13 (85%), median 2 attempts.",
          ],
        },
        { type: "callout", text: "Runtime evidence roughly doubled the fix rate and halved the attempts needed." },
      ],
    },
    {
      title: "Next",
      blocks: [
        {
          type: "list",
          items: [
            "Programs that span several files.",
            "Symbolic execution for better fault localization.",
            "The SARD and Juliet benchmarks.",
            "Parallel fuzzing, to find crashes faster.",
          ],
        },
      ],
    },
  ],
};
