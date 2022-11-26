//글쓰며 나타나기
Splitting();
const typed = new Typed(".typing .txt", {
  strings: [
    "앞으로 성장할 제 소개를 하겠습니다",
    "but,try <strong>steadily</strong>",
    "I want to be a <strong>full stack developer</strong>.",
    "my name is <strong>Jeon sang beom</strong>",
    "keep an <strong>eyes on me.</strong>",
  ],
  typeSpeed: 50,
  startDelay: 1000,
  backSpeed: 20,
  backDelay: 3000,
  loop: true,
});

//splitting / scrollerTrigger사용하기
gsap.defaults({
  duration: 1,
  ease: "back",
});
ScrollTrigger.defaults({
  // 확인하기
  //markers: true,
});
const introTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "top top",
    end: "bottom top",
    onUpdate: function (self) {
      //console.log(self);
      gsap.set("#intro", { filter: `blur(${self.progress * 10}px)` });
    },
  },
});

const profileTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#profile",
    start: "top-=100 top",
    end: "bottom top",
    pin: true,
    scrub: 1,
  },
});
profileTL
  .from("#profile h2 .char", {
    x: "+=100",
    opacity: 0,
    stagger: {
      each: 0.1,
    },
  })
  .from(CSSRulePlugin.getRule("#profile h2:after"), {
    cssRule: { scaleX: 0 },
    duration: 2,
    ease: "power2",
  })

  .from("#profile .contents .char", {
    x: "+=100",
    opacity: 0,
    stagger: {
      each: 0.1,
    },
  });

const careerTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#career",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: 1,
  },
});
careerTL
  .from("#career h2 .char", {
    x: "+=100",
    opacity: 0,
    stagger: {
      each: 0.1,
    },
  })
  .from(CSSRulePlugin.getRule("#career h2:after"), {
    cssRule: { scaleX: 0 },
    duration: 2,
    ease: "power2",
  })

  .from("#career .contents .char", {
    x: "+=100",
    opacity: 0,
    stagger: {
      each: 0.1,
    },
  });

const skillTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#skill",
    start: "top top",
    end: "bottom+=1000 top",
    pin: true,
    scrub: 0.5,
  },
});
skillTL
  .from("#skill h2 .char", {
    x: "+=100",
    opacity: 0,
    stagger: {
      each: 0.1,
    },
  })
  .from(CSSRulePlugin.getRule("#skill h2:after"), {
    cssRule: { scaleX: 0 },
    duration: 2,
    ease: "power2",
  })
  .from(
    "#skill ul li",
    {
      y: "-100",
      opacity: 0,
      stagger: {
        each: 0.1,
      },
    },
    "circleStart"
  )
  .to(
    "#skill ul li .line circle ",
    {
      strokeDashoffset: 0,
      ease: "linear",
      duration: 3,
    },
    "circleStart+=1"
  );

function showCursorInfo() {
  $("input[name='clientY']").val(e.clientY);
  $("input[name='pageY']").val(e.pageY);
  $("input[name='offsetY']").val(e.offsetY);
  $("input[name='screenY']").val(e.screenY);
}
const cursor = $(".cursor");
$(window).on("mousemove", function (e) {
  //showCursorInfo();
  gsap.to(cursor, { left: e.clientX, top: e.clientY });
});
const itemListUL = $("#portfolio .itemList");

let grid = null;

$.ajax({
  url: "../data/portfolio.json",
  success: function (res) {
    //console.log(res);
    const itemList = res.portfolioList;
    let output = "";
    $.each(itemList, function (idx, item) {
      output += `
        <li class="item ${item.category}">
          <a href="../images/portfolio/${item.img}" 
                  data-fancybox="${item.category}" 
                  data-caption="${item.title} <a href='${item.link}' target='_blank'>LINK</a>">
            <div class="img">
              <img src="../images/portfolio/${item.img}" alt="" />
            </div>
            <div class="info">
              <h2>${item.title}</h2>
              <p class="desc">${item.desc}</p>
              <p class="skill">skill : <strong>${item.skill}</strong></p>
              <p class="period">period : <strong>${item.period}</strong></p>
              <p class="category">category : <strong>${item.category}</strong></p>
            </div>
          </a>
        </li>
        `;
    });
    itemListUL.html(output);
    Fancybox.bind("[data-fancybox]");
    $(".itemList").imagesLoaded(function () {
      grid = $(".itemList").isotope({
        // options
        itemSelector: ".item",
        layoutMode: "masonry",
        getSortData: {
          point: ".point parseFloat",
          title: ".title",
        },
      });
      const portfolioTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
        },
      });
      portfolioTL
        .from("#portfolio h2 .char", {
          x: "+=100",
          opacity: 0,
          stagger: {
            each: 0.1,
          },
        })
        .from(CSSRulePlugin.getRule("#portfolio h2:after"), {
          cssRule: { scaleX: 0 },
          duration: 2,
          ease: "power2",
        })
        .from("#portfolio #filter ul li", {
          x: "+=100",
          opacity: 0,
          stagger: {
            each: 0.1,
          },
        })
        .from("#portfolio .itemList li", {
          y: "+=100",
          opacity: 0,
          stagger: {
            each: 0.1,
          },
        });
      const contactTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
        },
      });
      contactTL
        .from("#contact h2 .char", {
          x: "+=100",
          opacity: 0,
          stagger: {
            each: 0.1,
          },
        })
        .from(CSSRulePlugin.getRule("#contact h2:after"), {
          cssRule: { scaleX: 0 },
          duration: 2,
          ease: "power2",
        })
        .from("#contact ul .char", {
          x: "+=100",
          opacity: 0,
          stagger: {
            each: 0.1,
          },
        })
        .from("#contact form", {
          x: "+=100",
          opacity: 0,
        });
    });
  },
});

$("#filter li").on("mouseenter", function () {
  gsap.killTweensOf(".cursor");
  $(".cursor .txt").text("CLICK");
  gsap.to(".cursor", {
    width: 80,
    height: 80,
    backgroundColor: "#f00",
    ease: "elastic",
    duration: 1,
  });
});
$("#filter li").on("mouseleave", function () {
  gsap.killTweensOf(".cursor");
  $(".cursor .txt").text("");
  gsap.to(".cursor", {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    ease: "power4",
    duration: 0.2,
  });
});

$("#filter li").on("click", function () {
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");
  const _filter = $(this).data("filter");
  console.log(_filter);
  grid.isotope({
    filter: `.${_filter}`,
    sortBy: ["point", "title"],
    sortAscending: false, //true  내리차순, false 올림차순
  });
});

$(".itemList").on("mouseenter", "li", function () {
  gsap.killTweensOf(".cursor");
  $(".cursor .txt").text("VIEW");
  gsap.to(".cursor", {
    width: 80,
    height: 80,
    backgroundColor: "#1971c2",
    ease: "elastic",
    duration: 1,
  });
});
$(".itemList").on("mouseleave", "li", function () {
  gsap.killTweensOf(".cursor");
  $(".cursor .txt").text("");
  gsap.to(".cursor", {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    ease: "power4",
    duration: 0.2,
  });
});

//porfolio
const popup = $("#popup");
const btnOneday = popup.find(".oneday");
const btnClose = popup.find(".close");
btnOneday.on("click", function () {
  //popup.hide();
  Cookies.set("oneday", "one", { expires: 1 });
  gsap.to("#popup", {
    duration: 1,
    top: "-100%",
    ease: "back.in",
    onComplete: function () {
      popup.remove();
    },
  });
});
//cookie를 이용
btnClose.on("click", function () {
  //popup.hide();
  gsap.to("#popup", {
    duration: 1,
    top: "-100%",
    ease: "back.in",
    onComplete: function () {
      popup.remove();
    },
  });
});

console.log(Cookies.get("oneday"));
if (Cookies.get("oneday") === "one") {
  popup.hide();
} else {
  popup.show();
}

