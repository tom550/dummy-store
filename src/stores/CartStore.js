import { writable } from 'svelte/store'
import { getCart } from '../utils/shopify.js'

async function initialCart(id) {
  console.log('Fetching initial cart with id:', id)
  const cart = await getCart(id)
  console.log('Initial cart:', cart)
  cartStore.set(cart)
}

const id = localStorage.cartId
const idIsValid = id ? id.startsWith('gid://shopify/Cart/') : false

console.log('Stored cart ID:', id)
console.log('ID is valid:', idIsValid)

if (idIsValid) {
  initialCart(id)
}

const cartStore = writable()

cartStore.subscribe((data) => {
  if (!data) return
  console.log('Cart updated:', data)
  localStorage.cartId = data.id
})

export default cartStore