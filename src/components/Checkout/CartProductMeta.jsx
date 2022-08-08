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
import { PriceTag } from '../Cart/PriceTag';

export const CartProductMeta = props => {
  const { image, name, size, price } = props;
  const { colorMode } = useColorMode();
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        // rounded="lg"
        width="100px"
        height="100px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack
          spacing="0.5"
          direction={'row'}
          justify="space-between"
          width={'100%'}
          // width={{ base: '100%', md: '90vw', lg: '100%' }}
          pr={2}
        >
          <Text width={'50%'} fontWeight="medium">
            {name}
          </Text>
          <PriceTag width={'50%'} price={price} currency={'INR'} />
        </Stack>
        <HStack
          spacing="1"
          mt="1"
          color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
        >
          <Text>{`Size: ${size}`}</Text>
        </HStack>
      </Box>
    </Stack>
  );
};
