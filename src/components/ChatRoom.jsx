import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Heading, Container, Flex, Avatar } from '@chakra-ui/react';
import socket from '../services/mockSocket';

const ChatRoom = ({ room, user, onLeave }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on('message', handleMessage);

        // Initial connection logic if needed specifically for room entry
        // But assuming socket is global and we just start listening

        return () => {
            socket.off('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            socket.emit('send_message', {
                user: user,
                text: newMessage,
                room: room.id
            });
            setNewMessage('');
        }
    };

    return (
        <Container maxW="container.md" h="100vh" py={4} display="flex" flexDirection="column">
            {/* Header */}
            <Flex justify="space-between" align="center" mb={4} p={4} bg="white" boxShadow="sm" borderRadius="md">
                <Heading size="md" color="teal.600">{room.name}</Heading>
                <Button size="sm" colorScheme="red" variant="outline" onClick={onLeave}>
                    Leave Room
                </Button>
            </Flex>

            {/* Messages Area */}
            <Box
                flex="1"
                overflowY="auto"
                bg="gray.50"
                p={4}
                borderRadius="md"
                mb={4}
                boxShadow="inner"
            >
                <VStack spacing={4} align="stretch">
                    {messages.map((msg) => {
                        const isMe = msg.user === user;
                        return (
                            <Flex key={msg.id} justify={isMe ? 'flex-end' : 'flex-start'}>
                                {!isMe && <Avatar size="sm" name={msg.user} mr={2} />}
                                <Box
                                    bg={isMe ? 'teal.500' : 'white'}
                                    color={isMe ? 'white' : 'black'}
                                    px={4}
                                    py={2}
                                    borderRadius="lg"
                                    boxShadow="sm"
                                    maxW="70%"
                                >
                                    {!isMe && <Text fontSize="xs" color="gray.500" mb={1}>{msg.user}</Text>}
                                    <Text>{msg.text}</Text>
                                    <Text fontSize="xs" color={isMe ? 'teal.100' : 'gray.400'} textAlign="right" mt={1}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </Box>
                            </Flex>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </VStack>
            </Box>

            {/* Input Area */}
            <HStack as="form" onSubmit={handleSendMessage} spacing={4}>
                <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    bg="white"
                    focusBorderColor="teal.400"
                />
                <Button type="submit" colorScheme="teal" px={8}>
                    Send
                </Button>
            </HStack>
        </Container>
    );
};

export default ChatRoom;
