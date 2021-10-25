'use strict';

const btnHeader = document.querySelector('.btn--header');
const bookmarkBtn = document.querySelector('.btn--bookmark');
const modalSupp = document.querySelector('.section-support');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.section-support__close');
const inputContainer = document.querySelector('.stand__input-container');
const suppStands = document.querySelector('.support__stands');

// ======================= FUNCTIONS:

// CLOSE MODAL:
const closeModal = function() {
  modalSupp.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

// RENDER PLEDGE SUPPORT:
const renderPledgeSupp = function(e) {
  const currWraper = e.target.closest('.stand-wraper');
  if(!currWraper) return;
  const currStand = e.target.closest('.stand');
  const pledge = document.createElement('div');
  pledge.classList.add('pledge');
  currWraper.append(pledge);
  
  const standNumLeft = currWraper.querySelector('.stand__left-number');
 
  const html = `
    <div class="pledge__input-wraper">  
      <input type="number" value="25" min="25" class="pledge__input">
      <span>$</span>
    </div>
  `;

  const html2 = `
    <p class="pledge__descripton">Enter your pledge</p>
    <form class="pledge__form">
      ${standNumLeft && standNumLeft.textContent !== '0' ? html : ''}
      <button class="pledge__btn">Continue</button>
    </form>
  `;
 
  pledge.insertAdjacentHTML('afterbegin', html2);
  currWraper.style.border = "1px solid var(--dark-cyan)";
  currStand.style.borderRadius = '0';
}

const bookmared = function() {
  const span = this.querySelector('span');
  const img = this.querySelector('img');

  if(span.textContent === 'Bookmark') {
    span.textContent = 'Bookmarked';
    span.style.color = 'var(--dark-cyan)';
    this.style.backgroundColor = 'var(--light-cyan)';
    img.style.filter = 'var(--filterSvgGreen)';
  }else {
    span.textContent = 'Bookmark';
    span.style.color = 'var(--dark-gray)';
    this.style.backgroundColor = 'var(--background)';
    img.style.filter = 'var(--filterSvgGray)';
  }
}

// ======================= EVENT LISTENERS:
bookmarkBtn.addEventListener('click', bookmared);

btnHeader.addEventListener('click', closeModal);

closeModalBtn.addEventListener('click', (e) => {
  const icon = e.target.closest('.section-support__close');
  if(!icon) return;
  closeModal();
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
})

suppStands.addEventListener('change', (e) => {
  const currWraper = e.target.closest('.stand-wraper');
  const currRadioBtn = currWraper.querySelector('.stand__radio-input');
  if(!currRadioBtn) return;
  const pledges = document.querySelectorAll('.pledge');

  // Check if pladges exist, if extist delete them:
  if (pledges) pledges.forEach(pledge => {
    pledge.remove();
  });
  // Render pledge:
  renderPledgeSupp(e); 
});







//# sourceMappingURL=script.js.map
