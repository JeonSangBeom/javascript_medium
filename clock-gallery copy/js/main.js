const cube = $(".cube");
$(".pagination li").on("click", function () {
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");
  const tx = $(this).data("rotationX");
  const ty = $(this).data("rotation-y");
  gsap.to(cube, { rotateX: tx, rotateY: ty, ease: "back.inOut", duration: 1 });
  // console.log(tx, "===", ty);
});

Math.tan(600 / 360 / 12);
