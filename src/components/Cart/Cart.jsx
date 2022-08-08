import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { CartItem } from './CartItem';
import { CartOrderSummary } from './CartOrderSummary';
import { useNavigate } from 'react-router-dom';
import { Link as LinkRouter } from 'react-router-dom';

export const Cart = () => {
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/cart';
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { colorMode } = useColorMode();
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data.cart);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getData();
    } else {
      navigate('/login');
    }
  }, []);
  // console.log(data);
  if (isLoading) {
    return (
      <Stack h={'100vh'} w="100%" justify="center" align="center">
        <Text fontSize={'4xl'}>Loading...</Text>
      </Stack>
    );
  }
  return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
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
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({data.length})
          </Heading>

          <Stack spacing="6">
            {data.map(item => (
              <CartItem key={item._id} {...item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary {...data} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={colorMode === 'light' ? 'blue.500' : 'blue.200'}>
              <LinkRouter to="/">Continue shopping</LinkRouter>
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
