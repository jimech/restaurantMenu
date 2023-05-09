// select elements

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const ul = document.querySelector(".nav__menu");

//  API de Intersection Observer para implementar una navegación fija o "sticky" en la página web. 

// obtener la altura del elemento nav y luego observa si el elemento header está intersectando con el nav 
//utilizando la función IntersectionObserver. Si el header ya no está intersectando con el nav, se agrega una clase llamada "header__sticky"

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("header__sticky");
  else nav.classList.remove("header__sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);


// page navigation scrolee smoothly with event delegation
// hace que la navegación de la página se desplace suavemente a la sección correspondiente cuando se hace clic en un enlace de navegación. 
const sections = document.querySelectorAll("section");

ul.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    sections.forEach((section) => (section.style.paddingTop = "100px"));
  }
});

// animar las secciones de la página a medida que se desplaza por la página
//seleccionar todas las secciones de la página y luego se observa si cada sección está intersectando con el visor. 
//Si una sección está intersectando con el visor, se le quita la clase "section__hidden" para mostrarla en la página.
const allSections = document.querySelectorAll(".section");

const fadingSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(fadingSection, {
  root: null,
  threshold: 0.12,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

// mobile menu
//  se utiliza para crear un menú desplegable para dispositivos móviles.
// Cuando se hace clic en el elemento mobileMenu, se agrega la clase "show__menu" al elemento overlay, que muestra el menú. 
const mobileMenu = document.querySelector(".mobile__menu");
const overlay = document.querySelector(".navigation");

const showMenu = () => {
  overlay.classList.add("show__menu");
};

const hideMenu = () => {
  overlay.classList.remove("show__menu");
};

mobileMenu.addEventListener("click", showMenu);
overlay.addEventListener("click", hideMenu);