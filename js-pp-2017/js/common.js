// you can either user http://tp-lens.popschool.fr/api which works online
var url = "http://localhost:8000/api/";
var app = document.getElementById("application");

var printInfo = function() {
  app.innerHTML = "<ul><li>URL: " + url + "</li></ul>"
}
