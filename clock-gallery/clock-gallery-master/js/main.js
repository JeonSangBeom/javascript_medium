const main = $("#main");
let fullPage = null; // 풀페이지를 만들고 안에 데이터가 없다는 뜻으로 null을 입력해 둔다(초기화 전 실행 조건 중 하나)
//함수 선언  hoisting
loadJson("../data/bigbang.json"); //처음 시작시 빅뱅을 불러운다(화면 실행)
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const clockList = res.clock;
      let output = "";
      $.each(clockList, function (idx, item) {
        //console.log(item);
        output += `
          <div class="section" style="background-image:url(${item.bg})">
            <div class="info">
              <p class="category" data-splitting>${item.category}</p>
              <h2 class="title" data-splitting>${item.title}</h2>
              <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
              <p class="price" data-splitting>CHF ${item.price}</p>
            </div>
          </div>
          `;
      });
      main.html(output);
      Splitting(); //문자 나눠서 불러올때 사용
      charMotion(`.section:nth-child(1) .char`); // 함수  로딩이 되자마자 실행
      //      $.fn.fullpage.destroy("all");
      if (fullPage !== null) {
        //풀페이지가 널이 아니라면(안에 무언가 있다면)
        $.fn.fullpage.destroy("all"); //풀페이지를 초기화 시켜준다 (겹치는 현상으로 써줘야 한다)
      }
      $("#main").fullpage({
        // 풀페이지가 시작되며 실행
        scrollBar: true,
        onLeave: function (origin, destination, direction) {
          charMotion(`.section:nth-child(${destination.index + 1}) .char`);
        },
      });
      fullPage = $.fn.fullpage; // 풀페이지가 만들어진 후 (초기화 전 적용)
      console.log(fullPage);
    },
  });
}

function charMotion(char) {
  gsap.from(char, {
    y: -200,
    opacity: 0,
    ease: "bounce",
    duration: 1.5,
    delay: 0.5,
    stagger: {
      //each: 0.01, // 개별갯수
      amount: 0.25, // 전체갯수
      from: "random",
    },
  });
}

// $.get("../data/bigbang.json").done(function (res) {
//   console.log(res);
// });

// loadJson("../data/bigbang.json");
// particlesJS.load("bgParticle", "../data/particlesjs-config.json");

// $("#gnb li a").on("click", function (e) {
//   e.preventDefault();
//   if ($(this).hasClass("selected")) return;
//   $(this).addClass("selected").parent().siblings("li").find("a").removeClass("selected");
//   const jsonFile = $(this).data("json");
//   loadJson(jsonFile);
// });

// function addZero(num) {
//   if (num < 10) {
//     return "0" + num;
//   } else {
//     return "" + num;
//   }
// }

//1번째 배열....
/*
const jsonFileList = ["../data/bigbang.json", "../data/classic.json"];
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const idx = $(this).index();
  console.log(idx);
  loadJson(jsonFileList[0]);
});
*/
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  //console.log(jsonFile);
  if ($(this).hasClass("selected")) {
    return;
  }
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});
