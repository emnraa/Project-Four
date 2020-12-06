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
