export const customFlex = (
  justifyContent = "flex-start",
  alignItems = "flex-start",
  flexDirection = "row"
) => {
  return {
    display: "flex",
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap: "wrap",
  };
};
