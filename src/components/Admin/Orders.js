import React, {
  ReactNode,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useGlobalContext } from '../../context';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useColorMode } from '@chakra-ui/react';
import { CartItem } from '../Checkout/CartItem';
import adminDP from '../images/admin.jpg';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, to: '/admin' },
  { name: 'Orders', icon: FiTrendingUp, to: '/admin/orders' },
  { name: 'Products', icon: FiCompass, to: '/admin/products' },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

export default function Orders({ children }: { children: ReactNode }) {
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/order';
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);
  const [s, setS] = useState('pending');
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sidebarWidth, setName } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url + '?status=' + s, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(data.orders);
        setName(data.name);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getData();
    } else {
      navigate('/login/admin');
    }
  }, [s]);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const w = windowWidth - sidebarWidth;
  if (isLoading) {
    return (
      <Stack h={'100vh'} w="100%" justify="center" align="center">
        <Text fontSize={'4xl'}>Loading...</Text>
      </Stack>
    );
  }
  return (
    <Box
      position={'relative'}
      minH="100vh"
      // bg={useColorModeValue('gray.100', 'gray.900')}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      <Box
        // bg={'red'}
        width={{ base: '100%', md: `${w}px` }}
        ml={{ base: '0', md: '60' }}
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
        gap={4}
      >
        <Box
          width={{ base: '95%', md: '90%', lg: '80%' }}
          display="flex"
          flexDirection={'column'}
          justifyContent="center"
          alignItems={'center'}
          gap={4}
          border="solid 1px"
          p={2}
          borderRadius={'1rem'}
        >
          <Heading>Orders</Heading>
          <LinkRouter to="/admin"></LinkRouter>
        </Box>
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
        {data.map(order => {
          return (
            <Box
              width={{ base: '90%', md: '70%', lg: '50%' }}
              p={2}
              display="flex"
              justifyContent="center"
              alignItems={'center'}
              flexDirection="column"
              border="solid 1px"
              p={2}
              borderRadius={'1rem'}
            >
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    Name:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.name}</Text>
                </Box>
              </Box>
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    Email:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.email}</Text>
                </Box>
              </Box>
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    Address:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.address} </Text>
                </Box>
              </Box>
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    Zip Code:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.zipCode}</Text>
                </Box>
              </Box>
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    City:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.city}</Text>
                </Box>
              </Box>
              <Box width={'100%'} p={2}>
                <Box display={'flex'} gap={2}>
                  <Text fontWeight="600" fontSize={'lg'}>
                    Status:{' '}
                  </Text>
                  <Text fontSize={'lg'}>{order.status}</Text>
                </Box>
              </Box>
              <Stack
                mt={2}
                width={{ base: '95%', md: '95%', lg: '100%' }}
                spacing="6"
              >
                {order.items.map(item => (
                  <CartItem key={item._id} {...item} />
                ))}
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const ref = useRef(null);
  const { setSidebarWidth } = useGlobalContext();
  useLayoutEffect(() => {
    setSidebarWidth(ref.current.offsetWidth);
  }, []);
  return (
    <Box
      ref={ref}
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          <LinkRouter to={`${link.to}`}>{link.name}</LinkRouter>
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { name } = useGlobalContext();
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('tokenAdmin');
    // window.location.reload();
    navigate('/login');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={adminDP} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm"> {name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
