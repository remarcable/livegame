export function mapSort(linkedList) {
  if (linkedList.length <= 1) {
    return linkedList;
  }

  const sortedList = [];
  const map = new Map();
  let currentId = null;

  for (let i = 0; i < linkedList.length; i += 1) {
    const item = linkedList[i];
    if (item.previous === null) {
      // first item
      currentId = item._id;
      sortedList.push(item);
    } else {
      map.set(item.previous, i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    const nextItem = linkedList[map.get(currentId)];
    sortedList.push(nextItem);
    currentId = nextItem._id;
  }

  return sortedList;
}
