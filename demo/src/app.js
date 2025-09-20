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
/ /   p i n g   A L V I N :   0 9 / 1 9 / 2 0 2 5   1 6 : 2 8 : 4 1 
 
 c o n s o l e . l o g ( ' A L V I N   s e e s   d i f f s   n o w ! ' ) ; 

function greetUser(name) {
  return `Hello, ${name}!`;
}

console.log(greetUser("ALVIN"));

// ALVIN YAML test trigger

// demo/src/app.js
import { trackEvent, withTiming } from './metrics.js';

// Existing code … keep whatever you have below, and sprinkle in a few calls:

trackEvent('app:boot', { env: 'demo' });

function greetUser(name) {
  return withTiming('greetUser', () => {
    const msg = `Hello, ${name}!`;
    console.log(msg);
    return msg;
  });
}

// Simple demo execution (so CI logs show a couple of events)
greetUser('ALVIN');

 
 