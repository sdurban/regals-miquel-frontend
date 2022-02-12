import {
    Button,
    Center, ListItem,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    UnorderedList,
} from "@chakra-ui/react";
import React, {PropsWithChildren} from "react";

export interface Props {
    isOpen: boolean;
    onClose(): void;
    hasWroteAnyName: boolean
    hasSelectedAnyItem: boolean
}

export const ErrorSelectWishOrName = (props: PropsWithChildren<Props>) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader><Center>Error al formulari</Center></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hi ha un problema amb l'enviament: <br/><br/>
                    <UnorderedList>
                        {!props.hasWroteAnyName
                            &&
                            <ListItem>No s'ha introduit cap nom (al principi de la pagina).</ListItem>
                        }
                        {!props.hasSelectedAnyItem
                            &&
                            <ListItem>No s'ha triat cap regal.</ListItem>
                        }
                    </UnorderedList>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Tancar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}