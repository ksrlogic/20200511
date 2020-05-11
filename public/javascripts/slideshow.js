var index = 0;

function slideshows() {
  $(function () {
    var b = `.ghibli${index}`;
    $(b).fadeIn(1000, console.log("done"));
    setTimeout(() => {
      $(b).fadeOut(3000);
    }, 4000);

    index++;
    var imagelength = document.getElementsByClassName("ghibli").length;
    if (index > imagelength - 1) {
      index = 0;
    }
    setTimeout(slideshows, 7000);
  });
}
slideshows();
