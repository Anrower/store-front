import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
   query categories { 
	  category {
		  products {
			  id
			  brand
			  category
		  }
	  }
  }
`;

export const GET_BY_CATEGORY = gql`
  query categories($input: CategoryInput) { 
    category (input: $input) {
    products {
      id
      brand
      gallery
      name
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