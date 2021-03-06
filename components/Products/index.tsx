import React from 'react';
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import Product, { ProductType } from '@components/Product';
import SearchBar from '@components/SearchBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  grid-auto-rows: minmax(100px, auto);

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface Props {
  products: ProductType[];
}

const Products = (props: Props): JSX.Element => {
  const { products } = props;
  const [searchValue, setsearchValue] = React.useState<string>('');
  const [filteredProducts, setFilteredProducts] = React.useState<any>([]);

  console.log('search val', searchValue)
  const filterProducts = () => {
      const filtered = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log('val', searchValue);
      console.log('here', filtered)
      setFilteredProducts(filtered);
  };
  const delayedQuery = React.useRef(debounce(filterProducts, 500)).current;

  React.useEffect(() => {
    if (searchValue !== '') {
      // delayedQuery();
      // debounce(() => )
    }
  }, [searchValue]);

  const handleSearch = (value: string): void => {
    setsearchValue(value);
  };

  const renderProducts = (): JSX.Element[] => {
    const productsToUse = searchValue !== '' ? filteredProducts : products;
    return productsToUse.map((product: any) => {
      return <Product key={product.id} data={product} />;
    });
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchBar searchValue={searchValue} onChange={handleSearch} />
      </SearchBarContainer>
      <ProductsContainer>{renderProducts()}</ProductsContainer>
    </Container>
  );
};

export default Products;
