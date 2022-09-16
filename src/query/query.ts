import { gql } from "@apollo/client";

export const GET_BY_CATEGORY = gql`
  query categories($input: CategoryInput!) { 
    category (input: $input) {
    products {
      id
      brand
      gallery
      name
      inStock
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
  }
`;

export const GET_CURRENCY = gql`
  query currency {
    categories {
      products {
        prices {
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query currency {
    categories {
      name
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query product($id: String!) { 
    product(id: $id) {
      id
      inStock
      name
      gallery
      brand
      description
      attributes {
        type
        id
        items {
          value
          displayValue
        }
      }
      prices {
        amount
        currency {
          label
          symbol
          
        }
      }
    }
  }
`