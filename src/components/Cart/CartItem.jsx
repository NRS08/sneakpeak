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
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/cart';
  const {
    isGiftWrapping,
    name,
    description,
    size,
    image,
    price,
    onChangeQuantity,
  } = props;
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
        isGiftWrapping={isGiftWrapping}
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
        <QuantitySelect
          value={1}
          onChange={e => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
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
        <QuantitySelect
          value={1}
          onChange={e => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
