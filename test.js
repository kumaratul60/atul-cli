//#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const data = {
  name: "Atul Kumar Awasthi",
  experience: "4.5+ years in Full Stack Web Development",
  skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "TypeScript"],
  portfolio: "https://atultheportfolio.netlify.app",
  blogs: "https://atulkawasthi.medium.com",
  github: "https://github.com/kumaratul60",
  email: "atulreso1@gmail.com",
};

(async function main() {
  const { info } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "info",
      message: "What do you want to know about Atul?",
      choices: [
        { name: "Name", value: "name" },
        { name: "Experience", value: "experience" },
        { name: "Skills", value: "skills" },
        { name: "Portfolio", value: "portfolio" },
        { name: "Contact by Email", value: "email" },
      ],
      validate(answer) {
        return answer.length > 0 || "Select at least one option.";
      },
    },
  ]);

  if (info.length === 0) {
    console.log(chalk.yellow("No option selected. Run `npx atul` again to choose."));
    process.exit(0);
  }

  if (info.includes("name")) {
    console.log(chalk.green(`\n👤 Name: ${data.name}`));
  }
  if (info.includes("experience")) {
    console.log(chalk.green(`\n💼 Experience: ${data.experience}`));
  }
  if (info.includes("skills")) {
    console.log(chalk.green(`\n🛠️ Skills: ${data.skills.join(", ")}`));
  }
  if (info.includes("portfolio")) {
    console.log(chalk.green(`\n🌐 Portfolio: ${data.portfolio}`));
  }
  if (info.includes("email")) {
    console.log(chalk.green(`\n📧 Email: ${data.email}`));
  }

  console.log(chalk.cyan("\nThanks for visiting Atul's profile!\n"));
})();
