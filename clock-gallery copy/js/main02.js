// const w = 1200;
// const total = $(".carousel .face").length;
// const angle = 360 / total;
// console.log(total);
// const tz = Math.routnd(w / 2 / Math.tan(Math.PI / total));
// $(".carousel").css({ transform: `translateZ(-${tz}px)` });
// $(".carousel .face").each(function (idx, item) {});
// $.each($(".carousel .face"), function (idx, item) {
//   $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
// });
const w = 1200;
const total = $(".carousel .face").length;
const angle = 360 / total;
const tz = Math.round(w / 2 / Math.tan(Math.PI / total));
let tr = 0;
$(".carousel").css({ transform: `translateZ(-${tz}px)` });
$(".carousel .face").each(function (idx, item) {});
$.each($(".carousel .face"), function (idx, item) {
  $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
});

// gsap.to(".carousel", { rotateY: 30, delay: 3 });

$(window).on("mousewheel", function (e) {
  const wheel = e.originalEvent.deltaY;
  if (wheel > 0) {
    tr += angle;
  } else {
    tr -= angle;
  }
  gsap.to(".carousel", { rotateY: tr });
});
