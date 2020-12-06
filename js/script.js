/* Get Elements */
var canvas = document.querySelector("#myCanvas");
var clearCanvasButton = document.querySelector("#clear-canvas-button");
var selColor = document.querySelector("#selColor");
var selWidth = document.querySelector("#selWidth");

/* Setup Variables */
var ctx = canvas.getContext("2d");
var strokeColor = selColor.value;
var strokeWidth = selWidth.value;
var mousePressed = false;
var lastX, lastY;

/* Define Behavior */
function draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}

function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function getOffset(element) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

/* Setup Event Handlers */
function handleMouseDown(e) {
  mousePressed = true;
  draw(e.pageX - getOffset(this).left, e.pageY - getOffset(this).top, false);
}

function handleMouseMove(e) {
  if (mousePressed) {
    draw(e.pageX - getOffset(this).left, e.pageY - getOffset(this).top, true);
  }
}

function handleMouseUp(e) {
  mousePressed = false;
}

function handleMouseLeave(e) {
  mousePressed = false;
}

function handleWidthUpdate(e) {
  strokeWidth = selWidth.value;
}

function handleColorUpdate(e) {
  strokeColor = selColor.value;
}

/* Wire it up */
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseleave", handleMouseLeave);

selWidth.addEventListener("change", handleWidthUpdate);
selColor.addEventListener("change", handleColorUpdate);

clearCanvasButton.addEventListener("click", clearArea);

// Get the modal elements
var modal = document.querySelector("#modal");
var openButton = document.querySelector("#open-button");
var closeButton = document.querySelector("#close-button");

// Define behavior
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Wire it up
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) closeModal();
};
