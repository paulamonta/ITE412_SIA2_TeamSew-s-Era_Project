import { addToQueue } from "./queue.js";

export function submitOrder(order) {
    console.log(
        `Order request submitted: {customer: ${order.customer}, service: ${order.service}, deadline: ${order.deadline}}`
    );

    addToQueue(order);
}