const { spawn } = require("child_process");

const run = (command, args) => {
  return new Promise((resolve, reject) => {
    const cp = spawn(command, args, { stdio: "inherit", shell: true });
    cp.on("exit", (code) => resolve(code));
    cp.on("error", reject);
  });
};

const args = process.argv.slice(2);
const command = args[0] || 'test';

(async () => {
  let testExitCode = 0;

  switch (command) {
    case 'test':
      // Run tests with Allure reporting
      testExitCode = await run("npx", ["playwright", "test", "--reporter=list,allure-playwright"]);
      break;

    case 'debug':
      // Run tests in debug mode with Allure reporting
      testExitCode = await run("npx", ["playwright", "test", "--debug", "--reporter=list,allure-playwright"]);
      break;

    case 'generate':
      // Generate Allure HTML report
      await run("npx", ["allure", "generate", "allure-results", "--clean", "-o", "allure-report"]);
      console.log("Allure report generated in allure-report/");
      break;

    case 'open':
      // Serve Allure report UI
      await run("npx", ["allure", "serve", "allure-results"]);
      break;

    case 'report':
      // Generate and open Allure report
      await run("npx", ["allure", "generate", "allure-results", "--clean", "-o", "allure-report"]);
      await run("npx", ["allure", "open", "allure-report"]);
      break;

    case 'serve':
      // Serve Allure results directly
      await run("npx", ["allure", "serve", "allure-results"]);
      break;

    default:
      console.log("Usage: node scripts/allure.js [command]");
      console.log("Commands:");
      console.log("  test     - Run tests with Allure reporting");
      console.log("  debug    - Run tests in debug mode with Allure reporting");
      console.log("  generate - Generate Allure HTML report");
      console.log("  open     - Open generated Allure report");
      console.log("  report   - Generate and open Allure report");
      console.log("  serve    - Serve Allure results directly");
      process.exit(1);
  }

  if (command === 'test' || command === 'debug') {
    // After test runs, serve the results
    await run("npx", ["allure", "serve", "allure-results"]);
  }

  process.exit(testExitCode !== 0 ? 1 : 0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
