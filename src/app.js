let numOfClicksCat1 = 0;
let numOfClicksCat2 = 0;
const label1 = 'Cat 1';
const label2 = 'Cat 2';
const labelBox1 = $('.labelBox1');
const labelBox2 = $('.labelBox2');

labelBox1.html(`${label1}`);
labelBox2.html(`${label2}`);
$('.cat1label').html(`Clicks: 0`);
$('.cat2label').html(`Clicks: 0`);


$('.cat1').click(function(e) {
  numOfClicksCat1++;
  $('.cat1label').html(`Clicks: ${numOfClicksCat1}`);
});

$('.cat2').click(function(e) {
  numOfClicksCat2++;
  $('.cat2label').html(`Clicks: ${numOfClicksCat2}`);
});
