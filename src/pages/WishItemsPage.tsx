import {ContentWrap, Middle} from "../GlobalCss";
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    SimpleGrid,
    Stack,
    Text, useDisclosure
} from "@chakra-ui/react";
import {Spacer} from "../components/Spacer";
import {GiftDescriptionContainer, GiftDescriptionText} from "../AppStyledComponents";
import {css} from "@emotion/react";
import {WishItem} from "../model/WishItem";
import {WishItemComponent} from "../components/WishItemComponent";
import React, {PropsWithChildren, SetStateAction, useEffect, useState} from "react";
import {ErrorSelectWishOrName} from "../components/ErrorSelectWishOrName";
import {BeforeSendFormModal} from "../components/BeforeSendFormModal";


interface CallbackSetRegaladorName {
    (regaladorName: SetStateAction<string>): void;
}

interface CallbackUpdateComprare {
    (wishItemId: number|string, comprare: number): void;
}

export interface Props {
    setRegaladorName: CallbackSetRegaladorName;
    regaladorName: string;
    items: WishItem[];
    updateComprare: CallbackUpdateComprare;
}

export const WishItemsPage = (props: PropsWithChildren<Props>) => {
    const modalError = useDisclosure();
    const modalConfirm = useDisclosure();
    const [ hasSelectedAnyItem, setHasSeletedAnyItem] = useState<boolean>(false);
    const [ hasWroteAnyName, setHasWroteAnyName] = useState<boolean>(false);

    const isError = props.regaladorName === '';

    const selectedItems = () => props.items.filter((it) => it.comprare != null && it.comprare > 0);
    const selectedAnyItem = () => selectedItems().length > 0;

    const wroteAnyName = () => props.regaladorName !== '';

    const updateItem = (wishItemId: number|string, comprare: number) => {
        props.updateComprare(wishItemId, comprare)

        setHasSeletedAnyItem(selectedAnyItem())
        setHasWroteAnyName(wroteAnyName());
    }

    const handleRegaladorNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        props.setRegaladorName(e.target.value);

        setHasSeletedAnyItem(selectedAnyItem())
        setHasWroteAnyName(wroteAnyName());
    }

    return (
        <>
            <Middle>
                <ContentWrap>
                    <Stack spacing={3}>
                        <br /><br />
                        <Center><Text fontSize="2xl">Llista regals miquel</Text></Center>
                    </Stack>
                    <Spacer />
                    <GiftDescriptionContainer>
                        <img css={css`flex: 15%;`} src='./images/miquel.jpg' alt="Foto miquel" />
                        <GiftDescriptionText>
                            Hola família i amics, <br/> <br />
                            Alguns i algunes de vosaltres ens demanàveu idees de regals per a l'arribada del Miquel. Després de donar-li moltes voltes, hem decidit fer una llista una mica diferent, sense una botiga de referència i sense productes concrets triats per nosaltres. Estem molt contents que ens vulgueu fer un regal, però ens agradaria que ens sorprenguéssiu triant vosaltres mateixos. Alhora, això permetrà que ho compreu allà on us sigui més còmode o fins i tot que ens pugueu regalar allò que encara guardeu de quan els vostres fills o filles eren petits. <br /> <br />
                            De tota manera, sabem que  alguns de vosaltres teniu dubtes de què regalar, o por de coincidir amb quelcom que ja tinguem o que ens hagi fet arribar ja algun altre familiar o amic. És per això que hem creat aquesta llista, on podreu anar veient allò que necessitem, però també allò que ja ens fan arribar altres coneguts. Per això és important que un cop decidiu quin serà el vostre regal ho marqueu a la llista i envieu la resposta per actualitzar les dades. Ja veureu que és molt intuïtiu, tot i així si algú té dubtes ens pot demanar ajuda o opinió, n'estarem encantats!<br /> <br />
                            Aprofitem per agrair-vos d'avançat els vostres regals!<br /><br />

                            Miquel, Sergio i Marina.
                        </GiftDescriptionText>
                    </GiftDescriptionContainer>
                    <Spacer />
                    <FormControl isInvalid={isError} isRequired>
                        <FormLabel htmlFor='email'>Nom</FormLabel>
                        <Input
                            id='nom'
                            type='text'
                            value={props.regaladorName}
                            onChange={handleRegaladorNameChange}
                        />
                        {!isError ? (
                            <FormHelperText>
                                Introdueix el teu nom.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>El nom es obligatori</FormErrorMessage>
                        )}
                    </FormControl>
                    <Spacer />
                    <SimpleGrid minChildWidth='180px' spacing='40px'>
                        {props.items.filter((item: WishItem) => item.id !== "").map((item: WishItem) => {
                            return (<WishItemComponent key={item.id} wishItem={item} updateComprare={updateItem} />);
                        })}
                    </SimpleGrid>
                    <br /> <br />
                    <Center w='100%' color='white'>
                        <Button
                            colorScheme={hasSelectedAnyItem && hasWroteAnyName  ? 'blue': 'gray'}
                            size='lg'
                            onClick={hasSelectedAnyItem && hasWroteAnyName ? modalConfirm.onToggle : modalError.onToggle}
                            w="50%">Enviar</Button>
                    </Center>
                </ContentWrap>
            </Middle>
            <ErrorSelectWishOrName
                isOpen={modalError.isOpen}
                onClose={modalError.onClose}
                hasSelectedAnyItem={hasSelectedAnyItem}
                hasWroteAnyName={hasWroteAnyName}
            />
            <BeforeSendFormModal
                isOpen={modalConfirm.isOpen}
                onClose={modalConfirm.onClose}
                sendForm={() => {}}
                nomUsuari={props.regaladorName}
                items={selectedItems()}
            />
        </>
    );
}