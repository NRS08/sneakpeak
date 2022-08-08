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
import { Logo } from './Logo';
import { PasswordField } from './PasswordField';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const url = 'https://sneakpeak-api.herokuapp.com/api/v1/auth/register';
  const [isLoading, setIsLoading] = React.useState(false);
  const { colorMode } = useColorMode();
  const { password, setPassword } = useGlobalContext();
  const h = window.innerHeight;
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('error');
  const navigate = useNavigate();
  const register = async () => {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    try {
      setIsLoading(true);
      const res = await axios.post(url, { name, email, password });
      setPassword('');
      setStatus('success');
      setMessage('User Created');
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
        setIsLoading(false);
        navigate('/login');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response.data.msg);
      setPassword('');
      const alert = document.querySelector('.alert');
      alert.style.display = 'flex';
      document.querySelector('#name').value = '';
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
        variant={'solid'}
        status={status}
        position={'absolute'}
        w={'auto'}
        top="20px"
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
              letterSpacing={'1px'}
              size={useBreakpointValue({
                base: 'md',
                md: 'lg',
              })}
            >
              Register
            </Heading>
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="name" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
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
                <Button onClick={register} variant="outline" colorScheme="teal">
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
