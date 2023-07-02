import config from './config'
import {
  ProductsQuery,
  ProductQuery,
  CartQuery,
  CartCreateMutation,
  CartLinesAddMutation,
  CartLinesRemoveMutation,
} from './graphql'
import cartStore from '../stores/CartStore.js'

export async function fetchStorefront(query, variables = {}) {
  const endpoint = `${config.shopDomain}/api/${config.apiVersion}/graphql.json`
  const key = config.publicToken

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    })


    const body = await result.json()
    if (body.errors) {
      console.error('Error fetching data from Shopify:', body.errors)
      return null
    }
    return body.data
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: 'Error receiving data',
    }
  }
}

// Return 250 products
export async function getProducts(first = 250) {
  const response = await fetchStorefront(ProductsQuery, { first })
  return response?.products.nodes
}

// Return product by id
export async function getProduct(id) {
  const response = await fetchStorefront(ProductQuery, { id })
  return response?.product
}

// Return cart by id
export async function getCart(id) {
  const response = await fetchStorefront(CartQuery, { id })
  return response.cart
}

// Create cart and return cart object
async function createCart(merchandiseId, quantity) {
  const response = await fetchStorefront(CartCreateMutation, {
    merchandiseId,
    quantity,
  })
  return response
}

export async function addToCart(merchandiseId, quantity) {
  const cartId = localStorage.cartId
  const isValid = cartId ? cartId.startsWith('gid://shopify/Cart/') : false
  if (isValid) {
    const addedCart = await fetchStorefront(CartLinesAddMutation, {
      cartId,
      merchandiseId,
      quantity,
    })
    cartStore.set(addedCart.cartLinesAdd.cart)
    return addedCart.cartLinesAdd.cart
  } else {
    const createdCart = await createCart(merchandiseId, quantity)
    console.log('created cart:', createdCart.cartCreate.cart);
    cartStore.set(createdCart.cartCreate.cart)
    return createdCart.cartCreate.cart
  }
}

export async function removeCartLine(lineId) {
  const cartId = localStorage.cartId
  console.log(cartId)
  const removedLineCart = await fetchStorefront(CartLinesRemoveMutation, {
    cartId,
    lineIds: [lineId],
  })
  console.log('cart with removed line:', removedLineCart.cartLinesRemove.cart)
  cartStore.set(removedLineCart.cartLinesRemove.cart)
  return removedLineCart.cartLinesRemove.cart
}