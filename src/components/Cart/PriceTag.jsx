import {
  HStack,
  Text,
  useColorModeValue as mode,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
export function formatPrice(value, opts = {}) {
  const { locale = 'en-US', currency = 'INR' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = props => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
    props;
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(price, {
          currency,
        })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </HStack>
  );
};

const Price = props => {
  const { colorMode } = useColorMode();
  const { isOnSale, children, textProps } = props;
  const defaultColor = colorMode === 'light' ? 'gray.700' : 'gray.400';
  const onSaleColor = colorMode === 'light' ? 'gray.400' : 'gray.700';
  const color = isOnSale ? onSaleColor : defaultColor;
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  );
};

const SalePrice = props => {
  const { colorMode } = useColorMode();
  return (
    <Text
      as="span"
      fontWeight="semibold"
      color={colorMode === 'light' ? 'gray.800' : 'gray.100'}
      {...props}
    />
  );
};
