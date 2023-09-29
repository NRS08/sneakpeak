import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Box, Stack, Text, Link } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../Checkout/CartItem';

const Order = () => {
  const url =
    'https://rich-pink-nematode-boot.cyclic.app/api/v1/order/myorders';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [s, setS] = useState('pending');
  const { colorMode } = useColorMode();
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url + '/' + s, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        var array1 = [];
        data.orders.map(arr => {
          array1 = array1.concat(arr.items);
        });
        setData(array1);
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
  }, [s]);

  if (isLoading) {
    return (
      <Stack mb={8} w="100%" justify="center" align="center">
        <Text fontSize={'2xl'}>Loading...</Text>
      </Stack>
    );
  }

  return (
    <>
      <Navbar />
      <Box height={'100vh'} width="98vw" position={'relative'}>
        <Box
          width={'100%'}
          height="10vh"
          display={'flex'}
          justifyContent={{ base: 'space-around', md: 'center' }}
          alignItems="center"
          gap={{ base: '2', md: '8', lg: '24' }}
          bg={colorMode == 'light' ? '#f7fafc' : '#171923'}
        >
          <Link
            onClick={() => setS('pending')}
            fontSize={'lg'}
            fontWeight={'600'}
          >
            Pending
          </Link>
          <Link
            onClick={() => setS('delivered')}
            fontSize={'lg'}
            fontWeight={'600'}
          >
            Delivered
          </Link>
        </Box>
        <Box width={'100%'} p={2} display="flex" justifyContent="center">
          {data.length === 0 ? (
            <Text mt={4} fontSize={'2xl'} fontWeight={'bold'}>
              Nothing to Show
            </Text>
          ) : (
            <Stack width={{ base: '95%', md: '70%', lg: '50%' }} spacing="6">
              {data.map(item => (
                <CartItem key={item._id} {...item} />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Order;
