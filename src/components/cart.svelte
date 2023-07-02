<script>
import { getCart } from '../utils/shopify.js';


function getCartId() {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        clearInterval(intervalId);
        resolve(cartId);
      }
    }, 100); // Check every 100 milliseconds

    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000); // Timeout after 5 seconds
  });
}


async function getCartItems() {
    const cartId = await getCartId();
    if (!cartId) {
        return [];
    }
    const cart = await getCart(cartId);
    let items = [];
    cart.lines.nodes.forEach(item => {
        const title = item.merchandise.product.title;
        const totalPrice = item.cost.subtotalAmount.amount;
        const Image = item.merchandise.image.url;
        const quantity = item.quantity;
        items.push({
            title,
            totalPrice,
            Image,
            quantity
    });
    });

    console.log('cart items:', items);

    return items;
}
getCartItems();

async function checkoutUrl() {
    const cartId = await getCartId();
    const cart = await getCart(cartId);
    console.log('checkout url:', cart.checkoutUrl);
    return cart.checkoutUrl;
}
</script>

<div class="cart h-screen flex flex-col justify-center items-center">
    <h1 class="text-4xl font-semibold">Items (refresh to update)</h1>
    {#await getCartItems() then items}
        {#each items as item}
        <div class="cart-item p-5 flex">
            <div class="image px-2">
                <img class="h-10 w-10" src={item.Image} alt="{item.title}">
            </div>
            <div class="values">
                <p>Handle: {item.title}</p>
                <p>Price: ${item.totalPrice}</p>
                <p>quantity: {item.quantity}</p>
            </div>
        </div>
        {/each}
        {#await checkoutUrl() then checkoutUrl}
            <a class="bg-yellow-300 rounded border font-bold p-3" href={checkoutUrl}><button>Checkout</button></a>
        {/await}
    {/await}

</div>


<style>

.cart {
    position: absolute;
    top: 0;
    right: 0;

}

</style>