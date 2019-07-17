$(".header__icon").on("click", () => {
  $(".header__search").focus();
})

$(".header__search").focusin(function() {
  $(".header_bottom").css("background", "#f0f0f0");
});
$(".header__search").focusout(function() {
  $(".header_bottom").css("background", "#ffffff");
});