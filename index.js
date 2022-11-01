const prompt = require('prompt-sync')();
const key = prompt(`w:Top; a:Left; s:Down; d:Right ::`);
console.log(`You key ${key}`);

switch (key) {
    case "w":
        console.log(`Go top`);
        break;
    case "a":
        console.log(`Go left`);
        break;
    case "s":
        console.log(`Go down`);
        break;
    case "d":
        console.log(`Go right`);
        break;
    case "reset":
        console.log(`Reset`);
        break;
    default:
        console.log(`Please ENTER KEY`);
}