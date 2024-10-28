import welcome from "./Utils/welcome.js";
import { generateShellFile } from "./Utils/generateShellFile.js";

function main() {
    welcome();
    console.log(`\n\n`)
    generateShellFile();
}

main()