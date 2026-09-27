import { getNextMessage, hasMessages } from "./queue.js";

export function processOrders() {
    if (!hasMessages()) {
        console.log("No messages available in the queue.");
        return;
    }

    const order = getNextMessage();

    console.log(
        `Order for ${order.customer} → Accepted`
    );

    console.log(
        `Processing service: ${order.service}`
    );

    console.log(
        `Deadline: ${order.deadline}`
    );

    console.log("------------------------------");
}