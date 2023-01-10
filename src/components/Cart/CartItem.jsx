import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const QuantitySelect = props => {
  const colorMode = useColorMode();

  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={colorMode === 'light' ? 'blue.500' : 'blue.200'}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = props => {
  const url = 'https://rich-pink-nematode-boot.cyclic.app/api/v1/cart';
  const { setCartData, cartData } = useGlobalContext();
  const { name, description, size, image, price } = props;
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
      const cd = cartData.filter(item => {
        return item._id != props._id;
      });
      setCartData(cd);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      direction={{
        base: 'column',
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
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        price={price}
        size={size}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
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
        <Link onClick={onClickDelete} fontSize="sm" textDecor="underline">
          Delete
        </Link>

        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
