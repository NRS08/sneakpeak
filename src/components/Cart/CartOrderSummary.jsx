import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';
import { useNavigate } from 'react-router-dom';

const OrderSummaryItem = props => {
  const { colorMode } = useColorMode();
  const { label, value, children } = props;
  var p = 0;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text
        fontWeight="medium"
        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
      >
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = props => {
  const navigate = useNavigate();
  var p = 0;
  Object.keys(props).map(index => {
    p = p + props[index].price;
  });
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(p)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(p)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={() => navigate('/checkout')}
      >
        Checkout
      </Button>
    </Stack>
  );
};
