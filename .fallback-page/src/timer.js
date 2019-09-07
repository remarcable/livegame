import Timer from 'timrjs';
const timer = Timer('2019-09-28T20:00', {
  formatOutput: 'dd Tage hh Stunden mm Minuten ss Sekunden',
});

timer.start();

timer.ticker(({ formattedTime }) => {
  document.getElementById('app').innerText = formattedTime;
});

timer.finish((e) => {
  document.getElementById('app').innerText = 'boom';
});
