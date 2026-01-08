import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, Heading, Text, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Container } from '@chakra-ui/react';
import socket from '../services/mockSocket';

const RoomList = ({ onJoinRoom }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Listen for room list updates
        const handleRoomsList = (data) => {
            setRooms(data);
        };

        socket.on('rooms_list', handleRoomsList);

        // Request room list
        socket.emit('get_rooms');

        return () => {
            socket.off('rooms_list', handleRoomsList);
        };
    }, []);

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={8} align="stretch">
                <Heading as="h2" size="xl" textAlign="center" color="teal.600">
                    Available Rooms
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {rooms.map((room) => (
                        <Card key={room.id} align="center" variant="elevated" borderColor="teal.100" borderWidth={1}>
                            <CardHeader>
                                <Heading size="md">{room.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Join this to start chatting with others in {room.name}.</Text>
                            </CardBody>
                            <CardFooter w="full">
                                <Button colorScheme="teal" width="full" onClick={() => onJoinRoom(room)}>
                                    Join Room
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default RoomList;
