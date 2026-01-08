import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, FormControl, FormLabel } from '@chakra-ui/react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            onLogin(username, password);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100vh"
            bg="gray.50"
        >
            <Box
                w="100%"
                maxW="md"
                p={8}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
            >
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                    <Heading as="h1" size="xl" textAlign="center" color="teal.500">
                        Welcome to ChatApp
                    </Heading>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="filled"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="filled"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        mt={4}
                    >
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Login;
