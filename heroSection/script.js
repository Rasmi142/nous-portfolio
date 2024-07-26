document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const body = document.querySelector('body');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    if (dropdownMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.querySelectorAll('.menu-item').forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
      toggleMenu();
      // Add this line to navigate back to the home page
      window.location.href = '#';
    });
  });

  // Start the content animation and then background transition
  setTimeout(() => {
    body.classList.remove('black-background');
  }, 3500); // This delay should match the end of the content animation

  setTimeout(() => {
    document.querySelector('.hero').style.background = '#7e848c';
    
  }, 3500); // Match this delay with the end of the body background transition
});