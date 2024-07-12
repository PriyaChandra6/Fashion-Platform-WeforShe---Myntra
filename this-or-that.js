document.addEventListener("DOMContentLoaded", function () {
  const chooseButtons = document.querySelectorAll(".choose-button");
  const resultSection = document.getElementById("resultSection");
  const chosenOutfit = document.getElementById("chosenOutfit");

  chooseButtons.forEach(button => {
      button.addEventListener("click", () => {
          const outfitNumber = button.getAttribute("data-outfit");
          const outfitImageSrc = document.querySelector(`img[alt="Outfit ${outfitNumber}"]`).src;
          chosenOutfit.innerHTML = `<img src="${outfitImageSrc}" alt="Chosen Outfit" width="200px" height="200px">`;
          resultSection.classList.remove("hidden");
      });
  });
});
