import { submitOrder } from "./producer.js";
import { processOrders } from "./consumer.js";

console.log("=================================");
console.log("SEWS'ERA MESSAGING MIDDLEWARE");
console.log("=================================");

console.log("\nPRODUCER: Submitting orders...\n");

submitOrder({
    customer: "Meriam Santino",
    service: "Alteration",
    deadline: "September 28, 2026"
});

submitOrder({
    customer: "Finding Pauline",
    service: "Patahi",
    deadline: "September 29, 2026"
});

submitOrder({
    customer: "Erich Fernandez",
    service: "Uniform",
    deadline: "September 30, 2026"
});

console.log("\nCONSUMER: Processing queued orders...\n");

setTimeout(() => {
    processOrders();
}, 1000);

setTimeout(() => {
    processOrders();
}, 2000);

setTimeout(() => {
    processOrders();
}, 3000);

setTimeout(() => {
    console.log("\nMessaging workflow completed.");
}, 3500);