let carousel = 0;
const max = $(".carousel-inner").children().length;
for (let i = 0; i < max; i++)
  $(".carousel-control").append(
    `<button data-idx="${i}" type="button"></button>`
  );

updateCarousel();
toggleCycle(true);

$(".carousel-control>button").click((e) => goto(e.currentTarget.dataset.idx));

$(".carousel-prev").click(prev);

$(".carousel-next").click(next);

let clickStart;
let originalX;
let dragging = false;
$(".carousel-inner").on("mousedown", (e) => {
  clickStart = e.clientX;
  originalX = getTransform(e.currentTarget);
  dragging = true;
  toggleCycle(false);
  e.currentTarget.style.transition = "none";
});
$(".carousel-inner").on("mousemove", (e) => {
  if (!dragging) return;
  e.currentTarget.style.transform = `translateX(${
    originalX + e.clientX - clickStart
  }px)`;
});
$(".carousel-inner").on("mouseup", (e) => {
  toggleCycle(true);
  e.currentTarget.style.transition = "transform .25s";
  const dragRatio =
    (carousel - getTransform(e.currentTarget)) / e.currentTarget.clientWidth -
    carousel;
  if (dragRatio > 0.25) next();
  else if (dragRatio < -0.25) prev();
  else updateCarousel();
  dragging = false;
});

function toggleCycle(state) {
  if (!this.cycle) {
    if (!state) return;

    this.cycle = setInterval(() => next(true), 5000);
  } else {
    if (state) return;

    clearInterval(this.cycle);
    this.cycle = null;
  }
}

function getTransform(elem) {
  return (
    parseInt(/translateX\(([-\d.]+)px\)/.exec(elem.style.transform)?.[1]) || 0
  );
}

function prev() {
  goto(carousel - 1);
}

function next(cycle) {
  if (cycle) goto((carousel + 1) % max);
  else goto(carousel + 1);
}

function goto(idx) {
  if (idx < 0) idx = 0;
  if (idx >= max) idx = max - 1;
  carousel = parseInt(arguments[0]);
  updateCarousel();
}

function updateCarousel() {
  $(".carousel-inner").css(
    "transform",
    `translateX(${-carousel * $(".carousel-inner > .item").width()}px)`
  );
  if (carousel == max - 1) $(".carousel-next").hide();
  else $(".carousel-next").show();

  if (carousel == 0) $(".carousel-prev").hide();
  else $(".carousel-prev").show();

  $(".carousel-control>button").removeClass("active");
  $(`.carousel-control>button[data-idx="${carousel}"]`).addClass("active");
}
