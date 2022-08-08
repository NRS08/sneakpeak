import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { PriceTag } from '../Cart/PriceTag';
// import { CartProductMeta } from '../Cart/CartProductMeta';
import { CartProductMeta } from './CartProductMeta';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CartItem = props => {
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/cart';
  const { name, size, image, price } = props;
  const currency = 'INR';
  const colorMode = useColorMode();
  const navigate = useNavigate();
  const onClickDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const d = await axios.delete(url + `/${props._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      direction={{
        base: 'row',
        md: 'row',
      }}
      justify="space-between"
      align="center"
      boxShadow={
        colorMode === 'light'
          ? '0 5px 15px rgba(0, 0, 0, 0.1)'
          : '0 5px 15px rgba(0, 0, 0, 0.6)'
      }
      transition={'all 0.3s linear'}
      _hover={{
        boxShadow:
          colorMode === 'light'
            ? '0 5px 15px rgba(0, 0, 0, 0.2)'
            : '0 5px 15px rgba(0, 0, 0, 0.7)',
      }}
      overflow="hidden"
      rounded={'lg'}
    >
      <CartProductMeta name={name} image={image} price={price} size={size} />
      {/* Desktop
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <PriceTag price={price} currency={currency} />
      </Flex>

      Mobile
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <PriceTag price={price} currency={currency} />
      </Flex> */}
    </Flex>
  );
};
