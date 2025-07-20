#!/usr/bin/env node
import CFonts from "cfonts";
import ora from "ora";
import boxen from "boxen";
import inquirer from "inquirer";
import chalk from "chalk";
import { showEnvInfo } from "./showEnvInfo.js";

const wait = (ms = 1000) => new Promise((res) => setTimeout(res, ms));


// Data Store
const data = {
  name: "Atul Kumar Awasthi",
  experience: "4.5+ years in Full Stack Web Development",
  skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "TypeScript"],
  portfolio: "https://atultheportfolio.netlify.app",
  blogs: "https://atulkawasthi.medium.com",
  github: "kumaratul60",
  email: "atulreso1@gmail.com",
};

// Startup Banner
CFonts.say("Atul Awasthi", {
  font: "block",
  align: "center",
  colors: ["cyan", "magenta"],
  background: "black",
  gradient: ["red", "yellow"],
});

// Spinner
const spinner = ora("Preparing your profile…").start();
await wait(400);
spinner.text = "Loading sections…";
await wait(300);
spinner.succeed("Ready!");

// Interactive Prompt (fallback)
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
      { name: "Blogs", value: "blogs" },
      { name: "GitHub", value: "github" },
      { name: "Contact by Email", value: "email" },
      { name: "Environment Info", value: "env" },
      { name: "Fun Fact", value: "fact" },
    ],
    validate(ans) {
      return ans.length > 0 || "Select at least one option.";
    },
  },
]);

// Display Selections
for (const choice of info) {
  switch (choice) {
    case "name":
      console.log(chalk.green(`👤 Name: ${data.name}`));
      break;
    case "experience":
      console.log(chalk.green(`💼 Experience: ${data.experience}`));
      break;
    case "skills":
      console.log(chalk.green(`🛠️ Skills: ${data.skills.join(", ")}`));
      break;
    case "portfolio":
      console.log(chalk.green(`🌐 Portfolio: ${data.portfolio}`));
      break;
    case "blogs":
      console.log(chalk.green(`✍️ Blogs: ${data.blogs}`));
      break;
    case "github":
      console.log(chalk.green(`🐙 GitHub:`), `https://github.com/${data.github}`);
      break;
    case "email":
      console.log(chalk.green(`📫 Email: ${data.email}`));
      break;
    case "env":
      await showEnvInfo();
      break;
    case "fact":
      const facts = [
        "Loves open-source CONTRIBUTIONS",
        "Daily coffee: ☕ 3 cups",
        "Playlist: Lo-fi Hip-Hop Beats",
      ];
      console.log(chalk.cyan(`💡 Fun Fact: ${facts[Math.floor(Math.random() * facts.length)]}`));
      break;
  }
}

// Footer
console.log(
  boxen("Thanks for visiting Atul’s profile!", {
    padding: 1,
    margin: 1,
    borderColor: "blue",
    align: "center",
  })
);
