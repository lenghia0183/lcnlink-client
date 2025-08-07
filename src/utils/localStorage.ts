export const getLocalStorageItem = <T>(itemName: string): T | null => {
  // Kiểm tra xem có phải đang chạy trên trình duyệt không
  if (typeof window === "undefined") {
    console.warn("localStorage is not available on the server.");
    return null;
  }

  try {
    const item = localStorage.getItem(itemName);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setLocalStorageItem = (itemName: string, value: unknown): void => {
  // Kiểm tra xem có phải đang chạy trên trình duyệt không
  if (typeof window === "undefined") {
    console.warn("localStorage is not available on the server.");
    return;
  }

  try {
    localStorage.setItem(itemName, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeLocalStorageItem = (itemName: string): void => {
  // Kiểm tra xem có phải đang chạy trên trình duyệt không
  if (typeof window === "undefined") {
    console.warn("localStorage is not available on the server.");
    return;
  }

  try {
    localStorage.removeItem(itemName);
  } catch (error) {
    console.error(error);
  }
};
