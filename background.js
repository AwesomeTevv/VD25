/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("background");
/**
 * @type {CanvasRenderingContext2D}
 */
const graphics = canvas.getContext("2d");

var primary = "#ef6351";
var secondary = "#f38375";
var tertiary = "#f7a399";
var fourth = "#fbc3bc";
var fifth = "#ffe3e0";

const BACKGROUND = fifth;
const DEFAULT = fourth;

const jitterRate = 10;

const lineWidth = 5;

let frameNum = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function deg2rad(degrees) {
    return (Math.PI / 180) * degrees;
}

function line() {
    // Draws a line from (-0.5,0) to (0.5,0)
    graphics.beginPath();
    graphics.moveTo(-50, 0);
    graphics.lineTo(50, 0);
    graphics.stroke();
}

function rect() {
    graphics.strokeRect(-50, -50, 100, 100);
}

let lastJitterOffsets = []; // Store previous jitter offsets

function bezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, color = "black") {
    let segments = 30; // Number of segments to create jitter

    if (frameNum % jitterRate === 0 || lastJitterOffsets.length === 0) {
        lastJitterOffsets = Array.from({ length: segments + 1 }, () => ({
            x: (Math.random() - 0.5) * 2, // Small random jitter
            y: (Math.random() - 0.5) * 2
        }));
    }

    graphics.beginPath();
    graphics.moveTo(x1, y1);

    for (let i = 0; i <= segments; i++) {
        let t = i / segments;
        let u = 1 - t;
        let jitter = lastJitterOffsets[i]; // Use stored jitter offsets

        let x =
            u ** 3 * x1 +
            3 * u ** 2 * t * cp1x +
            3 * u * t ** 2 * cp2x +
            t ** 3 * x2 + jitter.x;

        let y =
            u ** 3 * y1 +
            3 * u ** 2 * t * cp1y +
            3 * u * t ** 2 * cp2y +
            t ** 3 * y2 + jitter.y;

        graphics.lineTo(x, y);
    }

    graphics.lineWidth = Math.random() * lineWidth + lineWidth;
    graphics.stroke();
}


function circle() {
    graphics.beginPath();
    graphics.arc(0, 0, 50, 0, 2 * Math.PI);
    graphics.stroke();
}

function dot() {
    // Fills a circle, diameter = 1, center = (0,0)
    graphics.beginPath();
    graphics.arc(0, 0, 50, 0, 2 * Math.PI);
    graphics.fill();
}

function blinkingDot(offset) {
    var sr = Math.abs(Math.cos((frameNum + offset) / 100));
    graphics.save();
    graphics.scale(sr, sr);
    dot();
    graphics.restore();
}

let lastJitter = Array(100).fill(0); // Store jitter values
let jitterUpdateFrame = 0; // Frame counter

function filledCircle() {
    let segments = 250;
    let maxJitter = 1;

    // Only update jitter every `jitterRate` frames
    if (frameNum % jitterRate === 0) {
        for (let i = 0; i < segments; i++) {
            lastJitter[i] = (Math.random() - 0.5) * maxJitter;
        }
    }

    graphics.beginPath();
    for (let i = 0; i <= segments; i++) {
        let angle = (i / segments) * (2 * Math.PI);
        let r = 50 + lastJitter[i % segments]; // Use stored jitter
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);

        if (i === 0) {
            graphics.moveTo(x, y);
        } else {
            graphics.lineTo(x, y);
        }
    }
    graphics.closePath();
    // graphics.fillStyle = `rgba(0, 0, 0, ${0.9 + Math.random() * 0.1})`;
    graphics.fill();
}



function hill() {
    graphics.save();
    graphics.fillStyle = primary;
    graphics.translate(
        (canvas.width / 2) - 600,
        (canvas.height / 2) + 400
    );
    graphics.rotate(deg2rad(10));
    graphics.scale(14, 4);
    filledCircle();
    graphics.restore();
}

function hill2() {
    graphics.save();
    graphics.fillStyle = secondary;
    graphics.translate(
        (canvas.width / 2) + 500,
        (canvas.height / 2) + 450
    );
    graphics.rotate(deg2rad(-10));
    graphics.scale(13, 4);
    filledCircle();
    graphics.restore();
}

function hill3() {
    graphics.save();
    graphics.fillStyle = tertiary;
    graphics.translate(
        (canvas.width / 2) - 250,
        (canvas.height / 2) + 450
    );
    graphics.rotate(deg2rad(5));
    graphics.scale(11, 4);
    filledCircle();
    graphics.restore();
}

function hill4() {
    graphics.save();
    graphics.fillStyle = fourth;
    graphics.translate(
        (canvas.width / 2) + 200,
        (canvas.height / 2) + 440
    );
    graphics.rotate(deg2rad(-5));
    graphics.scale(11, 4);
    filledCircle();
    graphics.restore();
}

function sparkle() {
    graphics.save();
    // graphics.translate(canvas.width / 2, canvas.height / 2);
    bezierCurve(0, 100, 0, 0, 0, 0, 75, 0);
    bezierCurve(0, -100, 0, 0, 0, 0, 75, 0);
    bezierCurve(0, 100, 0, 0, 0, 0, -75, 0);
    bezierCurve(0, -100, 0, 0, 0, 0, -75, 0);
    graphics.restore();
}

function sparkle2() {
    graphics.save();
    // graphics.translate(canvas.width / 2, canvas.height / 2);
    bezierCurve(0, 110, 2.5, 12.5, 2.5, 12.5, 40, 40);
    bezierCurve(110, 0, 12.5, 2.5, 12.5, 2.5, 40, 40);
    bezierCurve(110, 0, 12.5, -2.5, 12.5, -2.5, 40, -40);
    bezierCurve(0, -110, 2.5, -12.5, 2.5, -12.5, 40, -40);
    // -------------------------------------------------------------------------
    bezierCurve(0, 110, -2.5, 12.5, -2.5, 12.5, -40, 40);
    bezierCurve(-110, 0, -12.5, 2.5, -12.5, 2.5, -40, 40);
    bezierCurve(-110, 0, -12.5, -2.5, -12.5, -2.5, -40, -40);
    bezierCurve(0, -110, -2.5, -12.5, -2.5, -12.5, -40, -40);
    graphics.restore();
}

let lastScaleFactor = 1; // Store the last scale value
let updateRate = 15; // Number of frames between updates

function animatedSparkle(func, offset = 0) {
    graphics.save();

    // Only update scale every `updateRate` frames
    if ((frameNum + offset) % updateRate === 0) {
        lastScaleFactor = Math.abs(Math.cos(frameNum / 60));
    }

    graphics.scale(lastScaleFactor, lastScaleFactor);
    func();
    graphics.restore();
}

function moon() {
    // graphics.save();
    // graphics.translate(canvas.width / 2, (canvas.height / 2) - 251);
    // graphics.scale(5, 1);
    // line();
    // graphics.restore();

    graphics.save();
    // graphics.translate(canvas.width / 2, (canvas.height / 2) - 251);
    let scale = 1.65;
    graphics.scale(scale, scale);
    filledCircle();
    graphics.restore();

    graphics.save();
    // graphics.translate((canvas.width / 2) + 15, (canvas.height / 2) - 251);
    graphics.translate(15, 0);
    let scale2 = 1.42;
    graphics.scale(scale2, scale2);
    graphics.fillStyle = BACKGROUND;
    filledCircle();
    graphics.restore();
}

function plant() {
    graphics.save();
    graphics.translate(canvas.width / 2, canvas.height / 2);
    bezierCurve(0, -160, 90, 0, -150, 100, -45, 250);
    graphics.restore();

    graphics.save();
    graphics.translate(canvas.width / 2, canvas.height / 2);
    var cpx = -50;
    var cpy = 120;
    bezierCurve(-72, 172, cpx - 2, cpy + 5, cpx + 5, cpy, -10, 96);
    graphics.restore();

    graphics.save();
    graphics.translate(canvas.width / 2, canvas.height / 2);
    var cpx2 = 50;
    var cpy2 = -100;
    bezierCurve(20, -70, cpx2 - 5, cpy2 + 3, cpx2 + 5, cpy2 - 3, 70, -110);
    graphics.restore();

    graphics.save();
    graphics.translate(canvas.width / 2, canvas.height / 2);
    var cpx3 = -35;
    var cpy3 = -100;
    bezierCurve(10, -30, cpx3, cpy3 + 10, cpx3, cpy3 - 10, -65, -125, "red");
    graphics.restore();
}

var dotMin = 0.01;
var dotMax = 0.05;
var dots = [
    { x: 0.05, y: 0.1, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.2, y: 0.2, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.07, y: 0.36, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.224, y: 0.55, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.374, y: 0.595, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.313, y: 0.31, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.344, y: 0.03, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.567, y: 0.70, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.601, y: 0.42, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.69, y: 0.161, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.708, y: 0.305, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.8, y: 0.59, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.833, y: 0.08, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
    { x: 0.9, y: 0.465, scale: Math.random() * dotMax + dotMin, offset: Math.floor(Math.random() * 100) },
];

var sparMin = 0.1;
var sparMax = 0.5;
var sparkles = [
    { x: 0.136, y: 0.06, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.218, y: 0.403, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.322, y: 0.158, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.423, y: 0.65, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.022, y: 0.6, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.676, y: 0.302, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.772, y: 0.024, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.823, y: 0.578, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.885, y: 0.19, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
    { x: 0.968, y: 0.422, type: Math.random() > 0.5 ? 1 : 2, scale: 0.15 },
];

function getFadeFactor(startFrame, fadeDuration) {
    let fadeProgress = (frameNum - startFrame) / fadeDuration;
    return Math.min(Math.max(fadeProgress, 0), 1);
}

function drawScene() {
    let fadeDuration = 500;

    // Load this in first

    graphics.save();
    graphics.translate((canvas.width / 2), (canvas.height / 2) - 280);
    graphics.fillStyle = DEFAULT;
    let moonFade = getFadeFactor(100, fadeDuration);
    graphics.globalAlpha = moonFade;
    moon();
    graphics.restore();

    // First Sparkle

    graphics.save();
    graphics.translate((canvas.width / 2) + 100, (canvas.height / 2) - 290);
    graphics.scale(0.35, 0.35);
    graphics.strokeStyle = DEFAULT;
    graphics.lineWidth = lineWidth;
    let sparkle1Fade = getFadeFactor(1 * fadeDuration, fadeDuration);
    graphics.globalAlpha = sparkle1Fade;
    animatedSparkle(sparkle, 21);
    graphics.restore();

    // Second Sparkle

    graphics.save();
    graphics.translate((canvas.width / 2) - 120, (canvas.height / 2) - 350);
    graphics.scale(0.35, 0.35);
    graphics.strokeStyle = DEFAULT;
    let sparkle2Fade = getFadeFactor(2 * fadeDuration, fadeDuration);
    graphics.globalAlpha = sparkle2Fade;
    animatedSparkle(sparkle2);
    graphics.restore();

    // Third Sparkle

    graphics.save();
    graphics.translate((canvas.width / 2) - 100, (canvas.height / 2) - 210);
    graphics.scale(0.2, 0.2);
    graphics.strokeStyle = DEFAULT;
    let sparkle3Fade = getFadeFactor(3 * fadeDuration, fadeDuration);
    graphics.globalAlpha = sparkle3Fade;
    animatedSparkle(sparkle, 36);
    graphics.restore();

    // First Hill

    graphics.save();
    let hill1Fade = getFadeFactor(4 * fadeDuration, fadeDuration);
    graphics.globalAlpha = hill1Fade;
    hill4();
    graphics.restore();

    // Second Hill

    graphics.save();
    let hill2Fade = getFadeFactor(5 * fadeDuration, fadeDuration);
    graphics.globalAlpha = hill2Fade;
    hill3();
    graphics.restore();

    // Third Hill

    graphics.save();
    let hill3Fade = getFadeFactor(6 * fadeDuration, fadeDuration);
    graphics.globalAlpha = hill3Fade;
    hill2();
    graphics.restore();

    // Fourth Hill

    graphics.save();
    let hill4Fade = getFadeFactor(7 * fadeDuration, fadeDuration);
    graphics.globalAlpha = hill4Fade;
    hill();
    graphics.restore();

    // Background Dots

    for (let i = 0; i < dots.length; i++) {
        graphics.save();
        graphics.fillStyle = tertiary;
        graphics.translate(
            canvas.width * dots[i].x,
            canvas.height * dots[i].y
        );
        graphics.scale(dots[i].scale, dots[i].scale);
        let dotFade = getFadeFactor(8 * fadeDuration + i * 10, fadeDuration);
        graphics.globalAlpha = dotFade;
        blinkingDot(dots[i].offset);
        graphics.restore();
    }

    // Background Sparkles

    for (let i = 0; i < sparkles.length; i++) {
        graphics.save();
        graphics.translate(
            canvas.width * sparkles[i].x,
            canvas.height * sparkles[i].y
        );
        graphics.scale(sparkles[i].scale, sparkles[i].scale);
        let sparkleFade = getFadeFactor(10 * fadeDuration + i * 10, fadeDuration);
        graphics.globalAlpha = sparkleFade;
        var fun = sparkle;
        if (sparkles[i].type == 2) { fun = sparkle2 }
        graphics.strokeStyle = fourth;
        animatedSparkle(fun)
        graphics.restore();
    }

}

// drawScene();
// const colour = "#f38375";

// drawBezierCurve(0, 738, 0, 5, 662, 914, 662, 914);

// function getMousePos(event) {
//     const rect = canvas.getBoundingClientRect(); // Get canvas position
//     const x = event.clientX - rect.left; // Adjust for canvas offset
//     const y = event.clientY - rect.top;
//     return { x, y };
// }

// function redrawCanvas(x, y) {
//     // Clear canvas
//     graphics.clearRect(0, 0, canvas.width, canvas.height);

//     // Optional: Draw a background for visibility
//     graphics.fillStyle = "white";
//     graphics.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw the text
//     graphics.fillStyle = "black";
//     graphics.font = "16px Arial";
//     graphics.fillText(`(${Math.round(x)}, ${Math.round(y)})`, x + 10, y - 10);
// }

// canvas.addEventListener("mousemove", (event) => {
//     const { x, y } = getMousePos(event);
//     redrawCanvas(x, y);
// });

function updateFrame() {
    frameNum++;
}

function draw() {
    graphics.save();

    graphics.fillStyle = fifth;
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    graphics.fillStyle = "black";

    drawScene();

    graphics.restore();
}

function frame() {
    updateFrame();
    // console.log(frameNum);
    draw();
    requestAnimationFrame(frame);
}

frame();