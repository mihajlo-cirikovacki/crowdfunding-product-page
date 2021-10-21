'use strict';

const btnHeader = document.querySelector('.btn--header');
const modalSupp = document.querySelector('.section-support');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.section-support__close');

// FUNCTIONS:
const closeModal = function() {
  modalSupp.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}


// EVENT LISTENERS:
btnHeader.addEventListener('click', closeModal);

closeModalBtn.addEventListener('click', (e) => {
  const icon = e.target.closest('.section-support__close');
  if(!icon) return;
  closeModal();
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
})







