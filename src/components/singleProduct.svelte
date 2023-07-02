<script>
    import { addToCart } from '../utils/shopify.js';
    export let product;
    async function onSubmitt(ev) {
        ev.preventDefault();
        await addToCart(product.id, 1);
    }
    export let products;
    export let handle;
    let foundItem;
    products.forEach(product => {
        if (product.handle === handle) {
            foundItem = product;
        }
    });
</script>

<div class="box h-full w-full flex flex-col justify-center items-center">
    <h1 class="text-5xl font-bold">{foundItem.handle}</h1>
    <p>${foundItem.price}</p>
    <img class="h-60 w-60" src={foundItem.image} alt={foundItem.handle} />
    <form action="">
        <button class="bg-yellow-300 p-3 font-bold mt-3 rounded" on:click="{onSubmitt}">Add to cart</button>
    </form>
    <a class="mt-3 bg-yellow-300 font-bold rounded p-3" href="/store">Back to store</a>
</div>


<style></style>