const products = [
  {
    key: "cap",
    name: "모자",
  },
  {
    key: "shirts",
    name: "셔츠",
    options: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "pants",
    name: "바지",
    options: [28, 30, 32, 34],
  },
];

$(".form-group select")
  .eq(0)
  .change(function () {
    updateOptions(products.find((p) => p.key === this.value));
  });

products.forEach((product) =>
  $(".form-group select")
    .eq(0)
    .append(`<option value="${product.key}">${product.name}</option>`)
);
updateOptions(products[0]);

function updateOptions(product) {
  const deatilOption = $(".form-group select").eq(1);

  if (!product.options) {
    deatilOption.hide();
    return;
  }

  deatilOption.html(
    product.options.reduce(
      (accum, option) => (accum += `<option>${option}</option>`),
      ""
    )
  );
  deatilOption.show();
}
