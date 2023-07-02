const PRODUCT_FRAGMENT = `#graphql
fragment productFragment on Product {
  id
  title
  handle
  description(truncateAt: 160)
  descriptionHtml
  images (first: 30) {
    nodes {
      url
      width
      height
      altText
    }
  }
  options (first: 50) {
    id
    name
    values
  }
  variants(first: 250) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      priceV2 {
        amount
        currencyCode
      }
      selectedOptions {
          name
          value
      }
    }
  }
  featuredImage {
    url
    width
    height
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}
`

const CART_FRAGMENT = `#graphql
  fragment cartFragment on Cart {
    id
    totalQuantity
    checkoutUrl
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ...on ProductVariant {
            id
            title
            image {
              url
              altText
              width
              height
            }
            product {
              handle
              title
            }
          }
        }
        cost {
          amountPerQuantity{
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

// Query products array
export const ProductsQuery = `#graphql
  query ($first: Int!) {
      products(first: $first) {
          nodes {
              ...productFragment
          }
      }
  }
  ${PRODUCT_FRAGMENT}
`

// Query single product
export const ProductQuery = `#graphql
  query ($id: ID!) {
    product(id: $id) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`

// Query cart
export const CartQuery = `#graphql
  query ($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`

// Mutation to create cart
export const CartCreateMutation = `#graphql
  mutation ($merchandiseId: ID!, $quantity: Int = 1) {
    cartCreate(input: {lines: {merchandiseId: $merchandiseId, quantity: $quantity}}) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`

// Mutation to add to cart
export const CartLinesAddMutation = `#graphql
  mutation MyMutation($cartId: ID!, $merchandiseId: ID!, $quantity: Int = 1) {
    cartLinesAdd(
      cartId: $cartId
      lines: {merchandiseId: $merchandiseId, quantity: $quantity}
    ) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`

// Mutation to remove line item from cart
export const CartLinesRemoveMutation = `#graphql
  mutation MyMutation($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`