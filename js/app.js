// make sure that dom is ready when you hit the js file.
document.addEventListener('DOMContentLoaded', () => {

  // holds header's meta-data
  let header = [];

  // uses to append to dom
  const fragment = document.createDocumentFragment();

  // nav bar of the page.
  const navBar = document.getElementById('navbar__list');

  // header 
  const headerEle = document.getElementsByTagName('header')[0];

  // getting available sections
  const sections = document.querySelectorAll('.section');

  // uses to hide navigation menu
  let isScrolling = false;

  // uses to set active on scroll
  let isContentScrolling = false;

  /** 
   * spreading the nodelist into an array,
   * loop through the array and creates header's meta-data
  */
  [...sections].map(section => {
    header.push({ title: section.dataset.nav, scrollToId: section.id });
  });

  // creates header dynamically
  for (const [i, nav] of header.entries()) {
    const list = document.createElement('li');
    const anchor = document.createElement('a');

    // adding texts, data attributes, classes and href
    anchor.textContent = nav.title;
    anchor.setAttribute('data-id', nav.scrollToId);
    anchor.setAttribute('id', `a-${nav.scrollToId}`);
    anchor.classList.add('menu__link');
    if (i == 0) anchor.classList.add('current-link');
    anchor.href = `#${nav.scrollToId}`;

    // adding event listner
    anchor.addEventListener('click', (e) => {
      // adding active class to header
      addActiveClass(e.target, 'current-link');

      // adding active class to section
      const section = document.getElementById(e.target.dataset.id);
      if (section) addActiveClass(section, 'current-section');
    });

    list.appendChild(anchor);
    fragment.appendChild(list);
  }

  // appending to the navbar element
  navBar.appendChild(fragment);

  // add active state to given element
  const addActiveClass = (ele, className) => {
    const currentActiveElemnt = document.getElementsByClassName(className);
    if (currentActiveElemnt.length) currentActiveElemnt[0].classList.remove(className);
    ele.classList.add(className);
  }

  window.addEventListener('scroll', (e) => {
    // clearing timeouts 
    window.clearTimeout(isScrolling);
    window.clearTimeout(isContentScrolling);

    // hide the header when not scrolling
    headerEle.style.display = "block";
    isScrolling = setTimeout(() => {
      headerEle.style.display = "none";
    }, 1500);

    // add active class on scroll
    isContentScrolling = setTimeout(() => {
      for (const nav of header) {
        const elem = document.getElementById(nav.scrollToId);
        if (isVisible(elem)) {
          console.log(nav.scrollToId)
          const elementId = nav.scrollToId
          const section = document.getElementById(nav.scrollToId);
          const link = document.getElementById(`a-${nav.scrollToId}`);
          // adding active class to section
          if (section) addActiveClass(section, 'current-section');
          // adding active class to nav
          if (link) addActiveClass(link, 'current-link');
          break
        }
      }
    }, 60);
  }, false);

  // setting active class on scroll 
  function isVisible(ele) {
    const { top, bottom } = ele.getBoundingClientRect();
    const vHeight = (window.innerHeight || document.documentElement.clientHeight);
    return ((top > 0 || bottom > 0) && top < vHeight);
  }
});