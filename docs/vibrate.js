const starWars = document.querySelector('#starwars');
const superMario = document.querySelector('#supermario');
const powerRangers = document.querySelector('#powerrangers');

starWars.addEventListener('click', function(){
  navigator.vibrate([
    500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 
    450, 110, 200, 110, 170, 40, 500
  ]);
});

superMario.addEventListener('click', function(){
  navigator.vibrate([
    125, 75, 125, 275, 200, 275, 125, 75, 125, 275,
    200, 600, 200, 600
  ]); 
});