//Variables
const body = document.querySelector('body');
//Nav
const openNav = document.querySelector('.open-nav');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.link-list a');

// Modals
const cardButtons = document.querySelectorAll('.card-img-button');
const modals = document.querySelectorAll('.mod');
const modalCloseButtons = document.querySelectorAll('.close-mod');
const overlay = document.querySelector('.overlay');

// Form validation
const form = document.querySelector('form');

const nameDiv = document.querySelector('.form-row.name');
const emailDiv = document.querySelector('.form-row.email');
const nameStatusIcon = nameDiv.querySelector('.status-icon');
const emailStatusIcon = emailDiv.querySelector('.status-icon');


const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]');

const mailButton = document.querySelector('input[type="submit"]')
const successMessage = document.querySelector('.success-message');


// Fade element in/out
function fadeInOut(element) {
    if (!element.classList.contains('show')) {
      element.classList.add('show');
      setTimeout(function () {
        element.classList.add('fadeIn');
      }, 20);
    } else {
      element.classList.remove('fadeIn');    
      element.addEventListener('transitionend', function(e) {
        element.classList.remove('show');
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }
}


// Menu
function menuHandler() {
    if (nav.classList.contains('show')) {
        nav.classList.toggle('show');
        openNav.innerHTML = '<span>Open</span><span>Menu</span><i class="fas fa-chevron-down arrow"></i>';
        openNav.style.transform = 'rotate(270deg)';
    } else {
        nav.classList.toggle('show');
        openNav.innerHTML = '<span>Close</span><span>Menu</span><i class="fas fa-chevron-down arrow"></i>';
        openNav.style.transform = 'rotate(90deg)';
    }
}
// Modals 
function openModal(e) {
  const scrollY = window.scrollY;
  const id = e.target.id;
  modals.forEach(modal => {
    if (modal.id === id) {
      fadeInOut(modal);
      overlay.classList.toggle('show');
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
    }
  })
}
function closeModal(e) {
  const currentScrollY = body.style.top;
  modals.forEach(modal => {
    if (modal.classList.contains('show')) {
      fadeInOut(modal);
      overlay.classList.toggle('show');
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(currentScrollY || 0) * -1);
    }
  })
}

// Form Validation
//Checks name field for entry
function checkName(e) {
  //get values from input
  const textValue = nameInput.value.trim();

  //adds or removes classes to display error or success messages
  if (textValue.length > 0 && nameDiv.classList.contains('error')) {
      nameDiv.classList.remove('error');
      nameDiv.classList.add('success');
      nameStatusIcon.innerHTML = '<i class="fas fa-check"></i>';
  }
  if (textValue === '') {
      if (nameDiv.classList.contains('success')) {
          nameDiv.classList.remove('success');
      }
      nameDiv.classList.add('error');
      nameStatusIcon.innerHTML = '<i class="fas fa-exclamation"></i>';
  }
}
//Checks email field for entry and passes value to isEmail to check validity against RegEx
function checkEmail(e) {
  //get values from input
  const emailValue = emailInput.value.trim();

  //adds or removes classes to display error or success messages
  if (emailValue.length >= 0 && isEmail(emailValue)) {
      if (emailDiv.classList.contains('error')) {
          emailDiv.classList.remove('error');
      }
      emailDiv.classList.add('success');
      emailStatusIcon.innerHTML = '<i class="fas fa-check"></i>';
  }
  if (emailValue === '') {
      if (emailDiv.classList.contains('success')) {
          emailDiv.classList.remove('success');
      }
      emailDiv.classList.add('error');
      emailStatusIcon.innerHTML = '<i class="fas fa-exclamation"></i>';
  }
}
//Checks email against RegEx for validity
function isEmail(email) {
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegExp.test(email);
}
// Checks to see if form is properly filled out when Submit button clicked
function isEmailFormCorrect() {
  if (nameDiv.classList.contains('success') && 
      emailDiv.classList.contains('success')) {
          return true;
      }
}


// Listeners
// Menu
openNav.addEventListener('click', menuHandler);
navLinks.forEach(link => link.addEventListener('click', menuHandler));

// Modals
cardButtons.forEach(button => button.addEventListener('click', (e) => {
  openModal(e);
}));
modalCloseButtons.forEach(button => button.addEventListener('click', closeModal));

//Form validation listeners
//router function for listeners
function formEventRouter(e) {
  if (e.target === nameInput){
      checkName(e);
  } else if (e.target === emailInput) {
      checkEmail(e);
  }
}

// Listeners on form inputs
form.addEventListener('click', (e) => {
   formEventRouter(e);
});
form.addEventListener('keydown', (e) => {
  formEventRouter(e);
});
form.addEventListener('change', (e) => {
  formEventRouter(e);
});
// Listener on button
form.addEventListener('submit', (e) => {
  if (isEmailFormCorrect()) {  // Checks that fields are properly filled out, if so, shows user a success message
      // e.preventDefault();
      setTimeout(fadeInOut(successMessage), 100); //fades success message in
      clearTimeout();
      setTimeout(function() {
          fadeInOut(successMessage); // fades success message out
          form.reset(); // resets form
          emailDiv.classList.remove('success'); // removes validation styling & icons
          nameDiv.classList.remove('success');
          }, 2500);
  } else {  // runs field validation functions again
      e.preventDefault();
      checkName(e, nameDiv, nameInput);
      checkEmail(e, emailDiv, emailInput);
  }
});