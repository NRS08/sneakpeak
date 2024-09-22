import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';
import {
  Search2Icon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useGlobalContext } from '../context';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logoDark from './images/logoDark.png';
import logoLight from './images/logoLight.png';
import { useColorMode } from '@chakra-ui/react';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Link as LinkRouter } from 'react-router-dom';
import { Products } from './Products/Products';
import './Navbar.css';
import { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FiChevronDown } from 'react-icons/fi';

var url = process.env.REACT_APP_API_BASE_URL + '/shoes';
const token = localStorage.getItem('token');

export default function Navbar() {
  const url = process.env.REACT_APP_API_BASE_URL + '/cart';
  // const [cartCount, setCartCount] = React.useState('0');
  const { cartCount, setCartCount } = useGlobalContext();
  const [isLoading, setIsLoading] = React.useState('true');
  const [name, setName] = React.useState('name');
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const elementRef = useRef(null);
  const { shoeData, setShoeData } = useGlobalContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    async function getCartCount() {
      if (!token) {
      } else {
        try {
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(data);
          setCartCount(data.cart.length);
          setName(data.name.split(' ')[0]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getCartCount();
  });
  const search = async () => {
    try {
      const input = document.querySelector('.searchBarMob');
      const v = input.value;
      if (!v) {
      } else {
        // const { data } = await axios.get(url + '?name=' + `${v}`);
        navigate('/products', { state: v });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navSearch = async value => {
    try {
      // const { data } = await axios.get(url + '?name=' + `${v}`);
      navigate('/products', { state: value });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = () => {
    if (!token) {
      navigate('/login');
    } else {
      localStorage.removeItem('token');
      // navigate('/');
      window.location.reload();
    }
  };
  return (
    <Box ref={elementRef} className="nav" height={{ base: '14vh', md: '18vh' }}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        mt={0}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={6} h={6} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <LinkRouter to={'/'}>
            <img
              src={colorMode === 'light' ? logoLight : logoDark}
              width="150px"
            ></img>
          </LinkRouter>
          <Flex display={{ base: 'none', md: 'flex' }} ml={50} width="100%">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={4}
        >
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={0}
            display={{ base: 'none', md: 'inline-flex' }}
          >
            <Button variant="ghost">
              <FavoriteIcon />
            </Button>
            <LinkRouter to="/cart">
              <Button position={'relative'} variantColor="" variant="ghost">
                <Box
                  height={'45%'}
                  width={'35%'}
                  position={'absolute'}
                  bg={useColorModeValue('#4a5568', 'white')}
                  borderRadius={'50%'}
                  top="-5%"
                  right={'20%'}
                  color={useColorModeValue('white', 'black')}
                  textAlign={'center'}
                  fontSize="sm"
                >
                  {cartCount}
                </Box>
                <ShoppingCart />
              </Button>
            </LinkRouter>
          </Stack>
          {/* <Button
            display={{ base: 'none', md: 'inline-flex' }}
            colorScheme="red"
            borderWidth="2px"
            variant="outline"
            fontSize={'md'}
            fontWeight={600}
            href={'#'}
            onClick={signIn}
          >
            {token ? 'Log Out' : 'Sign in'}
          </Button> */}
          {/* <Box
            display={'flex'}
            justifyContent="center"
            alignItems={'center'}
            gap={0}
            spacing={0}
            position="relative"
          >
            <Text fontSize={'sm'}>Nirant Sontakke</Text>
            <Button size={'2xs'} variant={'ghost'} fontSize={'lg'}>
              <FiChevronDown />
            </Button>
            <Box
              position={'absolute'}
              minHeight="10vh"
              width={'200%'}
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              top="105%"
              right="10%"
              borderRadius={'5px'}
            >
            </Box>
          </Box> */}
          <Box display={{ base: 'none', md: 'inline-flex' }}>
            {token ? (
              <Menu>
                <MenuButton
                  variant="ghost"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  textTransform="capitalize"
                  p={1}
                >
                  {name}
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={signIn}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                colorScheme="red"
                borderWidth="2px"
                variant="outline"
                fontSize={'md'}
                fontWeight={600}
                href={'#'}
                onClick={signIn}
              >
                Sign In
              </Button>
            )}
          </Box>
          <ColorModeSwitcher className="color-mode" justifySelf="flex-end" />
        </Stack>
      </Flex>
      <Box
        w={'100%'}
        p={2}
        display={{ base: 'inline-flex', md: 'none' }}
        className="search-base-box"
        bg={colorMode === 'light' ? 'white' : '#1a202c'}
        borderWidth="0px 0px 1.5px 0"
        borderColor={colorMode === 'light' ? '#1a202c' : 'white'}
      >
        <div className="search-base">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Search2Icon
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
              }
            />
            <Input
              width={'99%'}
              borderWidth="1px"
              borderColor={colorMode === 'light' ? 'black' : 'white'}
              placeholder="Search Shoes Here"
              className="searchBarMob"
            />
          </InputGroup>
          <Button
            onClick={search}
            ml="2px"
            variant="outline"
            colorScheme="green"
          >
            <ArrowForwardIcon />
          </Button>
        </div>
      </Box>

      <Box
        bg={colorMode === 'light' ? 'white' : '#1a202c'}
        w="100%"
        display={{ base: 'none', md: 'inline-flex' }}
      >
        <Stack
          width={'100%'}
          align="center"
          direction={'row'}
          spacing={12}
          justify="center"
          p={2}
          borderWidth="0px 0px 1.5px 0"
          borderColor={colorMode === 'light' ? '#1a202c' : 'white'}
        >
          {NAV_ITEMS.map(navItem => (
            <Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <Link
                    p={2}
                    onClick={() => {
                      if (navItem.value) navSearch(navItem.value);
                    }}
                    // href={navItem.href ?? '#'}
                    fontSize={'lg'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>

                {navItem.children && (
                  <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}
                  >
                    <Stack>
                      {navItem.children.map(child => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box
        className="mob-nav"
        display={{ base: 'inline-flex', md: 'none' }}
        w="100%"
        p={2}
        bg={colorMode === 'light' ? 'white' : '#1a202c'}
      >
        <Stack
          w={'100%'}
          justify="space-around"
          direction={'row'}
          align="center"
        >
          <Button size="lg" variant="ghost">
            <LinkRouter to="/">
              <HomeIcon />
            </LinkRouter>
          </Button>
          <Button size="lg" variantColor="" variant="ghost" onClick={signIn}>
            {/* <LinkRouter to="/login">
            </LinkRouter> */}
            {/* <PersonRoundedIcon /> */}
            {token ? <LogoutIcon /> : <PersonRoundedIcon />}
          </Button>
          <Button size="md" variant="ghost">
            <FavoriteIcon />
          </Button>
          <Button size="md" variantColor="" variant="ghost">
            <LinkRouter to="/cart">
              <ShoppingCart />
            </LinkRouter>
          </Button>
        </Stack>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { colorMode } = useColorMode();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();

  const search = async () => {
    try {
      const input = document.querySelector('.searchBar');
      const v = input.value;
      if (!v) {
      } else {
        // const { data } = await axios.get(url + '?name=' + `${v}`);
        navigate('/products', { state: v });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack width={'100%'} align="center" direction={'row'} spacing={4}>
      <div className="search-md">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={
              <Search2Icon color={colorMode === 'light' ? 'black' : 'white'} />
            }
          />
          <Input
            width={'99%'}
            borderWidth="1px"
            borderColor={colorMode === 'light' ? 'black' : 'white'}
            placeholder="Search Shoes Here"
            className="searchBar"
          />
        </InputGroup>
        <Button onClick={search} ml="2px" variant="outline" colorScheme="green">
          <ArrowForwardIcon />
        </Button>
      </div>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, value }: NavItem) => {
  const navigate = useNavigate();
  const signIn = () => {
    if (!token) {
      navigate('/login');
    } else {
      localStorage.removeItem('token');
      // navigate('/');
      window.location.reload();
    }
  };

  const navSearch = async value => {
    try {
      if (value === 'signout') {
        signIn();
      }
      if (value === 'orders') {
        navigate('/orders');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(value);
  // const navigate = useNavigate();
  return (
    <Link
      // href={href}
      onClick={() => {
        if (value) navSearch(value);
      }}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, value }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const navSearch = async value => {
    try {
      // const { data } = await axios.get(url + '?name=' + `${v}`);
      navigate('/products', { state: value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        // href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          onClick={() => {
            if (value) navSearch(value);
          }}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  value?: string;
}
var v;
if (token) {
  v = 'Sign out';
} else {
  v = 'Sign In';
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Men',
    href: '#',
    value: 'men',
  },
  {
    label: 'Women',
    href: '#',
    value: 'women',
  },
  {
    label: 'Profile',
    children: [
      {
        label: 'Your Orders',
        subLabel: 'Shoes you have',
        href: '#',
        value: 'orders',
      },
      {
        label: v,
        // subLabel: 'Up-and-coming Designers',
        href: '#',
        value: 'signout',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
];
