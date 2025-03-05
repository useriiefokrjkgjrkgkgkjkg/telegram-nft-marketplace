import { Box, BoxProps } from '@chakra-ui/react'

export const TonLogo = (props: BoxProps) => (
  <Box 
    as="span" 
    fontSize={props.fontSize || 'inherit'} 
    display="inline-flex" 
    alignItems="center" 
    justifyContent="center"
    {...props}
  >
    ⟠
  </Box>
) 