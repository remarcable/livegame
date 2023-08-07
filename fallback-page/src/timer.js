import { create } from 'timrjs';

const timer = create({
  startTime: '2023-10-14 19:00',
  formatOutput: 'dd Tage hh Stunden mm Minuten ss Sekunden',
});

timer.start();

const element = document.getElementById('countdown');
timer.ticker(({ formattedTime }) => {
  element.innerText = formattedTime;
});

timer.finish((e) => {
  element.innerText = 'boom';
});
