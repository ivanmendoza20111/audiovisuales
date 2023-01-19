const formatProduct = ({ productName, productType, productBrand }, short = false) =>
  short ? `${productType} ${productName}` : `${productType} ${productName} ${productBrand}`;

const productListReducer = (acc, cur) => {
  const { id, productName, productType, productBrand, ...rest } = cur;

  if (acc[id]) {
    acc[id].products.push({ name: productName, type: productType, brand: productBrand });
    acc[id].productsFormatted.push(formatProduct(cur));
    acc[id].productsDescription += ', ' + formatProduct(cur, true);
  } else {
    acc[id] = {
      id,
      ...rest,
      products: [{ name: productName, type: productType, brand: productBrand }],
      productsFormatted: [formatProduct(cur)],
      productsDescription: formatProduct(cur, true),
    };
  }

  return acc;
};

export const formatProductFields = (reservations) => {
  return Object.values(reservations.reduce(productListReducer, {}));
};
