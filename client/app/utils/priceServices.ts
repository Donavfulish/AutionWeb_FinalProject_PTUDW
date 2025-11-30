export const formatPrice = (num: number | undefined): string => {
  if (num === undefined || isNaN(num)) return "";
  return num.toLocaleString("en-US");
};

export const parseNumber = (str: string): number | undefined => {
  if (!str) return undefined;
  return Number(str.replace(/[.,\s]/g, ""));
};
