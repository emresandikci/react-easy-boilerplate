import React from 'react';
import { Box, Heading, Text, Button } from 'esducad-ui';
function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="primary"
    >
      <Heading fontSize="50px" color="white" animation="bounce">
        React easy starter boilerplate
      </Heading>
      <Text color="white" animation="bounce">
        by emresandikci to see the other projects{' '}
        <Button
          variant="secondary"
          onClick={() => (window.location.href = 'http://github.com/emresandikci')}
        >
          click here
        </Button>
      </Text>
    </Box>
  );
}

export default Home;
