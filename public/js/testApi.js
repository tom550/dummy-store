export async function fetchProductData() {
    const storefrontAccessToken = 'fd801b9859acebe4bf71e4e32d31a208';
  
    const endpoint = `https://astro-stuff-store.myshopify.com/api/2022-01/graphql.json`;
  
    const query = `
    {
      products(first: 100) {
        edges {
          node {
            handle
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  `;
  
  
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken
    };
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: query })
      });
  
      const data = await response.json();
      const products = data.data.products.edges;
      return getProductArray(products);
}


function getProductArray (products) {

    let productsArray = [];
    products.forEach(product => {
        let handle = product.node.handle;
        let price = product.node.variants.edges[0].node.price;
        let image = product.node.images.edges[0].node.originalSrc;
        let id = product.node.variants.edges[0].node.id;
        
        productsArray.push({
            handle: handle,
            price: price,
            image: image,
            id: id
        });
      });
    return productsArray;
}