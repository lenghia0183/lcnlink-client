export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    console.warn(`[localStorage] Key "${key}" is not available on the server.`);
    return null;
  }

  const rawValue = localStorage.getItem(key);
  if (rawValue === null) return null;

  try {
    // Thử parse JSON
    return JSON.parse(rawValue) as T;
  } catch {
    // Nếu không parse được (chỉ là string hoặc number), trả luôn
    return rawValue as unknown as T;
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
