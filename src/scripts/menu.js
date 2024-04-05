document.addEventListener('astro:page-load', () => {
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.getElementById('mySidenav').style.width = "250px";
    });

    document.getElementById('myClosebtn').addEventListener('click',()=>{
        document.getElementById('mySidenav').style.width = "0px";
    });
});




