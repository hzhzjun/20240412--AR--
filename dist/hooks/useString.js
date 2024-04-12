export const useLineString = (str) => {
  return str.replace(/[A-Z]/g, function($1, index) {
    return `${index === 0 ? '' : '-'}${$1.toLowerCase()}`;
  });
};
export function useRandomString() {
  return Math.random().toString(32).slice(2);
}
