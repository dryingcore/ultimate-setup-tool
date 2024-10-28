import checkbox from '@inquirer/checkbox';

export const getAnswer = async () => {
    const answer = await checkbox({
        message: 'Select What you want to install',
        choices: [
            { name: 'git', value: 'git' },
            { name: "zsh", value: "zsh" },
            { name: 'oh-my-zsh', value: 'oh-my-zsh' },
            { name: 'nvm', value: 'nvm' },
        ],
    });
    return answer
}