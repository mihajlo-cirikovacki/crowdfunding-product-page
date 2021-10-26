'use strict';

const btnHeader = document.querySelector('.btn--header');
const bookmarkBtn = document.querySelector('.btn--bookmark');
const featured = document.querySelector('.featured');
const modalSupp = document.querySelector('.section-support');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.section-support__close');
const inputContainer = document.querySelector('.stand__input-container');
const sectionSupport = document.querySelector('.section-support');
const suppStands = document.querySelector('.support__stands');
const overlay2 = document.querySelector('.overlay-2');
const messageContainer = document.querySelector('.message-container');
const hamburger = document.querySelector('.hamburger');
const overlayNav = document.querySelector('.overlay-nav-phone');
const phoneNav = document.querySelector('.nav-phone');

// ======================= FUNCTIONS:

// CLOSE MODAL:
const addCloseModal = function() {
  modalSupp.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

const addCloseThankYouMSG = function() {
  messageContainer.classList.toggle('hidden-2');
  overlay2.classList.toggle('hidden-2');
  modalSupp.classList.add('hidden');
  overlay.classList.add('hidden');
}

const removeThankYouMsg = function() {
  overlay2.classList.add('hidden-2');
  messageContainer.classList.add('.hidden-2');
  messageContainer.querySelector('.message').remove();
}

const toggleHamburger = function() {
  hamburger.classList.toggle('is-active');
  phoneNav.classList.toggle('is-active');
  overlayNav.classList.toggle('hidden');
}


// RENDER PLEDGE SUPPORT:
const renderPledgeSupp = function(e) {
  const currWraper = e.target.closest('.stand-wraper');
  if(!currWraper) return;
  const standNumLeft = currWraper.querySelector('.stand__left-number');
  const currStand = e.target.closest('.stand');
  // Creating new pledge element:
  const pledge = document.createElement('div');
  pledge.classList.add('pledge');
  currWraper.append(pledge);
  
  const html = `
    <div class="pledge__input-wraper">  
      <input type="number" value="25" min="25" class="pledge__input">
      <span>$</span>
    </div>
  `;

  const html2 = `
    <p class="pledge__descripton">Enter your pledge</p>
    <div class="pledge__form">
      ${standNumLeft && standNumLeft.textContent !== '0' ? html : ''}
      <button class="pledge__btn">Continue</button>
    </div>
  `;
  
  // Adding pledge element to the DOM.
  pledge.insertAdjacentHTML('afterbegin', html2);
  // Changing some styles:
  currWraper.style.border = "1px solid var(--dark-cyan)";
  currStand.style.borderRadius = '0';
}

// Render bookmarked styled button:
const bookmarked = function() {
  const span = this.querySelector('span');
  const svg = this.querySelector('svg');
  const circle = svg.querySelector('circle');
  const path = svg.querySelector('path');

  if(span.textContent === 'Bookmark') {
    span.textContent = 'Bookmarked';
    span.style.color = 'var(--dark-cyan)';
    this.style.backgroundColor = 'var(--light-cyan)';
    circle.style.fill = 'var(--dark-cyan)';
    path.style.fill = 'var(--white)';
  } else {
    span.textContent = 'Bookmark';
    span.style.color = 'var(--dark-gray)';
    this.style.backgroundColor = 'var(--background)';
    circle.style.fill = 'var(--dark-gray)';
    path.style.fill = 'var(--light-gray)';
  }
}

// RENDER THANK YOU MESSAGE:
const renderThankYouMsg  = function() {
  // Creating message element:
  const message = document.createElement('div');
  message.classList.add('message');
  messageContainer.append(message);

  const html = `
    <img src="/images/icon-check.svg" alt="Icon Check" class="message__icon">
    <div class="message__container">
      <h2 class="message__heading">Thanks for your support!</h2>
      <p class="message__description">
        Your pledge brings us one step closer to sharing 
        Mastercraft Bamboo Monitor Riser worldwide. 
        You will get an email once our campaign is completed.
      </p>
      <button class="message__btn">Got it!</button>
    </div>
  `;

  message.insertAdjacentHTML('afterbegin', html);
}


// ======================= EVENT LISTENERS:
bookmarkBtn.addEventListener('click', bookmarked);

btnHeader.addEventListener('click', addCloseModal);

featured.addEventListener('click', (e) => {
  const currButton = e.target.closest('.btn--reward');
  if (!currButton) return;
  const left = currButton.previousElementSibling;
  const numLeft = left.querySelector('.featured__stand-left-num');
  // Check if left number is 0:
  if (numLeft.textContent !== '0') addCloseModal();
});

closeModalBtn.addEventListener('click', (e) => {
  const icon = e.target.closest('.section-support__close');
  if(!icon) return;
  addCloseModal();
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    modalSupp.classList.add('hidden');
    overlay.classList.add('hidden');
  }
})

sectionSupport.addEventListener('change', (e) => {
  const currWraper = e.target.closest('.stand-wraper');
  const currRadioBtn = currWraper.querySelector('.stand__radio-input');
  if(!currRadioBtn) return;
  const pledges = document.querySelectorAll('.pledge');

  // Check if pladges exist, if extist delete them:
  if (pledges) pledges.forEach(pledge => {
    const standWraper = pledge.closest('.stand-wraper');
    standWraper.style.border = 'none';
    standWraper.querySelector('.stand').style.borderRadius = '.8rem';
    pledge.remove();
  });
  // Render pledge:
  renderPledgeSupp(e); 
});

suppStands.addEventListener('click', (e) => {
  const currButton = e.target.closest('.pledge__btn');
  if (!currButton) return;
  const currWraper = e.target.closest('.stand-wraper');
  const standNumLeft = currWraper.querySelector('.stand__left-number');
  // Check for left number:
  if (standNumLeft && standNumLeft.textContent === '0') return;

  console.log(currButton);
  addCloseThankYouMSG();
  renderThankYouMsg();
});

messageContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.message__btn');
  if(!button) return;
  removeThankYouMsg();
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') removeThankYouMsg();
});


hamburger.addEventListener('click', toggleHamburger);

phoneNav.addEventListener('click', (e) => {
  const currAnchor = e.target.closest('.nav-phone__link');
  if(!currAnchor) return;
  toggleHamburger();
});
