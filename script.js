console.log("script loaded");

let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

if (window.pageYOffset <= 80) {
  navbar.classList.remove("hide");
  navbar.classList.remove("scrolled");
}

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 80) {
    navbar.classList.remove("hide");
    navbar.classList.remove("scrolled");
  }

  if (currentScroll > lastScrollY && currentScroll > 100) {
    navbar.classList.add("hide");
    navbar.classList.remove("scrolled");
  } else if (currentScroll < lastScrollY) {
    navbar.classList.remove("hide");
    navbar.classList.add("scrolled");
  }
  lastScrollY = currentScroll;
});

const faqs = document.querySelectorAll(".faqq");

faqs.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains("active");

    faqs.forEach((otherBtn) => {
      if (otherBtn !== button) {
        otherBtn.classList.remove("active");
        otherBtn.nextElementSibling.style.maxHeight = "0px";
      }
    });

    button.classList.toggle("active");
    answer.style.maxHeight = isActive ? "0px" : answer.scrollHeight + "px";
  });
});

const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");
const signinForm = document.getElementById("signinForm");

openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    modalOverlay.classList.remove("active");
  }
});

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Sign in attempt:", { email, password });
  alert("Sign in functionality would go here!");

  modalOverlay.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  if (!menuToggle || !sidebar) {
    console.error("Elements not found!");
    return;
  }

  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
  });

  function closeSidebar() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  }

  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  const sidebarSignUpBtn = document.querySelector(".sidebar .signin-btn");
  if (sidebarSignUpBtn) {
    sidebarSignUpBtn.addEventListener("click", () => {
      modalOverlay.classList.add("active");
      closeSidebar();
    });
  }

  const allNavLinks = document.querySelectorAll(".nav-link, .sidebar-link");

  function setActiveLink() {
    let current = "";
    const scrollY = window.pageYOffset;

    allNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href.startsWith("#")) return;

      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          current = sectionId;
        }
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});
