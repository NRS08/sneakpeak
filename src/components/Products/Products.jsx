import {
  Box,
  Stack,
  useColorModeValue,
  IconButton,
  Text,
  RadioGroup,
  Radio,
  Select,
  Button,
} from '@chakra-ui/react';
import * as React from 'react';
import { ProductCard } from '../Grid/ProductCard';
// import { products } from './_data';
import { useGlobalContext } from '../../context';
import { ProductGrid } from './ProductGrid';
import { Heading } from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useRef } from 'react';
import './Products.css';
import { useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Products = () => {
  const url = 'https://rich-pink-nematode-boot.cyclic.app/api/v1/shoes';
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  // const [category, setCategory] = React.useState();
  // const [color, setColor] = React.useState();
  // const [brand, setBrand] = React.useState();
  // const [sort, setSort] = React.useState();
  // const [range, setRange] = React.useState();
  const getData = async Url => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(Url);
      setProducts(data.shoes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  React.useEffect(() => {
    async function getSearchedData() {
      try {
        if (location.state === 'men' || location.state === 'women') {
          await getData(url + '?category=' + `${location.state}`);
        } else await getData(url + '?name=' + `${location.state}`);
      } catch (error) {
        console.log(error);
      }
    }
    getSearchedData();
  }, [location]);

  const filters = () => {
    const category = document.querySelector('.category');
    const brand = document.querySelector('.brand');
    const range = document.querySelector('.range');
    const sort = document.querySelector('.sort');
    const color = document.querySelector('.color');
    const categoryValue = category.options[category.selectedIndex].value;
    const brandValue = brand.options[brand.selectedIndex].value;
    const rangeValue = range.options[range.selectedIndex].value;
    const sortValue = sort.options[sort.selectedIndex].value;
    const colorValue = color.options[color.selectedIndex].value;
    if (
      !categoryValue &&
      !brandValue &&
      !rangeValue &&
      !sortValue &&
      !colorValue
    ) {
    } else {
      const filterArray = ['category', 'brand', 'range', 'sort', 'color'];
      const filterValueArray = [
        categoryValue,
        brandValue,
        rangeValue,
        sortValue,
        colorValue,
      ];
      let input = '';
      for (var i = 0; i < 5; i++) {
        if (filterValueArray[i]) {
          if (i != 4) {
            input = input + filterArray[i] + '=' + filterValueArray[i] + '&';
          } else {
            input = input + filterArray[i] + '=' + filterValueArray[i];
          }
        }
      }
      if (location.state === 'men' || location.state === 'women') {
        getData(url + '?category=' + `${location.state}` + '&' + input);
      } else {
        getData(url + '?name=' + `${location.state}` + '&' + input);
      }
    }
  };

  const clickHandler = () => {
    const sidebar = document.querySelector('.sidebar');
    // console.log(sidebar)
    if (!isOpen) {
      sidebar.classList.add('show');
    } else {
      sidebar.classList.remove('show');
    }
    setIsOpen(!isOpen);
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
        pt={2}
        className="products"
        bg={colorMode === 'light' ? 'white' : 'gray.900'}
        overflow={{ base: 'hidden', md: 'visible' }}
        // height={{ base: '86vh', md: '82vh' }}
        height="80vh"
        // bg="red"
      >
        <Box
          w={{ base: '100%', sm: 'auto', md: '30%', lg: '30%', xl: '30%' }}
          // bg={useColorModeValue('white', '#1a202c')}
          bg={colorMode === 'light' ? 'rgb(253, 253, 253)' : '#1a202c'}
          className="sidebar"
          zIndex={'120'}
          p={4}
          fontFamily="monospace"
          display={'flex'}
          flexDirection="column"
        >
          <Text mb={4} fontSize={'xl'} fontWeight={'bold'}>
            Filters
          </Text>
          <Stack spacing={4}>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Gender
              </Text>
              <Select
                placeholder="Gender"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
                className="category"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Size
              </Text>
              <Select
                placeholder="Size"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
              >
                <option value="us6">US6</option>
                <option value="us7">US7</option>
                <option value="us8">US8</option>
                <option value="us9">US9</option>
                <option value="us10">US10</option>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Brand
              </Text>
              <Select
                placeholder="Brand"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
                className="brand"
              >
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Fila">Fila</option>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Range
              </Text>
              <Select
                placeholder="Range"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
                className="range"
              >
                <option value="<2000">{'<2000'}</option>
                <option value=">2000">{'>2000'}</option>
                <option value=">3000">{'>3000'}</option>
                <option value=">4000">{'>4000'}</option>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Sort
              </Text>
              <Select
                placeholder="Sort"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
                className="sort"
              >
                <option value="price">Low to High</option>
                <option value="-price">High to Low</option>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              align={'center'}
              spacing={0}
              justify={'space-between'}
            >
              <Text
                w={'40%'}
                fontSize={{ base: 'xl', sm: 'md' }}
                fontWeight={'600'}
              >
                Color
              </Text>
              <Select
                placeholder="Color"
                width={{
                  base: '40%',
                  sm: 'auto',
                  md: '50%',
                  lg: '50%',
                  xl: '50%',
                }}
                className="color"
              >
                <option value="red">Red</option>
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="pink">Pink</option>
                <option value="grey">Grey</option>
              </Select>
            </Stack>
          </Stack>
          <Stack mt={8} direction="row" justify={'center'} w="100%">
            <Button
              fontSize={'md'}
              w={'auto'}
              colorScheme="teal"
              variant="outline"
              onClick={filters}
            >
              Apply filters
            </Button>
          </Stack>
        </Box>
        <Box overflowY={'auto'} className="scroll">
          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <Stack direction={'row'}>
              <IconButton
                zIndex={'150'}
                onClick={clickHandler}
                p={4}
                variant={'ghost'}
                colorScheme="white"
              >
                {isOpen ? (
                  <CloseIcon />
                ) : (
                  <Text
                    fontFamily="monospace"
                    color={'teal'}
                    fontSize="lg"
                    textDecoration={'underline'}
                  >
                    filters
                  </Text>
                )}
              </IconButton>
            </Stack>
          </Box>

          <Box
            className="products-grid"
            mb={{ base: '4', md: '8' }}
            maxW="7xl"
            mx="auto"
            px={{
              base: '4',
              md: '8',
              lg: '12',
            }}
            py={{
              base: '4',
              md: '2',
              lg: '2',
            }}
          >
            <Heading justify={{ base: 'center', md: 'start' }} mb={4}>
              Products
            </Heading>
            <ProductGrid>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ProductGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
