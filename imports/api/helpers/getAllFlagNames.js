export const getAllFlagNames = (users) =>
  users
    .map((u) => Object.keys(u.flags || {}))
    .reduce((akk, newEl) => [...akk, ...newEl], [])
    .reduce((distinctFlags, newFlag) => {
      const flagIsInResultArray = distinctFlags.includes(newFlag);

      if (flagIsInResultArray) {
        return distinctFlags;
      }

      return [...distinctFlags, newFlag];
    }, []);
