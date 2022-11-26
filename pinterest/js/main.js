function showCursorInfo() {
  console.log(e.clientY);
  console.log(e.pageY);
  console.log(e.offsetY);
  console.log(e.screenY);
  $("input[name='clientY']").val(e.clientY); //clientY 스크롤과 상관이 없다(화면 안에서 적용)
  $("input[name='pageY']").val(e.pageY);
  $("input[name='offsetY']").val(e.offsetY);
  $("input[name='screenY']").val(e.screenY); // 브라우저 끝 부분 기준(상단-모니터 화면 전체) val = 불러올때
}
const cursor = $(".cursor");
$(window).on("mousemove", function (e) {
  // mousemove 마우스 움직일때 작동
  //showCursorInfo(); // 필요핳 시 위에 값 출력
  gsap.to(cursor, { left: e.clientX, top: e.clientY }); //.to - 어디어디로 가라 / 커서가 client,xy를 따라 이동
});
const itemListUL = $("#works .itemList");

let grid = null; // const와 let은 블랙스코프이기 떄문에 전역으로 잡아준다

$.ajax({
  //json 불러 오는 법
  url: "../data/typo.json", //링크 불러오기 index 기준
  success: function (res) {
    // 정보 가져와서 뿌러주기
    console.log(res);
    const itemList = res.typoList;
    let output = ""; // 공백 생성
    $.each(itemList, function (idx, item) {
      // 콜백 함수 each는 배열을 불러올때 사용
      output += `
        <li class="item ${item.category}">
          <a href="../images/${item.img}" data-fancybox="${item.category}" data-caption="${item.title}">
            <div class="img">
              <img src="../images/${item.img}" alt="" />
            </div>
            <div class="info">
              <h2>${item.title}</h2>
              <p class="desc">${item.desc}</p>
              <p class="point">
                <span>${item.point}</span>
              </p>
            </div>
          </a> 
        </li>
        `;
    });
    itemListUL.html(output); // each 문이 다 돌고 나서 output html을 넣어준다
    Fancybox.bind("[data-fancybox]"); // 위에 있는 output fancybox를 실행시킬때 사용 / item url이 있어야 하고 해당  url 뒤에 data-fancybox=""를 html(또는 위에 output)에 입력해주어야 작동한다
    $(".itemList").imagesLoaded(function () {
      //imagesLoaded를 사용하기 위해선 해당 콜백 안에 함수들을 넣어두면 된다
      grid = $(".itemList").isotope({
        //isotope 사용 법 - ajax 에서 불러와야 하기때문에 그 안으로 넣어줘야 한다 succes안으로 이동
        // options
        itemSelector: ".item",
        layoutMode: "masonry", // 여기서 끝을 내면 문제가 생긴다(정렬은 되나 absolute가 설정이 된 상태라 높이의 문제 이미지가 불러오는데 시간이 걸리고 높이가 높기 때문에 imgesLoaded사용 필수)
        getSortData: {
          // 정렬인 sorting를 시행 하기전 미리 getsortDate를 정의해야 한다
          point: ".point parseFloat", // point - .point :클래스의 값을 가져온다
          title: ".title",
        },
      });
    });
  },
});

$("#filter li").on("mouseenter", function () {
  //li에 마우스 엔터가 적용되면 콜백함수 적용
  gsap.killTweensOf(".cursor"); //들어가면 커서의 움직임을 지워준다(해주지 않으면 커서 이동시 동작 오류 발생 )
  $(".cursor .txt").text("CLICK"); //.cursor .txt에 가져다 댔을 때 CLICK이라는 글이 나타난다
  gsap.to(".cursor", {
    //to 어디어디로 가라 cursor의 변수명을 불러와라
    width: 80,
    height: 80,
    backgroundColor: "#f00",
    ease: "elastic",
    duration: 1,
  });
});
$("#filter li").on("mouseleave", function () {
  //li에 마우스가 떠나면
  gsap.killTweensOf(".cursor"); //커서의 움직임을 지울때
  $(".cursor .txt").text(""); //기존의 클릭 텍스트 공백 으로 표현하고
  gsap.to(".cursor", {
    //기존 설정으로 돌려두기
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    ease: "power4", //power은 1,2,3,4가 있고 부드럽게 들어가는 표현이다
    duration: 0.2,
  });
});

$("#filter li").on("click", function () {
  //"#filter li"를 클릭시
  if ($(this).hasClass("on")) return; //this -"#filter li" 에서 on을 가지고 있으면 리턴시킨다
  $(this).addClass("on").siblings("li").removeClass("on"); // on이 있으면 빼게 해준다 이럴때 커서가 가려지면 scss에서 pointer-events:none를 해준다
  const _filter = $(this).data("filter"); //적용시킬 필터의 li 코드에 클래스로 data-filter을 입력 후 / 불러와 줘야 한다
  console.log(_filter);
  grid.isotope({
    //전역으로 설정한 그리드를 불러와 필터링을 실행해 준다
    filter: `.${_filter}`, //필터는 클래스 명으로 정의 한다
    sortBy: ["point", "title"], // [point, title]로 정렬하겠다는 뜻  (같이 사용할때 배열로 사용한다)
    sortAscending: false, //true  내리차순, false 올림차순
  });
});

$(".itemList").on("mouseenter", "li", function () {
  // .itemList에 마우스 엔터시 li생성 및 실행
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
