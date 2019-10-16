export default (str) => [...str].map((s) => (s === ' ' ? ' ' : 'X')).join('');
