#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const boxen = require("boxen");
const chalkAnimation = require("chalk-animation");
const inquirer = require("inquirer");
const open = require("open");

// ── Color Palette ──────────────────────────────────────────
const purple = chalk.hex("#C084FC");
const green = chalk.green;
const dim = chalk.gray;
const bold = chalk.white.bold;
const label = chalk.hex("#C084FC").bold;

// ── Links ──────────────────────────────────────────────────
const links = {
  github: "https://github.com/MazenYasser",
  linkedin: "https://www.linkedin.com/in/mazen-yasser225/",
  email: "mailto:mazenyasserx47@gmail.com",
};

// ── Card Data ──────────────────────────────────────────────
const name = bold("               Mazen Yasser");
const title = purple("         Engineering Manager") + dim(" @ ") + purple("TJM Labs");
const prev = dim("     prev. Lead Software Engineer @ TJM Labs");

const divider = dim("     ─────────────────────────────────────");

const skills =
  label("    Skills") +
  dim(":  ") +
  green("Python") +
  dim(" / ") +
  green("Django") +
  dim(" / ") +
  green("FastAPI") +
  dim(" / ") +
  green("AI Automations");

const github =
  label("    GitHub") +
  dim(":  ") +
  dim("https://github.com/") +
  purple("MazenYasser");

const linkedin =
  label("  LinkedIn") +
  dim(":  ") +
  dim("linkedin.com/in/") +
  purple("mazen-yasser225");

const email =
  label("     Email") +
  dim(":  ") +
  purple("mazenyasserx47@gmail.com");

const website = label("   Website") + dim(":  ") + purple("[coming soon]");

const footer =
  dim("     Run ") + purple("npx mazenx47") + dim(" anytime to find me");

// ── ASCII Art ──────────────────────────────────────────────
const ascii = purple(
  [
    "",
    "     ╔═══════════════════════════════════╗",
    "     ║  " + bold("> ") + dim("whoami") + "                          ║",
    "     ╚═══════════════════════════════════╝",
    "",
  ].join("\n")
);

// ── Card Assembly ──────────────────────────────────────────
const card = [
  "",
  name,
  "",
  title,
  prev,
  "",
  divider,
  "",
  skills,
  "",
  github,
  linkedin,
  email,
  website,
  "",
  divider,
  "",
  footer,
  "",
].join("\n");

const boxenOptions = {
  padding: 1,
  margin: { top: 0, right: 1, bottom: 1, left: 1 },
  borderStyle: "double",
  borderColor: "#C084FC",
};

// ── Helpers ────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main ───────────────────────────────────────────────────
async function main() {
  console.clear();

  // Phase 1: Animated intro
  const intro = chalkAnimation.neon(
    "\n     > Mazen Yasser — Engineering Manager @ TJM Labs\n",
    1.5
  );

  await sleep(1800);
  intro.stop();

  // Phase 2: ASCII header + card
  console.clear();
  console.log(ascii);
  console.log(boxen(card, boxenOptions));

  // Phase 3: Interactive menu
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: purple("Curious? Pick an option:"),
      choices: [
        {
          name: `${purple(">")} Open ${bold("GitHub")} profile`,
          value: "github",
        },
        {
          name: `${purple(">")} Open ${bold("LinkedIn")} profile`,
          value: "linkedin",
        },
        {
          name: `${purple(">")} Send me an ${bold("Email")}`,
          value: "email",
        },
        {
          name: `${dim(">")} Exit`,
          value: "exit",
        },
      ],
    },
  ]);

  if (action !== "exit") {
    console.log(dim(`\n     Opening ${action}...\n`));
    await open(links[action]);
  }

  console.log(purple("\n     Thanks for stopping by!\n"));
}

main().catch(console.error);
