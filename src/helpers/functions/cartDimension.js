export const calculateDimensionsAndWeight = (cart) => {
  let totalHeight = 0;
  let totalWeight = 0;
  let maxLength = 0;
  let maxWidth = 0;

  cart.forEach((item) => {
    const itemCount = parseInt(item.count, 10); // Ensure count is treated as a number
    const itemLength = item.length;
    const itemWidth = item.width;
    const itemHeight = item.height;
    const itemWeight = item.weight;

    // Calculate the max length and width (longest and widest items)
    if (itemLength > maxLength) {
      maxLength = itemLength;
    }
    if (itemWidth > maxWidth) {
      maxWidth = itemWidth;
    }

    // Sum up height and weight considering item counts
    totalHeight += itemHeight * itemCount;
    totalWeight += itemWeight * itemCount;
  });

  // Return the calculated dimensions and weight
  return {
    length: maxLength,
    width: maxWidth,
    height: totalHeight,
    weight: totalWeight,
  };
};

