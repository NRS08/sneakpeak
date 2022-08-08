import { chakra } from '@chakra-ui/react';
import { Image, Stack } from '@chakra-ui/react';
import logoLight from '../images/logoLight.png';
import logoDark from '../images/logoDark.png';
import { useColorMode } from '@chakra-ui/react';

export const Logo = props => {
  const { colorMode } = useColorMode();
  return (
    <Stack direction={'row'} w={'100%'} justify={'center'}>
      <Image
        src={colorMode === 'light' ? logoLight : logoDark}
        height={'50px'}
        width={'130px'}
        viewBox="0 0 89 89"
      ></Image>
    </Stack>
  );
};
