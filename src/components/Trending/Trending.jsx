import { Box, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { ProductCard } from '../Grid/ProductCard';
// import { products } from './_data';
import { ProductGrid } from '../Grid/ProductGrid';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';

export const Trending = () => {
  const url = process.env.REACT_APP_API_BASE_URL + '/shoes?limit=4';
  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        // console.log(data);
        setProducts(data.shoes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <Stack mb={8} w="100%" justify="center" align="center">
        <Text fontSize={'2xl'}>Loading...</Text>
      </Stack>
    );
  }
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Heading justify={{ base: 'center', md: 'start' }} mb={4}>
        Trending
      </Heading>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductGrid>
    </Box>
  );
};
