import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiGift } from 'react-icons/fi';
import { PriceTag } from './PriceTag';

export const CartProductMeta = props => {
  const { image, name, description, size } = props;
  const { colorMode } = useColorMode();
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        // rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            fontSize="sm"
          >
            {description}
          </Text>
        </Stack>
        {/* {isGiftWrapping && (
          <HStack
            spacing="1"
            mt="3"
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
          >
            <Icon as={FiGift} boxSize="4" />
            <Link fontSize="sm" textDecoration="underline">
              Add gift wrapping
            </Link>
          </HStack>
        )} */}
        <HStack
          spacing="1"
          mt="3"
          color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
        >
          <Text fontWeight={'600'}>Size:</Text>
          <Text>{size}</Text>
        </HStack>
      </Box>
    </Stack>
  );
};
