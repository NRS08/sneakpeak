import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import * as React from 'react';
import { Rating } from './Rating';
import { FavouriteButton } from './FavouriteButton';
import { PriceTag } from './PriceTag';
import { useColorMode } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProductCard = props => {
  const { colorMode } = useColorMode();
  const { product, rootProps } = props;
  const { name, image, price, rating, _id } = product;
  const salePrice = null;
  const navigate = useNavigate();
  const search = () => {
    navigate(`/products/${_id}`, { state: _id });
  };

  return (
    <Stack
      onClick={search}
      cursor="pointer"
      boxShadow={
        colorMode === 'light'
          ? '0 5px 15px rgba(0, 0, 0, 0.3)'
          : '0 5px 15px rgba(0, 0, 0, 0.6)'
      }
      transition={'all 0.3s linear'}
      _hover={{
        boxShadow:
          colorMode === 'light'
            ? '0 5px 15px rgba(0, 0, 0, 0.4)'
            : '0 5px 15px rgba(0, 0, 0, 0.7)',
      }}
      overflow="hidden"
      borderRadius={useBreakpointValue({
        base: 'md',
        md: 'xl',
      })}
      spacing={useBreakpointValue({
        base: '4',
        md: '5',
      })}
      {...rootProps}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${name} to your favourites`}
        />
      </Box>
      <Stack pl={2}>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue('gray.700', 'gray.400')}
            _hover={{ textDecoration: 'underline' }}
            onClick={search}
            cursor="pointer"
          >
            {name}
            {/* <LinkRouter to={{ pathname: `/products/${_id}`, state: _id }}>
            </LinkRouter> */}
          </Text>
          <PriceTag price={price} salePrice={salePrice} currency="INR" />
        </Stack>
        <HStack>
          <Rating defaultValue={Number(rating)} size="sm" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button
          onClick={search}
          className="cart"
          colorScheme="blue"
          isFullWidth
          mb={4}
        >
          Add to cart
        </Button>
        {/* <Link
          pb={2}
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Quick shop
        </Link> */}
      </Stack>
    </Stack>
  );
};
