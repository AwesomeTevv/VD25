const messages = [
    "",
    "Hi",
    "So I was kinda scared to do this",
    "I thought you wouldn't like it",
    "Or it would make you feel weird",
    "And you still might",
    "But then I realised",
    "Today is about celebrating the people you care about",
    "And telling them how much they mean to you",
    "So I'm going to be selfish",
    "Deal with it",
    "This is my weird way of showing that you mean something to me",
    "My life has been a lot more fun since you entered it",
    "So thank you",
    "If nothing else",
    "I hope you know that you are appreciated",
    "",
    "Happy Valentine's Day, Ariyasha"
];

// const messages = [
//     "Hi",
//     "Testing",
//     "Happy Valentine's Day, Bubblegum"
// ];

const message = document.getElementById("message");
let currentMessageIndex = 0;

let typingSpeed = 100; // Speed of typing effect
let deleteDelay = 1000; // Delay before deleting
let cursorBlinkSpeed = 500; // Cursor blink speed

// Function to type out the message with a blinking cursor
function typeMessage(text, callback) {
    let index = 0;
    message.innerHTML = ""; // Clear previous text

    function type() {
        if (index < text.length) {
            message.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(type, typingSpeed);
        } else {
            if (currentMessageIndex === messages.length - 1) {
                // If it's the last message, remove the cursor
                setTimeout(() => {
                    document.querySelector(".cursor").style.display = "none";
                    message.classList.add("move-up");

                    const polaroid = document.getElementById("polaroid");
                    polaroid.style.visibility = "visible"
                    polaroid.style.transition = "opacity 10s ease-in-out";
                    polaroid.style.opacity = "1";

                    let frameCount = 0;
                    function jitteryRotate() {
                        if (frameCount % 30 === 0) { // Every 30 frames
                            const randomAngle = (Math.random() - 0.5) * 5; // Random angle between -5 and 5 degrees
                            polaroid.style.transform = `rotate(${randomAngle}deg)`;
                        }
                        frameCount++;
                        requestAnimationFrame(jitteryRotate);
                    }
                    jitteryRotate();
                }, deleteDelay);
            } else {
                setTimeout(callback, deleteDelay); // Wait before deleting
            }
        }
    }
    type();
}

// Function to delete the message before the next one
function deleteMessage(callback) {
    let text = message.innerText;
    let index = text.length;

    function erase() {
        if (index > 0) {
            message.innerHTML = text.substring(0, index - 1) + '<span class="cursor">|</span>';
            index--;
            setTimeout(erase, typingSpeed / 2);
        } else {
            callback(); // Start next message
        }
    }
    erase();
}

// Function to cycle through messages
function changeMessage() {
    message.style.opacity = 0; // Fade out effect

    setTimeout(() => {
        typeMessage(messages[currentMessageIndex], () => {
            if (currentMessageIndex < messages.length - 1) {
                setTimeout(() => {
                    deleteMessage(() => {
                        currentMessageIndex++;
                        changeMessage();
                    });
                }, deleteDelay);
            }
        });
        message.style.opacity = 1; // Fade in
    }, 500); // Adjust fade-out delay
}

// Start the typing cycle
changeMessage();

// convasFilm Background with Film Grain
const conavasFilm = document.getElementById("background");
const ctx = conavasFilm.getContext("2d");

function resizeconavasFilm() {
    conavasFilm.width = window.innerWidth;
    conavasFilm.height = window.innerHeight;
}

window.addEventListener('resize', resizeconavasFilm);
resizeconavasFilm();

function addFilmGrain() {
    const imageData = ctx.createImageData(conavasFilm.width, conavasFilm.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const noise = Math.random() * 255;
        pixels[i] = noise; // Red channel
        pixels[i + 1] = noise; // Green channel
        pixels[i + 2] = noise; // Blue channel
        pixels[i + 3] = 10; // Alpha channel (opacity)
    }
    ctx.putImageData(imageData, 0, 0);
}

setInterval(addFilmGrain, 100);