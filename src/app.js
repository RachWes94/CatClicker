let numOfClicks = 0;

$('img').click(function(e) {
  numOfClicks++;
  $('h1').html(`Clicks: ${numOfClicks}`);
});
