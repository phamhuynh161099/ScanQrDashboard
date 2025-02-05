import { useState, useEffect } from 'react';

function useLocalStorage(key:string, initialValue:any) {
  // State để lưu trữ giá trị
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Lỗi khi đọc từ localStorage:", error);
      return initialValue;
    }
  });

  // Hàm để cập nhật giá trị và lưu vào localStorage
  const setValue = (value:any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Lỗi khi ghi vào localStorage:", error);
    }
  };

  // Theo dõi sự thay đổi của localStorage từ các tab/window khác
  useEffect(() => {
      const handleStorageChange = (event:any) => {
          if (event.key === key) {
              try {
                  const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
                  setStoredValue(newValue);
              } catch (error) {
                  console.error("Lỗi khi xử lý thay đổi localStorage:", error);
              }
          }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
          window.removeEventListener('storage', handleStorageChange);
      };
  }, [key, initialValue]);


  return [storedValue, setValue];
}

export default useLocalStorage;