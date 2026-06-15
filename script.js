const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

const copyBtn = document.getElementById("copyAlias");
const alias = document.getElementById("alias");

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(alias.textContent);
  copyBtn.textContent = "Copiado";
  setTimeout(() => {
    copyBtn.textContent = "Copiar";
  }, 1800);
});

const galleryImages = document.querySelectorAll(".gallery-grid img");
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const downloadImg = document.getElementById("downloadImg");
const closeModal = document.querySelector(".close-modal");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    downloadImg.href = img.src;
    downloadImg.setAttribute("download", img.src.split("/").pop());
    imageModal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => {
  imageModal.classList.remove("active");
});

const pdfButtons = document.querySelectorAll("[data-pdf]");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const downloadPdf = document.getElementById("downloadPdf");
const closePdf = document.querySelector(".close-pdf");

pdfButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pdf = button.dataset.pdf;
    pdfFrame.src = pdf;
    downloadPdf.href = pdf;
    downloadPdf.setAttribute("download", pdf.split("/").pop());
    pdfModal.classList.add("active");
  });
});

closePdf.addEventListener("click", () => {
  pdfModal.classList.remove("active");
  pdfFrame.src = "";
});

window.addEventListener("click", event => {
  if (event.target === imageModal) {
    imageModal.classList.remove("active");
  }

  if (event.target === pdfModal) {
    pdfModal.classList.remove("active");
    pdfFrame.src = "";
  }
});