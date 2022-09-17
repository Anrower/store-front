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

export const GET_CURRENCIES = gql`
  query currencies {
    currencies {
      label
      symbol
    }
  }
`

export const GET_CATEGORIES = gql`
  query categories {
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