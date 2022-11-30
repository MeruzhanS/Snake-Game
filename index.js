let canvas = document.getElementById("playSpace");
console.log(canvas);
let context = canvas.getContext("2d");
const WIDTH_BOARD = canvas.getAttribute("width");
const HEIGHT_BOARD = canvas.getAttribute("height");
function fillCol(column, reverse) {
  for (let i = 0; i <= HEIGHT_BOARD; i += 20) {
    if (reverse) {
      if ((0 + i) % 8 === 0) {
        context.fillStyle = "rgba(0, 255, 80, 0.48)";
      } else {
        context.fillStyle = "rgba(26, 142, 0, 0.67)";
      }
    } else {
      if ((0 + i) % 8 === 0) {
        context.fillStyle = "rgba(26, 142, 0, 0.67)";
      } else {
        context.fillStyle = "rgba(0, 255, 80, 0.48)";
      }
    }

    context.fillRect(column, 0 + i, 20, 20);
  }
}
for (let i = 0; i <= WIDTH_BOARD; i += 20) {
  let check = false;
  if ((0 + i) % 8 === 0) {
    check = true;
  }
  fillCol(i, check);
}
