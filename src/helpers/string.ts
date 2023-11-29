export const getEllipsisText = (text: string, length: number) => {
  return text.substring(0, length).concat("...");
};

export const ellipseAddress = (
  address = "",
  maxCharacters = 6,
  maxLastCharacters: number | undefined = 4,
): string => {
  if (!address) return "";
  return `${address.substring(0, maxCharacters)}...${address.slice(
    -(maxLastCharacters ? maxLastCharacters : maxCharacters),
  )}`;
};
