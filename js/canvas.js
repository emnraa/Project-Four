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

  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;
  return {
    left: rect.left + win.pageXOffset,
    top: rect.top + win.pageYOffset,
  };
}

function getCoordinates(e, el) {
  const isTouch = ["touchstart", "touchmove"].includes(e.type);
  const { left, top } = getOffset(el);
  const pageX = isTouch ? e.changedTouches[0].pageX : e.pageX;
  const pageY = isTouch ? e.changedTouches[0].pageY : e.pageY;

  return {
    x: pageX - left,
    y: pageY - top,
  };
}

function getCoordinatesAndDraw(e, el, isDown) {
  var { x, y } = getCoordinates(e, el);
  draw(x, y, isDown);
}

/* Setup Event Handlers */
function handleMouseDown(e) {
  mousePressed = true;
  getCoordinatesAndDraw(e, this, false);
}

function handleMouseMove(e) {
  if (!mousePressed) return false;
  getCoordinatesAndDraw(e, this, true);
}

function handleMouseUp(e) {
  mousePressed = false;
}

function handleMouseLeave(e) {
  mousePressed = false;
}

function handleTouchStart(e) {
  e.preventDefault();
  mousePressed = true;
  getCoordinatesAndDraw(e, this, false);
}

function handleTouchMove(e) {
  e.preventDefault();

  if (!mousePressed) return false;
  getCoordinatesAndDraw(e, this, true);
}

function handleTouchEnd(e) {
  mousePressed = false;
}

function handleTouchCancel(e) {
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

canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleTouchEnd);
canvas.addEventListener("touchcancel", handleTouchCancel);

selWidth.addEventListener("change", handleWidthUpdate);
selColor.addEventListener("change", handleColorUpdate);

clearCanvasButton.addEventListener("click", clearArea);
