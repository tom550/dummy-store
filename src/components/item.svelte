<script>
  import { addToCart } from '../utils/shopify.js';
  export let product;
  async function onSubmitt(ev) {
    ev.preventDefault();
    await addToCart(product.id, 1);
  }
</script>

<div class="w-40">
  <a class="w-full h-full" href="/products/{product.handle}">
  <img class="h-40 w-40" src={product.image} alt={product.handle} />
  <h2 class="text-wrap">{product.handle}</h2>
  <p>${product.price}</p>
  <form on:submit="{onSubmitt}">
    <button class="bg-yellow-300 p-3 mt-2 border border-black rounded" type="submit">Add to cart</button>
  </form>
  </a>
</div>

<style></style>
