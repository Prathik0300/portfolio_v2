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
      ],
    },
    {
      title: "The pipeline",
      blocks: [
        {
          type: "steps",
          items: [
            "Strip the comments from the source so the model can't lean on human hints.",
            "Have the LLM write a script that generates valid starting inputs for the fuzzer.",
            "Run AFL or AFL++ to find crashing inputs, then shrink each one to a minimal input.",
            "Collect a stack trace for each crash with GDB. Deduplicate them with an FNV-1a hash and keep the five most representative.",
            "Give the model the code, the minimized crashing inputs and the traces, and ask for a patch.",
            "Compile and test each patch and score it: does it compile, does the crash go away, do the tests pass, and how much did it change. Loop, with the model remembering earlier attempts.",
          ],
        },
      ],
    },
    {
      title: "Results",
      blocks: [
        {
          type: "p",
          text: "I tested on 13 crashing C programs: 10 that I wrote and 3 from AFL's demos.",
        },
        {
          type: "list",
          items: [
            "Code only: 5 of 13 fixed (38%), median 4 attempts.",
            "Code plus stack traces: 9 of 13 (69%), median 3 attempts.",
            "Code plus stack traces and crashing inputs: 11 of 13 (85%), median 2 attempts.",
          ],
        },
        { type: "p", text: "So the runtime evidence roughly doubled the fix rate and halved the attempts needed." },
      ],
    },
    {
      title: "Next",
      blocks: [
        { type: "p", text: "Programs that span several files, symbolic execution for better fault localization, the SARD and Juliet benchmarks, and parallel fuzzing." },
      ],
    },
  ],
};
