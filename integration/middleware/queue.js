const messageQueue = [];

export function addToQueue(message) {
    messageQueue.push(message);
    console.log("Message added to queue.");
}

export function getNextMessage() {
    return messageQueue.shift();
}

export function hasMessages() {
    return messageQueue.length > 0;
}