import "./jay-dialog.js";

function dialogClicked() {
  console.log("The dialog is clicked!");
}

window.func = dialogClicked;

document.addEventListener("DOMContentLoaded", () => {
  const dialog1 = document.getElementById("dialog1");
  const dialog2 = document.getElementById("dialog2");
  const dialog3 = document.getElementById("dialog3");

  document
    .getElementById("openDialog1")
    .addEventListener("click", () => dialog1.open());
  document
    .getElementById("openDialog2")
    .addEventListener("click", () => dialog2.open());
  document
    .getElementById("openDialog3")
    .addEventListener("click", () => dialog3.open());
});
