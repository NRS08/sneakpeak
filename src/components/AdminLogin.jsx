import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useColorMode,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import * as React from 'react';
import { Logo } from './Login/Logo';
import { PasswordField } from './Login/PasswordField';
import { Link as LinkRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const url = process.env.REACT_APP_API_BASE_URL + '/auth/admin/login';
  const { colorMode } = useColorMode();
  const h = window.innerHeight;
  const { password, setPassword } = useGlobalContext();
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('error');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const login = async () => {
    try {
      setIsLoading(true);
      const email = document.querySelector('#email').value;
      const { data } = await axios.post(url, { email, password });
      setStatus('success');
      setMessage('Logged In');
      // console.log(data);
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      setPassword('');
      localStorage.setItem('tokenAdmin', data.token);
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
        setIsLoading(false);
        navigate('/admin');
      }, 500);
    } catch (error) {
      localStorage.removeItem('tokenAdmin');
      setStatus('error');
      setMessage(error.response.data.msg);
      setPassword('');
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      document.querySelector('#email').value = '';
      setIsLoading(false);
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
      }, 3000);
    }
  };

  return (
    <Container
      h={`${h}px`}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      maxW="lg"
      py={{
        base: '12',
        md: '12',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Alert
        className="alert"
        status={status}
        position={'absolute'}
        w={'auto'}
        top="0"
        display={'none'}
        justifyContent="center"
      >
        <AlertIcon />
        {message}
      </Alert>
      <Stack
        w={{ base: '90%', sm: '98%' }}
        spacing="8"
        boxShadow={
          colorMode === 'light'
            ? '0 5px 15px rgba(0, 0, 0, 0.3)'
            : '0 5px 15px rgba(0, 0, 0, 0.6)'
        }
        transition={'all 0.3s linear'}
        _hover={{
          boxShadow:
            colorMode === 'light'
              ? '0 5px 15px rgba(0, 0, 0, 0.4)'
              : '0 5px 15px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Stack pt={4} spacing="6">
          <Logo />
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: 'sm',
                md: 'md',
              })}
            >
              Admin Log in Page
            </Heading>
            {/* <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue">
                <LinkRouter to="/register">Register</LinkRouter>
              </Button>
            </HStack> */}
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '0',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={useBreakpointValue({
            base: 'transparent',
            sm: 'bg-surface',
          })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack pb={4} spacing="6">
              {isLoading ? (
                <Button
                  isLoading
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                >
                  Submit
                </Button>
              ) : (
                <Button onClick={login} variant="outline" colorScheme="teal">
                  Sign in
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
