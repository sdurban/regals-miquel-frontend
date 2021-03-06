import {ContentWrap, Middle} from "../GlobalCss";
import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    SimpleGrid,
    Stack, Switch,
    Text, useDisclosure, Spacer as ChakraSpacer
} from "@chakra-ui/react";
import {Spacer} from "../components/Spacer";
import {GiftDescriptionContainer, GiftDescriptionText} from "../AppStyledComponents";
import {css} from "@emotion/react";
import {WishItem} from "../model/WishItem";
import {WishItemComponent} from "../components/WishItemComponent";
import React, {PropsWithChildren, SetStateAction, useState} from "react";
import {ErrorSelectWishOrName} from "../components/ErrorSelectWishOrName";
import {BeforeSendFormModal} from "../components/BeforeSendFormModal";


interface CallbackSetRegaladorName {
    (regaladorName: SetStateAction<string>): void;
}

interface CallbackUpdateComprare {
    (wishItemId: number|string, comprare: number): void;
}

interface SendRegalsCallback {
    (): void;
}

export interface Props {
    setRegaladorName: CallbackSetRegaladorName;
    regaladorName: string;
    items: WishItem[];
    updateComprare: CallbackUpdateComprare;
    sendRegals: SendRegalsCallback;
}

export const WishItemsPage = (props: PropsWithChildren<Props>) => {
    const modalError = useDisclosure();
    const modalConfirm = useDisclosure();
    const [ onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
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

        setHasWroteAnyName(wroteAnyName());
    }

    const handleChangeAvailable = () => setOnlyAvailable(!onlyAvailable);

    return (
        <>
            <Middle>
                <ContentWrap>
                    <Stack spacing={3}>
                        <br /><br />
                        <Center><Text fontSize="2xl">Llista regals Miquel</Text></Center>
                    </Stack>
                    <Spacer />
                    <GiftDescriptionContainer>
                        <img css={css`flex: 15%;`} src='./images/miquel.jpg' alt="Foto miquel" />
                        <GiftDescriptionText>
                            Hola fam??lia i amics, <br/> <br />
                            Alguns i algunes de vosaltres ens deman??veu idees de regals per a l'arribada del Miquel. Despr??s de donar-li moltes voltes, hem decidit fer una llista una mica diferent, sense una botiga de refer??ncia i sense productes concrets triats per nosaltres. Estem molt contents que ens vulgueu fer un regal, per?? ens agradaria que ens sorprengu??ssiu triant vosaltres mateixos. Alhora, aix?? permetr?? que ho compreu all?? on us sigui m??s c??mode o fins i tot que ens pugueu regalar all?? que encara guardeu de quan els vostres fills o filles eren petits. <br /> <br />
                            De tota manera, sabem que  alguns de vosaltres teniu dubtes de qu?? regalar, o por de coincidir amb quelcom que ja tinguem o que ens hagi fet arribar ja algun altre familiar o amic. ??s per aix?? que hem creat aquesta llista, on podreu anar veient all?? que necessitem, per?? tamb?? all?? que ja ens fan arribar altres coneguts. Per aix?? ??s important que un cop decidiu quin ser?? el vostre regal ho marqueu a la llista i envieu la resposta. Ja veureu que ??s molt intu??tiu, tot i aix?? si teniu dubtes ens podeu demanar ajuda o opini??, n'estarem encantats!<br /> <br />
                            Aprofitem per agrair-vos d'avan??at els vostres regals!<br /><br />

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
                            on
                        />
                        {!isError ? (
                            <FormHelperText>
                                Introdueix el teu nom.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>El nom es obligatori</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button mt={2}
                        colorScheme={hasSelectedAnyItem && hasWroteAnyName  ? 'blue': 'gray'}
                        size='lg'
                        onClick={hasSelectedAnyItem && hasWroteAnyName ? modalConfirm.onToggle : modalError.onToggle}
                        w="100%">Enviar</Button>
                    <Box mt={3} alignItems='flex-end'>
                        <FormControl display='flex' >
                            <ChakraSpacer />
                            <FormLabel htmlFor='only-available' mb='0'>
                                Mostrar nomes disponibles
                            </FormLabel>
                            <Switch id='only-available'
                                    value={onlyAvailable.toString()}
                                    onChange={handleChangeAvailable}
                            />
                            <Text>&nbsp;&nbsp;&nbsp;</Text>
                        </FormControl>
                    </Box>
                    <Spacer />
                    <SimpleGrid minChildWidth='180px' spacing='40px'>
                        {props.items.filter((item: WishItem) => {
                            let condition = true;

                            if (onlyAvailable) {
                                condition = item.tenim !== item.total;
                            }

                            return item.id !== "" && condition;
                        }).map((item: WishItem) => {
                            return (
                                <WishItemComponent
                                    key={item.id}
                                    wishItem={item}
                                    updateComprare={updateItem}
                                />);
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
                sendRegals={props.sendRegals}
            />
        </>
    );
}