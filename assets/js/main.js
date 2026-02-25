(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        },
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: false,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  $(".team-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    margin: 25,
    dots: false,
    loop: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    },
  });

  async function initTestimonials() {
    try {
      const resp = await fetch("/assets/js/reviews.json");
      const data = await resp.json();
      const container = document.querySelector(".testimonial-carousel");

      container.innerHTML = data
        .map(
          (item) => `
          <div class="testimonial-item text-center">
            <img
              class="border rounded-circle p-2 mx-auto mb-3"
              src="${item.photo}"
              style="width: 80px; height: 80px"
            />
            <h5 class="mb-0">${item.name}</h5>
            <small class="text-warning">${"★".repeat(item.stars)}</small>
            <div class="testimonial-text bg-light text-center p-4">
              <p class="mb-0 d-webkit-box-truncate">
                ${item.review}
              </p>
            </div>
          </div>
        `,
        )
        .join("");
      // Testimonials carousel
      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 3,
          },
        },
      });
    } catch (err) {
      console.error("Gagal Memuat Ulasan: ", err);
    }
  }

  initTestimonials();
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const closeBtn = document.getElementById("close-banner");

  // Fungsi untuk memunculkan banner dengan halus
  function showBanner() {
    banner.style.visibility = "visible";
    banner.style.opacity = "1";
  }

  // Fungsi untuk menghilangkan banner dengan halus
  function hideBanner() {
    banner.style.opacity = "0";
    setTimeout(() => {
      banner.style.visibility = "hidden";
    }, 500); // Harus sama dengan durasi transition di CSS (0.5s)
  }

  // Cek status cookie
  if (!getCookie("gki_cookie_consent")) {
    // Beri jeda 1 detik setelah halaman load baru muncul (biar lebih estetik)
    setTimeout(showBanner, 1000);
  }

  acceptBtn.addEventListener("click", function () {
    setCookie("gki_cookie_consent", "accepted", 30);
    hideBanner();
  });

  closeBtn.addEventListener("click", hideBanner);

  // --- Fungsi Helper Cookie (Sama seperti sebelumnya) ---
  function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      value +
      "; expires=" +
      date.toUTCString() +
      "; path=/; Secure; SameSite=Strict";
  }

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
});
