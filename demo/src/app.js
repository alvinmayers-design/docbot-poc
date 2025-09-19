export function greet(name) {
  return `Hello, ${name}!`;
}
/ /   t r i g g e r   t e s t   0 9 / 1 9 / 2 0 2 5   1 1 : 1 5 : 1 2 
 
 / /   t o u c h   t o   t r i g g e r 
 
 / /   d e m o :   a d d   l o g g i n g   f o r   w o r k f l o w   t e s t 
 
 // demo: add logging for workflow test
function logWorkflowEvent(eventName) {
  const timestamp = new Date().toISOString();
  console.log(`[ALVIN DEMO] ${eventName} at ${timestamp}`);
}

// Trigger a sample event
logWorkflowEvent("Workflow triggered");

// demo: add helper for formatting user messages
function formatUserMessage(username, message) {
  const timestamp = new Date().toLocaleTimeString();
  return `[${timestamp}] ${username}: ${message}`;
}

// quick test run
console.log(formatUserMessage("Alice", "Hello ALVIN demo!"));
