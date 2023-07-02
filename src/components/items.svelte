<script>
import Item from './item.svelte';

export let products

</script>

<div class="gap-10 grid grid-rows-2 grid-cols-3">
    {#each products as product}
        <Item {product} />
    {/each}
</div>

<style></style>