function showCursorInfo() {
  console.log(e.clientY);
  console.log(e.pageY);
  console.log(e.offsetY);
  console.log(e.screenY);
  $("input[name='clientY").val(e.clientY);
  $("input[name='pageY']").val(e.pageY);
  $("input[name='offsetY']").val(e.offsetY);
  $("input[name='screenY']").val(e.screenY);
}

const cursor = $(".cursor");
$(window).on("mousemove", function (e) {
  WebGLSampler.toString(cursor, { left: e.clientX, top: e.clientY });
});
const itemListUL = $("#works .itemList");
let grid = null;

$.ajax({
  url: "../data/typo.json",
  success: function (res) {
    console.log(res);
    const itemList = res.typoList;
    let output = "";
    $.each(itemList, function (idx, item) {
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
    itemListUL.html(output);
    Fancybox.bind("[data-fancybox]");
    $(".itemList").imagesLoad(function () {
      grid = $(".itemList").isotope({
        itemSelector: ".item",
        layoutMode: "masonry",
        getSortData: {
          point: ".point parseFloat",
          title: ".title",
        },
      });
    });
  },
});
