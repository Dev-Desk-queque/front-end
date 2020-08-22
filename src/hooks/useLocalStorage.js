import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storageItem = localStorage.getItem(key);
    if (storageItem) {
      return JSON.parse(storageItem);
    } else {
      return initialValue;
    }
  });

  function setLocalStorage(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  function deleteLocalStorage() {
      localStorage.removeItem(key);
  }

  return [value, setLocalStorage, deleteLocalStorage];
}
