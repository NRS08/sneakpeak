import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Image,
  Text,
  HStack,
  useColorModeValue,
  useColorMode,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Product.css';
import { Rating } from './Grid/Rating';
import { PriceTag } from './Grid/PriceTag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Navbar from './Navbar';

export const Product = props => {
  var url = 'https://sneakpeak-api.herokuapp.com/api/v1/shoes';
  const url2 = 'https://sneakpeak-api.herokuapp.com/api/v1/cart';
  const { cartCount, setCartCount } = useGlobalContext();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [shoeData, setShoeData] = React.useState();
  const [size, setSize] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [status, setStatus] = React.useState('success');
  const [message, setMessage] = React.useState('okay');
  const [isAdded, setIsAdded] = useState(false);
  const location = useLocation();
  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const uri = url + '/' + `${location.state}`;
        const { data } = await axios.get(uri);
        setShoeData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const sellPrice = null;
  const sizes = ['US5', 'US6', 'US7', 'US8', 'US9'];
  var data = [];
  if (!isLoading) {
    data = shoeData.shoe;
  }

  const sizeClick = e => {
    setSize(e.target.value);
  };

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (size === '') {
      setStatus('error');
      setMessage('Select Size');
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
      }, 3000);
    } else if (token) {
      try {
        const { data } = await axios.post(
          url2,
          {
            name: shoeData.shoe.name,
            price: shoeData.shoe.price,
            image: shoeData.shoe.image,
            size: size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartCount(parseInt(cartCount) + 1);
        setIsAdded(true);
        // document.querySelector('.cart').innerHTML = 'Added';
      } catch (error) {
        setStatus('error');
        setMessage(error.response.data.msg);
        console.log(error);
        const alert = document.querySelector('.alert');
        alert.style.display = 'flex';
        setTimeout(() => {
          const alert = document.querySelector('.alert');
          alert.style.display = 'none';
        }, 3000);
      }
    } else {
      navigate('/login');
    }
  };
  if (isLoading) {
    return (
      <Stack h={'100vh'} w="100%" justify="center" align="center">
        <Text fontSize={'4xl'}>Loading...</Text>
      </Stack>
    );
  }
  return (
    <>
      <Navbar />
      <Box
        w={'100%'}
        zIndex={'150'}
        display={'none'}
        className="alert"
        position={'absolute'}
        top="20vh"
        justifyContent="center"
      >
        <Alert
          status={status}
          w={{ base: '100vw', lg: 'auto' }}
          variant={'solid'}
        >
          <AlertIcon />
          {message}
        </Alert>
      </Box>

      <Stack
        align={'center'}
        w={'100%'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box
          className="slider"
          w={{ base: '100%', md: '60%' }}
          h={{ base: '34vh', md: '80vh' }}
          p={4}
        >
          <Carousel infiniteLoop showThumbs={false} height="100%" width="100%">
            <Box width={'100%'} height={'100%'}>
              <Image
                w={'100%'}
                h={{ base: '30vh', md: '75vh' }}
                fit={'cover'}
                src={data.image}
              ></Image>
            </Box>
            <Box width={'100%'} height={'100%'}>
              <Image
                w={'100%'}
                h={{ base: '30vh', md: '75vh' }}
                src={data.image1}
                fit={'cover'}
              ></Image>
            </Box>
            <Box width={'100%'} height={'100%'}>
              <Image
                w={'100%'}
                h={{ base: '30vh', md: '75vh' }}
                src={data.image2}
                fit={'cover'}
              ></Image>
            </Box>
            <Box width={'100%'} height={'100%'}>
              <Image
                w={'100%'}
                h={{ base: '30vh', md: '75vh' }}
                src={data.image3}
                fit={'cover'}
              ></Image>
            </Box>
          </Carousel>
        </Box>

        <Box mt={4} w={{ base: '100%', md: '35%' }}>
          <HStack ml={4}>
            <Rating defaultValue={data.rating} size="sm" />
            <Text
              fontSize="sm"
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            >
              12 Reviews
            </Text>
          </HStack>
          <Stack spacing="1" ml={4} mt={2}>
            <Text
              fontWeight="medium"
              color={colorMode === 'light' ? 'black' : 'white'}
              fontSize={'xl'}
            >
              {data.name}
            </Text>
            <PriceTag
              price={data.price}
              salePrice={data.sellPrice}
              currency="INR"
            />
          </Stack>
          <Text
            ml={4}
            mr={2}
            mt={2}
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
          >
            {data.description}
          </Text>
          <Stack ml={4} mt={2}>
            <Text>{`Size: ${size}`}</Text>
            <HStack>
              {sizes.map(size => {
                return (
                  <Button
                    variant="outline"
                    colorScheme={'blue'}
                    onClick={event => sizeClick(event)}
                    value={size}
                  >
                    {size}
                  </Button>
                );
              })}
            </HStack>
          </Stack>
          <Stack mb={{ base: 14, md: 0 }} mt={2} p={4} spacing={4}>
            <Button
              colorScheme={'red'}
              variant="outline"
              leftIcon={<FavoriteIcon />}
            >
              Favorite
            </Button>
            {isAdded ? (
              <Button variant="outline" colorScheme={'blue'}>
                Added
              </Button>
            ) : (
              <Button
                className="cart"
                onClick={addToCart}
                variant="solid"
                colorScheme={'blue'}
              >
                Add to Cart
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
