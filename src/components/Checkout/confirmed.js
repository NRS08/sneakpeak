import React from 'react';
import { Box, Link, Text, Button } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Confirmed = () => {
  return (
    <Box
      height={'100vh'}
      width={'100vw'}
      display="flex"
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      gap={6}
    >
      <Text fontSize={'2xl'} fontWeight="bold">
        Thanks For Ordering{' '}
      </Text>
      <Text fontSize={'2xl'} fontWeight="bold">
        Order Confirmed{' '}
      </Text>
      <LinkRouter to={'/'}>
        <Button
          colorScheme="blue"
          variant={'outline'}
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
          textAlign="center"
        >
          Continue Shopping
        </Button>
      </LinkRouter>
    </Box>
  );
};

export default Confirmed;
