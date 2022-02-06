/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import Loader from "./components/Loader";
import {BackgroundDrop, CenterInScreen, ContentWrap, Middle} from "./GlobalCss";
import {css} from '@emotion/react';
import {GiftDescriptionContainer, GiftDescriptionText} from "./AppStyledComponents";
import {
    Box, Button, Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    SimpleGrid,
    Stack,
    Text
} from "@chakra-ui/react";
import {WishItemComponent} from "./components/WishItemComponent";
import {Spacer} from "./components/Spacer";
import {WishItem} from "./model/WishItem";

function App() {
  const [error, setError] = useState<Error|null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<WishItem[]>([]);
  const [regaladorName, setRegaladorName] = useState<string>('');

  const handleRegaladorNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setRegaladorName(e.target.value);
  const isError = regaladorName === '';

  const updateComprare = (wishItemId: number|string, comprare: number) => {
      for (const item of items) {
          if (item.id === wishItemId) {
              item.comprare = comprare;

              break;
          }
      }
    }

  useEffect(() => {
    fetch("https://n8n.durban.cat/webhook/miquel-list")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])

  if (error) {
    return <BackgroundDrop>
        <CenterInScreen>
            Alguna cosa a funcionat malament intenta-ho mes tard.
        </CenterInScreen>
    </BackgroundDrop>
  } else if (!isLoaded) {
    return (
      <Loader />
    );
  }
  return (
      <Middle>
          <ContentWrap>
              <Stack spacing={3}>
                  <br /><br />
                  <Center><Text fontSize="2xl">Llista regals miquel</Text></Center>
              </Stack>
              <Spacer />
              <GiftDescriptionContainer>
                  <img css={css`flex: 15%;`} src='./images/miquel.jpg' alt="Foto miquel" />
                  <GiftDescriptionText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et congue turpis. Nam et lacinia nunc. Nam augue ante, imperdiet nec erat quis, accumsan pharetra diam. Phasellus ut tempor risus. Fusce a aliquam mi, vel rhoncus erat. Fusce sed ultricies erat. Aenean vehicula, felis vitae rhoncus lacinia, tortor tellus volutpat nisl, a interdum turpis lorem quis ex. In vitae leo in dui interdum luctus. Sed ullamcorper augue eget sapien fringilla euismod. Donec pharetra tellus id sodales mattis. Pellentesque eu enim ac nisl dapibus venenatis ac in urna. Morbi sed augue varius, posuere tellus eu, accumsan sem. Cras lobortis lectus id nisi finibus, vitae commodo nisi dapibus. </GiftDescriptionText>
              </GiftDescriptionContainer>
              <Spacer />
              <FormControl isInvalid={isError} isRequired>
                  <FormLabel htmlFor='email'>Nom</FormLabel>
                  <Input
                      id='nom'
                      type='text'
                      value={regaladorName}
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
                  {items.filter((item: WishItem) => item.id !== "").map((item: WishItem) => {
                      return (<WishItemComponent key={item.id} wishItem={item} updateComprare={updateComprare} />);
                  })}
              </SimpleGrid>
              <br /> <br />
              <Center w='100%' color='white'>
                  <Button colorScheme='blue' size='lg' w="50%">Enviar</Button>
              </Center>
          </ContentWrap>
      </Middle>
  );
}

export default App;
