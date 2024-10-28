import fs from 'node:fs';
import path from 'node:path';
import { getAnswer } from '../CLI/Asks.inq.js';

export const generateShellFile = async () => {
    try {
        const answer = await getAnswer();
        const shellFilePath = path.join(process.cwd(), 'generated/install_tools.sh'); // Define o caminho no diretório atual

        // Remove existing file if it exists
        if (fs.existsSync(shellFilePath)) {
            fs.unlinkSync(shellFilePath);
        } else {
            fs.mkdirSync(path.join(process.cwd(), 'generated'), { recursive: true });
        }

        // Initialize the shell file with a shebang
        fs.writeFileSync(shellFilePath, '#!/bin/bash\n\n');

        // Add commands based on the answer
        answer.forEach((tool) => {
            switch (tool) {
                case 'git':
                    fs.appendFileSync(shellFilePath, 'echo "Installing git..."\n');
                    fs.appendFileSync(shellFilePath, 'pacman -S git\n');
                    fs.appendFileSync(shellFilePath, 'echo "Completed installation of git."\n\n');
                    break;
                case 'zsh':
                    fs.appendFileSync(shellFilePath, 'echo "Installing zsh..."\n');
                    fs.appendFileSync(shellFilePath, 'pacman -S zsh\n');
                    fs.appendFileSync(shellFilePath, 'echo "Completed installation of zsh."\n\n');
                    break;
                case 'oh-my-zsh':
                    fs.appendFileSync(shellFilePath, 'echo "Installing Oh My Zsh..."\n');
                    fs.appendFileSync(shellFilePath, 'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n');
                    fs.appendFileSync(shellFilePath, 'echo "Completed installation of Oh My Zsh."\n\n');
                    break;
                case 'nvm':
                    fs.appendFileSync(shellFilePath, 'echo "Installing nvm..."\n');
                    fs.appendFileSync(shellFilePath, 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash\n');
                    fs.appendFileSync(shellFilePath, 'echo "Completed installation of nvm."\n\n');
                    break;
                default:
                    break;
            }
        });

        // Make the shell file executable
        fs.chmodSync(shellFilePath, '755');
        console.log(`Shell file created at ${shellFilePath} and is now executable.`);

    } catch (error) {
        console.error("Error generating shell file:", error);
    }
};