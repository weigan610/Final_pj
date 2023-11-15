
console.log("hello world");

document.addEventListener('DOMContentLoaded', main);

let images;
function main() {
    const frameElement = document.querySelector('#requestIframe');
    console.log(frameElement.src);
    // getMessages();
}

const getMessages = async () => {
    const res = await fetch('/api/messages');
    const messages = await res.json();
    const messageElements = messages.map(m => ele('div', `${m.text} from ${m.from}`));
    document.body.append(...messageElements);
};

