/** @jsxImportSource @emotion/react */
import {
    Badge,
    Box, Button,
    Image,
    Modal, ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure, useNumberInput, HStack, Input, VStack, Center, Text, Flex
} from "@chakra-ui/react";
import {WishItem} from "../model/WishItem";
import React, {PropsWithChildren} from "react";
import {Spacer} from "./Spacer";
import {Ahref} from "../AppStyledComponents";

export interface Props {
    wishItem: WishItem;
    updateComprare: CallbackUpdateComprare;
}

interface CallbackUpdateComprare {
    (wishItemId: number|string, comprare: number): void;
}

export const WishItemComponent = (props: PropsWithChildren<Props>) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 0,
            min: 0,
            max: props.wishItem.total - props.wishItem.tenim,
            onChange(_: string, valueAsNumber: number) {
                props.updateComprare(props.wishItem.id, valueAsNumber);
            }
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    const isFulfilled = props.wishItem.tenim === props.wishItem.total;

    return (
        <>
        <Flex h="md" maxH="lg" borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={!isFulfilled ? onOpen : () => {}} flexDirection="column">
            <Image
                w='100%'
                h='50%'
                objectFit='cover' src={props.wishItem.imatge} alt={"Imatge " + props.wishItem.item} />

            <Flex p='6' h='50%' flexDirection="column">
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    textAlign='center'
                >
                    {props.wishItem.item}
                </Box>

                <Box>
                    <Badge marginTop='4px' display="table" margin="0 auto" borderRadius='full' px='2' colorScheme={isFulfilled ? 'red' : 'teal'} alignContent="center">
                        En tenim: {props.wishItem.tenim}/{props.wishItem.total}
                    </Badge>
                </Box>
                {props.wishItem.comprare !== undefined && props.wishItem.comprare > 0 && (<Box marginTop='4px'>
                    <Badge display="table" margin="0 auto" borderRadius='full' px='2' colorScheme={'green'}>
                        En regalo: {props.wishItem.comprare}
                    </Badge>
                </Box>)}
                <Button marginTop="auto" colorScheme={isFulfilled ? 'gray' : 'yellow'}>
                    Jo us ho regalo!
                </Button>
            </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <VStack>
                        <Box>
                            <Image w='100%'
                                   objectFit='contain'
                                   src={props.wishItem.imatge}
                                   alt={"Imatge " + props.wishItem.item} />
                        </Box>
                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                        >
                            {props.wishItem.item}
                        </Box>

                        <Box>
                            <Badge borderRadius='full' px='2' colorScheme={isFulfilled ? 'gray' : 'teal'}>
                                En tenim: {props.wishItem.tenim}/{props.wishItem.total}
                            </Badge>
                        </Box>
                        {props.wishItem.comentaris !== '' && (<Box>
                            <Text fontSize="xl">Comentaris:</Text>
                            <Text fontSize='md'>{props.wishItem.comentaris}</Text>
                            {props.wishItem.id === 66 &&
                                <Text fontSize='md' mt={1}>
                                    <Ahref target="_blank" href='https://criatures.ara.cat/criatures/panera-dels-tresors_1_1415994.html'>
                                        Panera del tresors
                                    </Ahref>
                                </Text>}
                        </Box>)}
                        <Spacer />
                        <Box>
                            <HStack maxW='320px'>
                                <Button {...dec}>-</Button>
                                <Input {...input} />
                                <Button {...inc}>+</Button>
                            </HStack>
                        </Box>
                        <Spacer />
                        <Center w='100%' color='white'>
                            <Button colorScheme='yellow' size='lg' w="100%" onClick={onClose}>Jo us ho regalo!</Button>
                        </Center>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}