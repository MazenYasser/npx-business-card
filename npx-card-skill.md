---
name: npx-card
description: >
  Build and publish a personal npx terminal business card — a CLI tool others can run with npx and your package name.
  Use this skill when the user wants to create a terminal card, npx card, business card CLI, developer card,
  or wants to publish themselves to npm so people can discover them via the terminal. Also trigger when
  someone says "I want my own npx card like mazenx47" or "build me an npx business card".
  The card features a chalk-animation intro, a boxen double-border card with personal info, and an
  interactive inquirer menu to open links. Users can customize colors, animations, and layout.
  Reference example: run `npx mazenx47` to see a live card this skill produced.
---
# npx-card Skill
Help the user build and publish their own npx terminal business card — a Node.js CLI that anyone can
run with `npx <their-package-name>`. This is the same stack used by `mazenx47` on npm.
**Tech stack**: Node.js, chalk@^4, boxen@^5, chalk-animation@^1, inquirer@^8, open@^8 (all CommonJS).
---
## Step 1: Gather Details
Ask for the following (can be in one message):
1. **Full name**
2. **Current title & company**
3. **Previous role** (optional — "prev. X @ Y")
4. **Skills** (3–6 items shown as a comma-separated list)
5. **GitHub username**
6. **LinkedIn slug** (the part after `linkedin.com/in/`)
7. **Email address** (optional)
8. **Website URL** (optional — use `[coming soon]` if none)
9. **Desired npm package name** (what they want people to type after `npx`)
   - Remind them: check availability at https://www.npmjs.com/package/<name>
   - Warn: npm blocks names too similar to existing packages
---
## Step 2: Generate the Files
### `package.json`
```json
{
  "name": "<package-name>",
  "version": "1.0.0",
  "description": "<Name>'s developer card — run `npx <package-name>` in your terminal",
  "main": "card.js",
  "bin": {
    "<package-name>": "card.js"
  },
  "scripts": {
    "start": "node card.js"
  },
  "keywords": ["cli", "business-card", "developer", "npx", "terminal"],
  "author": "<Name>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<github-username>/<repo>.git"
  },
  "engines": {
    "node": ">=14"
  },
  "dependencies": {
    "boxen": "^5.1.2",
    "chalk": "^4.1.2",
    "chalk-animation": "^1.6.0",
    "inquirer": "^8.2.6",
    "open": "^8.4.2"
  }
}
```
**Critical rules for package.json:**
- `bin` must be an object (not a string). Value must be `"card.js"` — no `./` prefix.
- No `"type": "module"` — all deps are CommonJS only.
### `card.js`
Generate using this template, filling in user's details:
```javascript
#!/usr/bin/env node
"use strict";
const chalk = require("chalk");
const boxen = require("boxen");
const chalkAnimation = require("chalk-animation");
const inquirer = require("inquirer");
const open = require("open");
// ── Color Palette ──────────────────────────────────────────
const accent = chalk.hex("#C084FC");       // primary: lavender-purple
const green = chalk.green;                  // skills
const dim = chalk.gray;                     // secondary text
const bold = chalk.white.bold;              // name only
const label = chalk.hex("#C084FC").bold;    // field labels
// ── Links ──────────────────────────────────────────────────
const links = {
  github: "https://github.com/<GitHubUsername>",
  linkedin: "https://www.linkedin.com/in/<LinkedInSlug>/",
  email: "mailto:<email>",           // remove if no email
};
// ── Card Data ──────────────────────────────────────────────
const name     = bold("               <Full Name>");
const title    = accent("         <Title>") + dim(" @ ") + accent("<Company>");
const prev     = dim("     prev. <PrevRole> @ <PrevCompany>");  // remove line if unused
const divider  = dim("     ─────────────────────────────────────");
const skills =
  label("    Skills") + dim(":  ") +
  green("<Skill1>") + dim(" / ") +
  green("<Skill2>") + dim(" / ") +
  green("<Skill3>");
const github   = label("    GitHub") + dim(":  ") + dim("https://github.com/") + accent("<GitHubUsername>");
const linkedin = label("  LinkedIn") + dim(":  ") + dim("linkedin.com/in/") + accent("<LinkedInSlug>");
const email    = label("     Email") + dim(":  ") + accent("<email>");         // remove if no email
const website  = label("   Website") + dim(":  ") + accent("<website or [coming soon]>");
const footer   = dim("     Run ") + accent("npx <package-name>") + dim(" anytime to find me");
// ── ASCII Art ──────────────────────────────────────────────
const ascii = accent(
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
  prev,          // remove if no previous role
  "",
  divider,
  "",
  skills,
  "",
  github,
  linkedin,
  email,         // remove if no email
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
  const intro = chalkAnimation.neon(
    "\n     > <Name> — <Title> @ <Company>\n",
    1.5
  );
  await sleep(1800);
  intro.stop();
  console.clear();
  console.log(ascii);
  console.log(boxen(card, boxenOptions));
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: accent("Curious? Pick an option:"),
      choices: [
        { name: `${accent(">")} Open ${bold("GitHub")} profile`,   value: "github" },
        { name: `${accent(">")} Open ${bold("LinkedIn")} profile`, value: "linkedin" },
        { name: `${accent(">")} Send me an ${bold("Email")}`,      value: "email" },  // remove if no email
        { name: `${dim(">")} Exit`,                                 value: "exit" },
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
```
After writing the files, run:
```bash
npm install
node card.js
```
---
## Step 3: Preview
Ask the user to run `node card.js` to preview. If they share the output or confirm it looks good, move to customization.
---
## Step 4: Offer Customization
After the card is generated, proactively ask:
> "Your card is ready! Want to customize anything? I can change:
> - **Color** — current accent is lavender-purple (`#C084FC`)
> - **Animation** — current style is `neon` (options: `rainbow`, `pulse`, `glitch`, `radar`, `neon`)
> - **Border** — current style is `double` (options: `single`, `round`, `bold`, `arrow`, `classic`)
> - **Layout** — add/remove fields, reorder, adjust spacing
>
> Just describe what you want and I'll update the code."
### How to apply customization requests
**Changing colors**: Update the two hex values in the color palette section AND `borderColor` in boxenOptions:
```javascript
const accent = chalk.hex("#YOUR_HEX");       // e.g. "#38BDF8" for sky blue
const label  = chalk.hex("#YOUR_HEX").bold;
// ...
borderColor: "#YOUR_HEX",
```
**Changing animation**: Replace the `chalkAnimation` method name:
```javascript
const intro = chalkAnimation.rainbow(...)   // rainbow, pulse, glitch, radar, neon
```
**Changing border**: Replace `borderStyle` in boxenOptions:
```javascript
borderStyle: "round",  // single, double, round, bold, arrow, classic
```
Always update the full file and confirm with the user before moving on.
---
## Step 5: Publish to npm
Guide through these steps:
### 1. Ensure package name is available
```bash
npm view <package-name>
```
If it errors with "npm ERR! 404", the name is free. If it returns info, the name is taken.
### 2. Log in to npm
```bash
npm login
```
If they already have 2FA set up, they'll need their OTP code or passkey browser flow.
### 3. Publish
```bash
npm publish
```
**Common errors and fixes:**
| Error | Fix |
|-------|-----|
| `E401 two-factor auth required` | Run `npm publish --otp=<6-digit-code>` or complete browser auth |
| `E403 Package name too similar to existing packages` | npm blocked it — try a more unique name (e.g., append their username or a number) |
| `"bin[...] script name ... was invalid and removed"` | Run `npm pkg fix` — it auto-corrects `./card.js` → `card.js` in the bin field, then republish |
| `E403 You do not have permission to publish` | The name is owned by someone else — choose a different name |
### 4. Test the published card
```bash
npx <package-name>
```
First run shows "Need to install the following packages" — that's normal. Press `y` to confirm.
### 5. Share it
Tell them: they can now share `npx <package-name>` and anyone can run their card instantly.
Reference: `npx mazenx47` — a real card built with this exact skill.
---
## Notes
- Always use `#!/usr/bin/env node` as the first line of `card.js` (makes it executable as a CLI)
- Never add `"type": "module"` to package.json — all five deps are CommonJS only
- If the user wants to update their card after publishing, they bump the `version` field and run `npm publish` again
- npm package names are permanent — they can't be renamed. They can unpublish within 72 hours or deprecate afterward.
