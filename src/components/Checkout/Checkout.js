import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  Stack,
  Box,
  Input,
  RadioGroup,
  Radio,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { CartItem } from './CartItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/order/';
  const url2 = 'https://sneakpeak-api.herokuapp.com/api/v1/cart';
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('Okay');
  const [status, setStatus] = useState('error');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getData() {
      try {
        // setIsLoading(true);
        const { data } = await axios.get(url2, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data.cart);
        // setIsLoading(false);
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

  const d = data;
  const token = localStorage.getItem('token');
  const placeOrder = async () => {
    try {
      setIsLoading(true);
      const name = document.querySelector('.name').value;
      const email = document.querySelector('.email').value;
      const address = document.querySelector('.address').value;
      const zipCode = document.querySelector('.zipCode').value;
      const city = document.querySelector('.city').value;
      const { data } = await axios.post(
        url,
        {
          name,
          email,
          address,
          zipCode,
          city,
          items: d,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const del = await axios.delete(url2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus('success');
      setMessage('Order Placed');
      // console.log(data);
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      setIsLoading(false);
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
        navigate('/confirmed');
      }, 500);
    } catch (error) {
      setStatus('error');
      setMessage(error.response.data.msg);
      console.log(error);
      setIsLoading(false);
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      document.querySelector('.name').value = '';
      document.querySelector('.email').value = '';
      document.querySelector('.address').value = '';
      document.querySelector('.zipCode').value = '';
      document.querySelector('.city').value = '';
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
      }, 3000);
    }
  };
  var p = 0;
  data.map(item => {
    p = p + parseInt(item.price);
  });
  const radioClick = v => {
    if (v === 'card') {
      const v = document.querySelector('.cardDetails');
      v.style.display = 'flex';
    }
    if (v === 'cash') {
      const v = document.querySelector('.cardDetails');
      v.style.display = 'none';
    }
  };

  return (
    <Box
      height={'100vh'}
      width="95vw"
      pt={2}
      pl={3}
      pr={0}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box
        className="alert"
        w={'95vw'}
        display={'none'}
        justifyContent="center"
        position="fixed"
        top={'10px'}
      >
        <Alert status={status} position={'absolute'} w={'auto'}>
          <AlertIcon />
          {message}
        </Alert>
      </Box>
      <Box
        ml={{ base: '0', md: '4', lg: '8' }}
        mr={{ base: '0', md: '4', lg: '8' }}
        className="left"
        w={{ base: '100%', md: '50%', lg: '70%' }}
      >
        <Text
          fontSize={'2xl'}
          fontWeight="bold"
          mb={4}
          mt={{ base: '4', md: '0' }}
        >
          Shipping Information
        </Text>
        <Stack direction={'column'} gap={2}>
          <Box display={'flex'} flexDirection="column" gap={1}>
            <Text fontWeight={'600'}>Full Name</Text>
            <Input className="name" placeholder="Full Name" />
          </Box>
          <Box display={'flex'} flexDirection="column" gap={1}>
            <Text fontWeight={'600'}>Street Address</Text>
            <Input className="address" placeholder="Shipping Address" />
          </Box>
          <Box display={'flex'} flexDirection="row" gap={3}>
            <Box width={'40%'} display={'flex'} flexDirection="column" gap={1}>
              <Text fontWeight={'600'}>Zip Code</Text>
              <Input className="zipCode" placeholder="Zip Code" />
            </Box>
            <Box width={'60%'} display={'flex'} flexDirection="column" gap={1}>
              <Text fontWeight={'600'}>City</Text>
              <Input className="city" placeholder="City" />
            </Box>
          </Box>
          <Box display={'flex'} flexDirection="column" gap={1}>
            <Text fontWeight={'600'}>Email Address</Text>
            <Input className="email" placeholder="you@email.com" />
          </Box>
        </Stack>
        <Text fontSize={'2xl'} fontWeight="bold" mb={4} mt={4}>
          Payment Information
        </Text>
        <RadioGroup className="paymentRadio">
          <Stack direction={'column'} gap={4}>
            <Radio onClick={() => radioClick('card')} value={'card'}>
              <Text onClick={() => radioClick('card')} fontWeight={'600'}>
                Credit/Debit Card
              </Text>
            </Radio>
            <Radio onClick={() => radioClick('cash')} value={'cash'}>
              <Text onClick={() => radioClick('cash')} fontWeight={'600'}>
                Cash on Delivery
              </Text>
            </Radio>
          </Stack>
        </RadioGroup>
        <Box display={'none'} className="cardDetails" mt={4} mb={2}>
          <Stack direction={'column'} gap={2} mb={{ base: '0', md: '6' }}>
            <Box display={'flex'} flexDirection="row" gap={3}>
              <Box
                width={'50%'}
                display={'flex'}
                flexDirection="column"
                gap={1}
              >
                <Text fontWeight={'600'}>Card Number</Text>
                <Input placeholder="Card Number" />
              </Box>
              <Box
                width={'50%'}
                display={'flex'}
                flexDirection="column"
                gap={1}
              >
                <Text fontWeight={'600'}>Name on Card</Text>
                <Input placeholder="Card Name" />
              </Box>
            </Box>
            <Box display={'flex'} flexDirection="row" gap={3}>
              <Box
                width={'50%'}
                display={'flex'}
                flexDirection="column"
                gap={1}
              >
                <Text fontWeight={'600'}>Expiry Date</Text>
                <Input placeholder="01/22" />
              </Box>
              <Box
                width={'50%'}
                display={'flex'}
                flexDirection="column"
                gap={1}
              >
                <Text fontWeight={'600'}>CVV</Text>
                <Input placeholder="XXX" />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider orientation={{ base: 'horizontal', md: 'vertical' }} />

      <Box p="0" className="right" w={{ base: '100%', md: '50%', lg: '30%' }}>
        <Text
          fontSize={'2xl'}
          fontWeight="bold"
          mb={4}
          mt={{ base: '4', md: '0' }}
        >
          Order Summary
        </Text>
        <Box width={'100%'} p={2}>
          <Stack spacing="6">
            {data.map(item => (
              <CartItem key={item._id} {...item} />
            ))}
          </Stack>
          <Box
            p={2}
            mt={8}
            mb={4}
            // ml={2}
            // mr={2}
            w={'100%'}
            display={'flex'}
            direction="row"
            justifyContent={'center'}
            alignItems="center"
            gap="4"
          >
            <Input size="lg" placeholder="Discount Code" />
            <Button colorScheme="blue" mr={2}>
              Apply
            </Button>
          </Box>
        </Box>
        <Box
          ml={{ base: '0', md: '2' }}
          display={'flex'}
          flexDirection="column"
          alignItems={'center'}
        >
          <Box m={4} display={'flex'} w="100%" justifyContent={'space-between'}>
            <Text fontWeight={'600'}>Subtotal</Text>
            <Text mr={4}>{`Rs ${p}`}</Text>
          </Box>
          <Box m={4} display={'flex'} w="100%" justifyContent={'space-between'}>
            <Text fontWeight={'600'}>Discount</Text>
            <Text mr={4}>{`-Rs ${discount}`}</Text>
          </Box>
          <Divider mb={4} orientation="horizontal" />
          <Box
            m={4}
            mt={0}
            display={'flex'}
            w="100%"
            justifyContent={'space-between'}
          >
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Order Total
            </Text>
            <Text mr={3} fontSize={'xl'} fontWeight={'bold'}>{`Rs ${
              p - discount
            }`}</Text>
          </Box>
          {/* <Button mb={4} w="100%" colorScheme="blue">
            Place Order
          </Button> */}
          {isLoading ? (
            <Button
              isLoading
              loadingText="Loading"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="start"
              mb={4}
              w="100%"
            >
              Submit
            </Button>
          ) : (
            <Button onClick={placeOrder} mb={4} w="100%" colorScheme="teal">
              Place Order
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Checkout;
