export default ({ type, ...i }) => {
  if (type === 'SHOW_BREAK') {
    return `Unterbrechung: ${i.title}`;
  }

  if (type === 'ESTIMATION_GAME') {
    return `Schätzen: ${i.title} • ${i.estimationGame.question}`;
  }

  if (type === 'ESTIMATION_VOTING') {
    return `Schätzen: ${i.title} • ${i.estimationVoting.question}`;
  }

  if (type === 'ESTIMATION_WAITING') {
    return `Schätzen: ${i.title} • Warten`;
  }

  if (type === 'FULL_SHOW_GAME') {
    return `${i.fullShowGame.gameNumber}. Spiel: ${i.title}`;
  }

  if (type === 'FULL_SHOW_WAITING') {
    return `${i.title} • Warten`;
  }

  console.error(`No text for type ${type} implemented`);
  return `${i.title} • ${type}`;
};
