$("#startModal").modal("show");

/**
 * map
 * width map
 * height map
 * box size
 */

const app = new App("map", 15, 10, 50, 2);

/**
 * Rocks
 * Guns
 */

// Setting rocks and guns
app.map.set(30, 4);
app.setPlayers(2);

setInterval(() => {
  app.cleanPlayerCanvas();
  app.map.drawMapGame();
  app.drawPlayer();
  app.dibuja();
}, 1000 / 50);

// Global constants related with keys
const up = 38;
const down = 40;
const left = 37;
const right = 39;

$(".welcome").hide();
$(".to").hide();
$(".the").hide();
$(".game").hide();
$("button").hide();
$("#messageBox").show();

setTimeout(() => {
  $(".welcome").toggle(500);
  $(".to").toggle(1000);
  $(".the").toggle(1500);
  $(".game").toggle(2000);
  $("#startButton").show(3000);
}, 1000);

// $(document).on('ready', heartBit())

setInterval(() => {
  $("#startButton").animate(
    {
      opacity: 0.25,
    },
    500,
    function () {
      $(this).animate({ opacity: 1 }, 500);
    }
  );
}, 2500);
