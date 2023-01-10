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
  Input,
  Alert,
  AlertIcon,
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

export default function Products({ children }: { children: ReactNode }) {
  const url = 'https://rich-pink-nematode-boot.cyclic.app/api/v1/shoes/';
  const url1 = 'https://rich-pink-nematode-boot.cyclic.app/api/v1/order/name';

  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Message');
  const [status, setStatus] = useState('error');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sidebarWidth, setName } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    async function getData() {
      try {
        // setIsLoading(true);
        const { data } = await axios.get(url1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(data.name);
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

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const w = windowWidth - sidebarWidth;

  const token = localStorage.getItem('tokenAdmin');
  const addShoe = async () => {
    try {
      setIsLoading(true);
      const name = document.querySelector('.name').value;
      const price = document.querySelector('.price').value;
      const image = document.querySelector('.image1').value;
      const image1 = document.querySelector('.image2').value;
      const image2 = document.querySelector('.image3').value;
      const image3 = document.querySelector('.image4').value;
      const rating = document.querySelector('.rating').value;
      const description = document.querySelector('.description').value;
      const brand = document.querySelector('.brand').value;
      const color = document.querySelector('.color').value;
      const category = document.querySelector('.category').value;
      const { data } = await axios.post(
        url,
        {
          name,
          price,
          image,
          image1,
          image2,
          image3,
          rating,
          description,
          brand,
          color,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus('success');
      setMessage('Shoe Added');
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      setIsLoading(false);
      document.querySelector('.name').value = '';
      document.querySelector('.price').value = '';
      document.querySelector('.image1').value = '';
      document.querySelector('.image2').value = '';
      document.querySelector('.image3').value = '';
      document.querySelector('.image4').value = '';
      document.querySelector('.rating').value = '';
      document.querySelector('.description').value = '';
      document.querySelector('.brand').value = '';
      document.querySelector('.color').value = '';
      document.querySelector('.category').value = '';
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
      }, 500);
    } catch (error) {
      setStatus('error');
      setMessage(error.response.data.msg);
      setIsLoading(false);
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      document.querySelector('.name').value = '';
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
      }, 3000);
    }
  };
  return (
    <Box
      position={'relative'}
      minH="100vh"
      // bg={useColorModeValue('gray.100', 'gray.900')}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
    >
      <Box
        className="alert"
        w={'100vw'}
        display={'none'}
        justifyContent="center"
        position="fixed"
        top={'10px'}
        zIndex="100"
      >
        <Alert status={status} position={'absolute'} w={'auto'} variant="solid">
          <AlertIcon />
          {message}
        </Alert>
      </Box>
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
          <Heading>Products</Heading>
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
            // onClick={() => setS('pending')}
            fontSize={'lg'}
            fontWeight={'600'}
          >
            Pending
          </Link>
          <Link
            // onClick={() => setS('delivered')}
            fontSize={'lg'}
            fontWeight={'600'}
          >
            Delivered
          </Link>
        </Box>

        <Box
          width={{ base: '90%', md: '70%', lg: '60%' }}
          border="solid 1px"
          p={2}
          borderRadius={'1rem'}
        >
          <Text textAlign={'center'} fontSize={'2xl'} fontWeight="bold">
            Add Shoe
          </Text>
          <Stack mt={2} direction={'column'} gap={1}>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Shoe Name
              </Text>
              <Input className="name" placeholder="Shoe Name" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Price
              </Text>
              <Input
                type={'number'}
                className="price"
                placeholder="Shoe Name"
              />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Image 1
              </Text>
              <Input className="image1" placeholder="Image Link" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Image 2
              </Text>
              <Input className="image2" placeholder="Image Link" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Image 3
              </Text>
              <Input className="image3" placeholder="Image Link" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Image 4
              </Text>
              <Input className="image4" placeholder="Image Link" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Rating
              </Text>
              <Input className="rating" placeholder="Rating" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Description
              </Text>
              <Input className="description" placeholder="Description" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Brand
              </Text>
              <Input className="brand" placeholder="Brand Name" />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Color
              </Text>
              <Input className="color" placeholder="red/green/white..." />
            </Box>
            <Box display={'flex'} gap={2} alignItems="center">
              <Text
                w={{ base: '40%', md: '30%', lg: '20%' }}
                fontSize={'lg'}
                fontWeight={'600'}
              >
                Category
              </Text>
              <Input className="category" placeholder="Men/Women" />
            </Box>
          </Stack>
          <Box w={'100%'} display="flex" justifyContent={'center'}>
            {isLoading ? (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
                mt={4}
                mb={4}
              >
                Submit
              </Button>
            ) : (
              <Button
                mt={4}
                mb={4}
                w={{ base: '100%', md: '50%' }}
                colorScheme="teal"
                onClick={addShoe}
              >
                Add Shoe
              </Button>
            )}
          </Box>
        </Box>
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
        <LinkRouter to={`${link.to}`}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </LinkRouter>
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
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
