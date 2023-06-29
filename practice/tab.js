const tabButtons = $(".tab-button");
const tabContents = $(".tab-content");

tabButtons.on("mouseover", function (e) {
  const target = $(e.target);

  tabButtons.removeClass("orange");
  target.addClass("orange");

  tabContents.removeClass("show");
  tabContents.eq(target.index()).addClass("show");
});
