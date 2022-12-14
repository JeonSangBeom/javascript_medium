const itemListUL = $("#main #itemList");
const lnbUL = $("#main #lnb");

let itemSlider = null;
let itemTweener = null;
let total = 0;
const zAmount = 5000;
const wheelStep = zAmount / 10;
let _z = 0;
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      console.log(res);
      const itemList = res.items;
      let output = "";
      let lnbOutput = "";
      total = itemList.length;
      _z = 0;
      $.each(itemList, function (idx, item) {
        lnbOutput += `
        <li>${item.title}</li>
        `;
        output += `
          <li style="background:${item.bg}; transform:translateZ(${-zAmount * idx}px); z-index:${total - idx} " >
            <div class="info">
              <h2 class="title" data-splitting>${item.title}</h2>
              <p class="desc" data-splitting>${item.desc}</p>
              <a href="${item.link}" target="${item.target}">MORE</a>
            </div>
            <div class="img">
              <img src="${item.img}">
            </div>
          </li>
        `;
      });
      itemListUL.html(output);
      lnbUL.html(lnbOutput);
      gsap.from("#itemList li", {
        z: -100000,
        // y: -1000,
        stagger: {
          from: "start",
          each: 0.2,
        },
      });
      $("#lnb li").eq(0).addClass("on");
    },
    error: function (err) {
      //console.log(err);
      // alert(err.statusText);
      location.href = "error.html";
      return;
    },
  });
}
loadJson("../data/mario.json");

//ajax는 비동기(비동기는 나중에 실행된다)
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});

// 이벤트 위임 (event delegation)
let oldIndex = 0;
const lnbList = $("#lnb li");

// console.log(Math.(10, 5, 6, 2, 3));
$("body").on("click", " #lnb li", function () {
  // console.log("aaa");
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");
  _z = zAmount * $(this).index();
  const _duration = Math.min(1.5, Math.abs($(this).index() - oldIndex) * 0.5);
  $("#itemList li").each(function (idx, item) {
    gsap.to(item, { z: _z - zAmount * idx, duration: _duration });
  });
  oldIndex = $(this).index();
});

$(window).on("mousewheel", function (e) {
  // console.log(e.originalEvent.deltaY);
  console.log(total);
  const wheel = e.originalEvent.deltaY;
  if (wheel > 0) {
    //아래로
    // console.log("아래로 휠");
    if (_z >= zAmount * (total - 1)) {
      _z = zAmount * (total - 1);
      return;
    }
    _z += wheelStep;
  } else {
    if (_z <= 0) {
      _z = 0;
      return;
    }
    _z -= wheelStep;
  }
  const itemList = $("#itemList li");
  // itemList.push("aa");
  // console.log(Array.isArray(itemList)); //유사배열
  // $.each(itemList, function (idx, item) {
  //   gsap.to(item, { z: _z - 5000 * idx });
  // });
  $("#itemList li").each(function (idx, item) {
    gsap.to(item, { z: _z - zAmount * idx });
  });
  // 0~5000==>0,
  // 5000>10000===>1
  // 10000>15000===>2
  // 15000>25000===>3
  const lnbSelected = Math.floor(_z / 5000);
  $("#lnb li").eq(lnbSelected).addClass("on").siblings("li").removeClass("on");
  // console.log("=====", Math.floor(_z / 5000));
  // gsap.to("#itemList li:nth-child(1)", { z: _z });
  // gsap.to("#itemList li:nth-child(2)", { z: _z - 5000 });
  // gsap.to("#itemList li:nth-child(3)", { z: _z - 5000 * 2 });
  // gsap.to("#itemList li:nth-child(4)", { z: _z - 5000 * 3 });
});
