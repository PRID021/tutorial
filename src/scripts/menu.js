
document.addEventListener('astro:page-load', () => {

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active')
    });
});

