document.addEventListener('click', (event) => {
    let elmntClickedId = event.target.id;
    if (elmntClickedId == 'hamburger' || elmntClickedId == 'menu-list') {
        navbar.classList.toggle('open');
    }
    else if (navbar.classList.value == 'open' && elmntClickedId != 'hamburguer') {
        navbar.classList.toggle('open');
    }
})




