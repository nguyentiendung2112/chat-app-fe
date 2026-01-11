import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, FormControl, FormLabel, Text, Link, useToast } from '@chakra-ui/react';

const Register = ({ onRegister, onShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        onRegister(username, password);
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
                        Register
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
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="filled"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        mt={4}
                    >
                        Register
                    </Button>
                    <Text fontSize="sm">
                        Already have an account?{' '}
                        <Link color="teal.500" onClick={onShowLogin}>
                            Login
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
};

export default Register;
