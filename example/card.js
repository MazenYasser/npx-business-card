#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const boxen = require("boxen");
const chalkAnimation = require("chalk-animation");
const inquirer = require("inquirer");
const open = require("open");
const figlet = require("figlet");

// ── Color Palette ──────────────────────────────────────────
const accent  = chalk.hex("#C084FC");        // lavender-purple
const green   = chalk.green;                  // skills
const dim     = chalk.gray;                   // secondary text
const bold    = chalk.white.bold;             // name only
const label   = chalk.hex("#C084FC").bold;    // field labels
const pyBlue  = chalk.hex("#4B8BBE");         // Python blue
const pyGold  = chalk.hex("#FFE873");         // Python gold

// ── Links ──────────────────────────────────────────────────
const links = {
  github:   "https://github.com/MazenYasser",
  linkedin: "https://www.linkedin.com/in/mazen-yasser225/",
  email:    "mailto:mazenyasserx47@gmail.com",
};

// ── Big Name Banner (figlet ANSI Shadow) ───────────────────
const rawName =
  figlet.textSync("MAZEN",  { font: "ANSI Shadow" }).trimEnd() + "\n" +
  figlet.textSync("YASSER", { font: "ANSI Shadow" }).trimEnd();
const bigName = accent(rawName);

// ── Python Logo ────────────────────────────────────────────
const pythonLogo = [
  pyBlue("  ╭──────────────────╮    "),
  pyBlue("  │ ◉                │    "),
  pyBlue("  │                  ├──╮ "),
  pyBlue("  ╰──────────────────╯  │ "),
  pyGold("                     ╭──╯ "),
  pyGold("  ╭──────────────────╮    "),
  pyGold("  │                  │    "),
  pyGold("  │                ◉ │    "),
  pyGold("  ╰──────────────────╯    "),
].join("\n");

// ── Card Data ──────────────────────────────────────────────
const name     = bold("               Mazen Yasser");
const title    = accent("         Engineering Manager") + dim(" @ ") + accent("TJM Labs");
const prev     = dim("     prev. Lead Software Engineer @ TJM Labs");
const divider  = dim("     ─────────────────────────────────────");

const skills =
  label("    Skills") + dim(":  ") +
  green("Python")       + dim(" / ") +
  green("Django")       + dim(" / ") +
  green("FastAPI")      + dim(" / ") +
  green("AI Automations");

const github   = label("    GitHub") + dim(":  ") + dim("https://github.com/") + accent("MazenYasser");
const linkedin = label("  LinkedIn") + dim(":  ") + dim("linkedin.com/in/")    + accent("mazen-yasser225");
const email    = label("     Email") + dim(":  ") + accent("mazenyasserx47@gmail.com");
const website  = label("   Website") + dim(":  ") + accent("[coming soon]");
const footer   = dim("     Run ") + accent("npx mazenx47") + dim(" anytime to find me");

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

  // Animated intro
  const intro = chalkAnimation.neon(
    "\n     > Mazen Yasser — Engineering Manager @ TJM Labs\n",
    1.5
  );
  await sleep(1800);
  intro.stop();
  console.clear();

  // Big pixel name
  console.log(bigName);

  // whoami prompt + Python logo
  console.log(dim("  > ") + dim("whoami") + "\n");
  console.log(pythonLogo);
  console.log();

  // Card
  console.log(boxen(card, boxenOptions));

  // Interactive menu
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: accent("Curious? Pick an option:"),
      choices: [
        { name: `${accent(">")} Open ${bold("GitHub")} profile`,   value: "github"   },
        { name: `${accent(">")} Open ${bold("LinkedIn")} profile`, value: "linkedin" },
        { name: `${accent(">")} Send me an ${bold("Email")}`,      value: "email"    },
        { name: `${dim(">")} Exit`,                                 value: "exit"     },
      ],
    },
  ]);

  if (action !== "exit") {
    console.log(dim(`\n     Opening ${action}...\n`));
    await open(links[action]);
  }

  console.log(accent("\n     Thanks for stopping by!\n"));
}

main().catch(console.error);
