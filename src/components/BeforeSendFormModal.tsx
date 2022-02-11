import {
    Button,
    Center, ListItem, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    UnorderedList
} from "@chakra-ui/react";
import React, {PropsWithChildren} from "react";
import {WishItem} from "../model/WishItem";

export interface Props {
    isOpen: boolean;
    onClose(): void;
    sendForm(): void;
    nomUsuari: string;
    items: WishItem[];
}

export const BeforeSendFormModal = (props: PropsWithChildren<Props>) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader><Center>Confirmació formulari</Center></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Gracies {props.nomUsuari}, aquests son els objectes que has triat: <br/><br/>
                    <UnorderedList>
                        {props.items.map((item: WishItem) => {
                            return (<ListItem>{item.item} (x{item.comprare}).</ListItem>)
                        })}
                    </UnorderedList>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={props.onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Confirmar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}