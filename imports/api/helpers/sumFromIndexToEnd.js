export default function sumFromIndexToEnd(index, arr) {
  return arr.reduce((akk, next, i) => (i <= index ? akk : akk + next), 0);
}
