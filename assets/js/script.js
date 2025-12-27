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
      document.querySelector('#scroll-top')?.classList.add('active');
    } else {
      document.querySelector('#scroll-top')?.classList.remove('active');
    }

    // scroll spy
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
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top }, 500, 'linear');
      }
    }
  });

  // ✅ EmailJS init + submit (NO <script> tags here)
  if (window.emailjs) {
    emailjs.init("0GDAV11cTYj04JQna");

    $("#contact-form").on("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("contact_service", "template_contact", this).then(
        function () {
          alert("Form Submitted Successfully");
          document.getElementById("contact-form").reset();
        },
        function (error) {
          console.error("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
    });
  } else {
    console.warn("EmailJS not loaded. Make sure email.min.js is included in index.html before script.js");
  }

});

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

// typed.js effect
if (window.Typed) {
  new Typed(".typing-text", {
    strings: [
      "AI/ML Development",
      "Distributed Training",
      "Computer Vision",
      "Building Fintech Solution's",
      "RAG Development"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
  });
} else {
  console.warn("Typed.js not loaded. Include typed.js before script.js");
}

// fetch skills from skills.json (your file is at Portfolio/skills.json)
async function fetchData() {
  const response = await fetch("./skills.json");
  if (!response.ok) throw new Error("skills.json not found (HTTP " + response.status + ")");
  return await response.json();
}

function showSkills(skills) {
  const skillsContainer = document.getElementById("skillsContainer");
  if (!skillsContainer) {
    console.error("skillsContainer not found in HTML");
    return;
  }

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

  // Re-init tilt for dynamically injected items
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".bar.tilt"), {
      max: 15,
      speed: 400,
    });
  }
}

fetchData()
  .then(showSkills)
  .catch(err => console.error("Skills load failed:", err));

// tilt effect for any existing .tilt elements
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15, speed: 400 });
}
