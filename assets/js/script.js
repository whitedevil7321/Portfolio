$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // scroll-top button
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy (only highlight nav, no animations)
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        if (this.hash && this.pathname === window.location.pathname) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top,
            }, 500, 'linear');
        }
    });

    // emailjs contact form
<!-- EmailJS SDK -->
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

<script>
(function () {
    // Initialize EmailJS with your public key
    emailjs.init("0GDAV11cTYj04JQna");
})();

// Contact form submission
$("#contact-form").submit(function (event) {
    event.preventDefault(); // Stop page from refreshing

    emailjs.sendForm(
        "contact_service",      // Your EmailJS Service ID
        "template_contact",     // Your EmailJS Template ID
        this                    // The form element
    ).then(
        function () {
            alert("Form Submitted Successfully");
            document.getElementById("contact-form").reset(); // Reset the form
        },
        function (error) {
            console.error("FAILED...", error);
            alert("Form Submission Failed! Try Again");
        }
    );
});
</script>
;

// change title + favicon on tab visibility
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Jeevan Aher";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// typed.js effect (this is only the typing text, not fade)
var typed = new Typed(".typing-text", {
    strings: ["AI/ML Development","Distributed Training","Computer Vision","Building Fintech Solution's","RAG Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// fetch skills from skills.json
async function fetchData() {
    const response = await fetch("skills.json");
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar tilt">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;

    // re-initialize tilt for dynamically added elements
    VanillaTilt.init(document.querySelectorAll(".bar.tilt"), {
        max: 15,
        speed: 400,
    });
}

fetchData().then(data => showSkills(data));


// tilt effect (3D hover tilt only, no fading)
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// disable some dev tools shortcuts
document.onkeydown = function (e) {
    if (e.keyCode == 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};
