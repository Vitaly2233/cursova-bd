export const debounce = (callback: (...args: any) => any, wait: number) => {
  let timer: any = null;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), wait);
  };
};
