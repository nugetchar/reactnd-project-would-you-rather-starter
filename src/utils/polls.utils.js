export function percentage(optionOne, optionTwo) {
    return Math.floor(optionOne.votes.length * 100 / (optionOne.votes.length + optionTwo.votes.length));
}

export function hasVoted(option, userId) {
    return option.votes.includes(userId);
}