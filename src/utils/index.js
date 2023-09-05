/**
 * This function calculates the total price of a new order
 * @param {Array} productList cartProducts, Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (productList) => {
    return productList.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
}