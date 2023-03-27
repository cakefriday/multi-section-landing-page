/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */


/**
 * Define Global Variables
 *
 */
// Variables will be used in different functions
const sections = document.getElementsByTagName("section");
const navList = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

  // Function returns true if the element top is near the top of the viewport, false otherwise
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.top <=
      0.4 * (window.innerHeight || document.documentElement.clientHeight)
  );
}

function getElementOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

/**
 * End Helper Function
 * Begin Main Functions
 *
 */

// building the Navigation dynamically section by section
function buildNav() {
    const fragment = document.createDocumentFragment();
    for (let section of sections) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = section.dataset.nav;
        a.setAttribute("class", "menu__link");
        a.setAttribute("id", section.id);
        a.addEventListener("click", () => {
            section.scrollIntoView({behavior: "smooth"});
            });
        li.appendChild(a);
        fragment.appendChild(li);
    
    }
navList.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
function setActive() {
  for (const section of sections) {
    const idString = String(section.id);
    const activeLink = document.querySelector(`#${idString}`);
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      activeLink.classList.add("menu__link--active");
    } 
    else {
      section.classList.remove("your-active-class");
      activeLink.classList.remove("menu__link--active");
    }
  }
}


/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("DOMContentLoaded", function() {
  buildNav();
});

window.addEventListener("scroll", function() {
  setActive();
});

