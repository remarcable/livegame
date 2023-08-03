import { getLabelForInteractionTypeName } from './getLabelForInteractionTypeName';

export default ({ type, ...i }) => {
  const label = getLabelForInteractionTypeName(type);
  if (type === 'SHOW_BREAK') {
    return `${label}: ${i.title}`;
  }

  if (type === 'ESTIMATION_GAME') {
    return `${label}: ${i.title} • ${i.estimationGame.question}`;
  }

  if (type === 'ESTIMATION_VOTING') {
    return `${label}: ${i.title} • ${i.estimationVoting.question}`;
  }

  if (type === 'ESTIMATION_WAITING') {
    return `${label}: ${i.title}`;
  }

  if (type === 'FULL_SHOW_GAME') {
    return `${i.fullShowGame.gameNumber}. Spiel: ${i.title}`;
  }

  if (type === 'FULL_SHOW_WAITING') {
    return `${i.title} • Warten`;
  }

  if (type === 'PARTICIPATION_VOTING') {
    return `${i.title} • Zuschaueraktivierung`;
  }

  console.error(`No text for type ${type} implemented`);
  return `${label}: ${i.title}`;
};
