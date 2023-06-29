const tabButtons = $(".tab-button");
const tabContents = $(".tab-content");

// tabButtons.on("mouseover", function (e) {
//   switchTab(target.index());
// });

$(".list").click(function (e) {
  switchTab(e.target.dataset.id);
});

function switchTab(index) {
  tabButtons.removeClass("orange");
  tabButtons.eq(index).addClass("orange");

  tabContents.removeClass("show");
  tabContents.eq(index).addClass("show");
}
