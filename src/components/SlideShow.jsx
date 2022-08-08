import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import './Navbar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useColorMode } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

export const SlideShow = () => {
  const { colorMode } = useColorMode();
  const sliderContent = [
    [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      'Sneakpeak',
      'Your one stop destination for shoes',
    ],
    [
      'https://images.unsplash.com/photo-1631642751439-b3e28f3638e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=916&q=80',
      'https://images.unsplash.com/photo-1601879305068-751abb5821e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      'Misguided',
      'Refreash your wardrobe',
    ],
    [
      'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',
      'https://images.unsplash.com/photo-1556278777-a2a98c0d56da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      'Misguided',
      'Refreash your wardrobe',
    ],
  ];
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };
  var w = window.innerWidth;
  return (
    <Slider {...settings}>
      {sliderContent.map(item => {
        return (
          <div>
            <Box
              maxW="7xl"
              mx="auto"
              px={{
                base: '0',
                lg: '10',
              }}
              py={{
                base: '0',
                lg: '5',
              }}
            >
              <Stack
                direction={{
                  base: 'column-reverse',
                  lg: 'row',
                }}
                spacing={{
                  base: '0',
                  lg: '20',
                }}
              >
                <Box
                  width={{
                    lg: 'sm',
                  }}
                  transform={{
                    base: 'translateY(-50%)',
                    lg: 'none',
                  }}
                  bg={{
                    // base: useColorModeValue('red.50', 'gray.700'),
                    base: colorMode === 'light' ? 'red.50' : 'gray.700',
                    lg: 'transparent',
                  }}
                  mx={{
                    base: '6',
                    md: '8',
                    lg: '0',
                  }}
                  px={{
                    base: '6',
                    md: '8',
                    lg: '0',
                  }}
                  py={{
                    base: '6',
                    md: '8',
                    lg: '12',
                  }}
                >
                  <Stack
                    spacing={{
                      base: '4',
                      lg: '10',
                    }}
                  >
                    <Stack
                      spacing={{
                        base: '2',
                        lg: '4',
                      }}
                    >
                      <Heading
                        size="xl"
                        // color={useColorModeValue('red.500', 'red.300')}
                        color={colorMode === 'light' ? 'red.500' : 'red.300'}
                      >
                        {item[2]}
                      </Heading>
                      <Heading size="lg" fontWeight="normal">
                        {item[3]}
                      </Heading>
                    </Stack>
                    <HStack spacing="3">
                      <Link
                        // color={useColorModeValue('red.500', 'red.300')}
                        color={colorMode === 'light' ? 'red.500' : 'red.300'}
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Discover now
                      </Link>
                      <Icon
                        // color={useColorModeValue('red.500', 'red.300')}
                        color={colorMode === 'light' ? 'red.500' : 'red.300'}
                        as={FaArrowRight}
                      />
                    </HStack>
                  </Stack>
                </Box>
                <Flex flex="1" overflow="hidden">
                  <Image
                    src={item[0]}
                    alt="Lovely Image"
                    fallback={<Skeleton />}
                    maxH="300px"
                    minW={{ base: `${w}px`, sm: '300px' }}
                    objectFit="cover"
                    flex="1"
                  />
                  <Image
                    display={{
                      base: 'none',
                      sm: 'initial',
                    }}
                    // display={'none'}
                    src={item[1]}
                    alt="Lovely Image"
                    fallback={<Skeleton />}
                    maxH="300px"
                    objectFit="cover"
                  />
                </Flex>
              </Stack>
            </Box>
          </div>
        );
      })}
    </Slider>
  );
};
