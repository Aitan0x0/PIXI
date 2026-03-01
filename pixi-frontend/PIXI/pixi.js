document.querySelector(".cats-li").addEventListener("click", () => {

  if (document.querySelector(".cats-li .icon").classList.contains("fa-caret-right")) {
    // buttonu deyismek ucun
    document.querySelector(".cats-li .icon").classList.remove("fa-caret-right")
    document.querySelector(".cats-li .icon").classList.add("fa-caret-down")

    document.querySelector(".cats-ul").classList.remove("hide-ul")





  }
  else {
    document.querySelector(".cats-li .icon").classList.remove("fa-caret-down")
    document.querySelector(".cats-li .icon").classList.add("fa-caret-right")
    document.querySelector(".cats-ul").classList.add("hide-ul")
  }




})

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    document.querySelector(".search-profile-nav").classList.add("scroll-nav")
  }
  else {
    document.querySelector(".search-profile-nav").classList.remove("scroll-nav")

  }


})


var swiper = new Swiper(".header .mySwiper", {
  spaceBetween: 30,
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var swiper = new Swiper(".dcounted-games .mySwiper", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});

var swiper = new Swiper(".popular-games .mySwiper", {
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});

var swiper = new Swiper(".free-games .mySwiper", {
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});
var swiper = new Swiper(".categories-carousel .mySwiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})

window.addEventListener("scroll", () => {
  console.log(window.scrollY)
  if (window.scrollY > 243) {
    document.querySelector(".profile-left-side").classList.add("profile-fix")
  }


})


document.querySelectorAll(".password-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.querySelector("i").classList.contains("fa-eye-slash")) {
      btn.querySelector("i").classList.remove("fa-eye-slash")
      btn.querySelector("i").classList.add("fa-eye")
      btn.parentElement.querySelector("input").setAttribute("type", "text")

    }
    else {
      btn.querySelector("i").classList.remove("fa-eye")
      btn.querySelector("i").classList.add("fa-eye-slash")
      btn.parentElement.querySelector("input").setAttribute("type", "password")

    }





  })
});

var swiper = new Swiper(".readmore-left .mySwiper", {
  spaceBetween: 20,
  slidesPerView: 4,
   loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  freeMode: true,
  watchSlidesProgress: true,
});


var swiper2 = new Swiper(".readmore-left .mySwiper2", {
  spaceBetween: 10,
   loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});




const starback = new Starback(canvas, {
  type: 'dot',
  quantity: 150,
  direction: 270,
  backgroundColor: ['#0e1118', '#5c0d76ff'],
  randomOpacity: true,

});










// 243