'use-strict';

const body = document.querySelector('body');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const navBar = document.querySelector('.nav');
const header = document.querySelector('.header');
const mailAndPhone = document.querySelectorAll(
  '.contact-container__bearings--copy-phone, .contact-container__bearings--copy-mail'
);
const hamburgerBtn = document.querySelector('.hamburger-icon');
const mobileMenu = document.querySelector('#mobile-menu');
const headerBlackImage = document.querySelector('.header__black-image');
const headerColorImage = document.querySelector('.header__color-image');
const headerHeroTextName = document.querySelectorAll('.header__hero-text-name');
const headerHeroTextCaption = document.querySelector(
  '.header__hero-text-caption'
);
const headerHeroTextGreeting = document.querySelector(
  '.header__hero-text-greeting'
);

///////////////////////////////////////
//// Header animation waiting

headerColorImage.addEventListener('load', addAdnimations);

function addAdnimations() {
  body.style.animation = 'site-fade-in 0.2s ease-in forwards';
  headerBlackImage.style.animation =
    'hero-img-animation 1500ms steps(46) forwards';
  headerHeroTextGreeting.classList.add('header__text--animation');
  headerHeroTextName.forEach(el => el.classList.add('header__text--animation'));
  headerHeroTextCaption.classList.add('header__text--animation');
  btnScrollTo.classList.add('header__text--animation');
}

///////////////////////////////////////
//// Scroling btn learn more

btnScrollTo.addEventListener('click', function () {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//// Page navigation click function

const desktopLinks = document.querySelector('.nav__links');
const mobileLinks = document.querySelector('.nav-mobile__links');

const smoothSlide = function (selector) {
  selector.addEventListener('click', function (event) {
    event.preventDefault();

    if (
      event.target.classList.contains('nav__link') ||
      event.target.classList.contains('nav-mobile__link')
    ) {
      const id = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
};

smoothSlide(desktopLinks);
smoothSlide(mobileLinks);

///////////////////////////////////////
//// Page navigation mobile menu

hamburgerBtn.addEventListener('click', function () {
  const isOpen = hamburgerBtn.getAttribute('aria-expanded');

  if (isOpen === 'false') {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('nav-mobile__slide');
  } else {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('nav-mobile__slide');
  }
});

///////////////////////////////////////
//// Navigation bar fade animation

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const syblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    syblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navBar.addEventListener('mouseover', handleHover.bind(0.5));
navBar.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//// Sticky Navbar

const navHeight = navBar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/////////////////////////////////////
// Sections fadeout efect

const allSections = document.querySelectorAll(
  '.about-me, #section--2, .projects, #section--4'
);

const sectionReveal = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

/////////////////////////////////////
// About me show efect

const allAboutMeDescLeft = document.querySelectorAll(
  '.about-me__show-descritpion-left'
);
const allAboutMeDescRight = document.querySelectorAll(
  '.about-me__show-descritpion-right'
);

const descriptionsReveal = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.classList.remove(
    'about-me--hidden-left',
    'about-me--hidden-right'
  );
  observer.unobserve(entry.target);
};

const descriptionObserver = new IntersectionObserver(descriptionsReveal, {
  root: null,
  threshold: 0.15,
});

allAboutMeDescLeft.forEach(function (description) {
  descriptionObserver.observe(description);
  description.classList.add('about-me--hidden-left');
});

allAboutMeDescRight.forEach(function (description) {
  descriptionObserver.observe(description);
  description.classList.add('about-me--hidden-right');
});
