import "./home/HomePage";
// window.addEventListener("DOMContentLoaded", function () {
//   var outerDiv = document.querySelector(".homepage_content");
//   var innerDiv = document.querySelector(".body_modal");

//   outerDiv.addEventListener("scroll", function () {
//     var scrollTop = outerDiv.scrollTop;
//     innerDiv.style.top = 50 + scrollTop + "%";
//   });
// });
window.addEventListener("DOMContentLoaded", function () {
  var outerDiv = document.querySelector(".homepage_content");
  var innerDiv = document.querySelector(".body_modal");

  outerDiv.addEventListener("scroll", function () {
    var scrollTop = outerDiv.scrollTop;
    var outerHeight = outerDiv.offsetHeight;
    var innerHeight = innerDiv.offsetHeight;
    var scrollableHeight = outerHeight - innerHeight;

    innerDiv.style.top = 50 + (scrollTop / scrollableHeight) * 100 + "%";
  });
});