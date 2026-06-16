let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
    "Costa Rica",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "Panama",
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Cuba",
    "Dominican Rebublic",
    "Ecuador",
    "Mexico",
    "Paraguay",
    "Peru",
    "Puerto Rico",
    "Spain",
    "Uruguay",
    "Venezuela",
];

let deviceType = "";
let initialX = 0,
initialY = 0;
let currentElement = "";
let moveElement = false;

const isTouchDevice = () => {
    try {
        document.createEvent("touchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

let count = 0;

const randomValueGenerator = () => {
    return data[Math.floor(Math.random() * data.length)];
};

const stopGame = () => {
    controls.classList.remove("hide");
    startButton.classList.remove("hide");
};

function dragStart(e) {
    if (isTouchDevice()) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
        moveElement = true;
        currentElement = e.target;
    } else {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function dragOver(e) {
    e.preventDefualt();
}

const touchMove = (e) => {
    if (moveElement) {
        e.preventDefualt();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        currentSelectedElement.parentElement.style.top =
            currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left =
            currentSelectedElement.parentElement.offsetLeft -
            (initialX - initialY) +
            "px";
            initialX = newX;
            initialY - newY;
    }
};