// Focus input search.
$(".header__icon").on("click", () => {
  $(".header__search").focus();
});
// Zooming input search and add new styles for bg.
$(".header__search").focusin(function() {
  $(".header_bottom").css("background", "#f0f0f0");
});
$(".header__search").focusout(function() {
  if ($(".header__search").hasClass("header__search_float")) {
    $(".header_bottom").css("background", "#f0f0f0");
  } else {
    $(".header_bottom").css("background", "#ffffff");
  }
});
// Adding range in form.
// К сожалению, не смог разобраться, как сделать ползунок цен без плагина...Да и с плагином не особо получилось.
$(".filter__range").slider({
  min: 1,
  max: 69,
  range: true,
  step: 1,
  values: [0, 69]
});
// Adding styles for float menu.
$(document).on("scroll", function() {
  let position = $(window).scrollTop();
  if (position > 350) {
    $(".header").addClass("header_float");
    $(".header_top").addClass("header_top_float");
    $(".header__logo").addClass("header__logo_float");
    $(".header__logo-img_float").css("display", "block");
    $(".header__logo-img").css("display", "none");
    $(".header__name").css("display", "none");
    $(".header__name_float").css("display", "block");
    $(".header_bottom").addClass("header_bottom_float");
    $(".header__menu").addClass("header__menu_float");
    $(".header__link").addClass("header__link_float");
    $(".header__label").addClass("header__label_float");
    $(".header__search").addClass("header__search_float");
    $(".main").css("margin", "197.5px 0 0 0");
  } else {
    $(".header").removeClass("header_float");
    $(".header_top").removeClass("header_top_float");
    $(".header__logo").removeClass("header__logo_float");
    $(".header__logo-img_float").css("display", "none");
    $(".header__logo-img").css("display", "block");
    $(".header__name").css("display", "block");
    $(".header__name_float").css("display", "none");
    $(".header_bottom").removeClass("header_bottom_float");
    $(".header__menu").removeClass("header__menu_float");
    $(".header__link").removeClass("header__link_float");
    $(".header__label").removeClass("header__label_float");
    $(".header__search").removeClass("header__search_float");
    $(".main").css("margin", "0");
  }
});

// custom select
// Взял код из одного своего проекта.
let selectDur = 500;

$(".filter__select_hidden").each(function() {
  let $this = $(this),
    selectOption = $this.find("option"),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(":selected");
  $this.hide();
  $this.wrap('<div class="filter__select"></div>');
  $("<div>", {
    class: "filter__gap",
    text: selectedOption.text()
  }).insertAfter($this);
  let selectGap = $this.next(".filter__gap");
  $("<ul>", {
    class: "filter__list"
  }).insertAfter(selectGap);
  let selectList = selectGap.next(".filter__list");
  for (let i = 0; i < selectOptionLength; i++) {
    $("<li>", {
      class: "filter__item",
      html: $("<span>", {
        class: "filter__value",
        text: selectOption.eq(i).text()
      })
    })
      .attr("data-value", selectOption.eq(i).val())
      .appendTo(selectList);
  }
  let selectItem = selectList.find("li");
  selectList.slideUp(0);
  selectGap.on("click", function(e) {
    if (!$(this).hasClass("on")) {
      $(this).addClass("on");
      selectList.slideDown(selectDur);

      selectItem.first().css("display", "none");
      selectItem.on("click", function() {
        selectItem.removeClass("selected");
        selectOption.removeAttr("selected");
        selectOption.eq(selectItem.index(this)).attr("selected", true);
        $(this).addClass("selected");
        selectGap.text(
          $(this)
            .find("span")
            .text()
        );
        selectList.slideUp(selectDur);
        selectGap.removeClass("on");
      });
    } else {
      selectList.slideUp(selectDur);
      $(this).removeClass("on");
    }
  });
});

$(document).mouseup(function (e){
  let gap = $(".filter__gap.on"),
      list = $(".filter__list");
  if (!gap.is(e.target) && gap.has(e.target).length === 0) {
    gap.removeClass("on");
    list.slideUp(selectDur)
  }
});
