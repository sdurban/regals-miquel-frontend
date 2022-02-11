/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import Loader from "./components/Loader";
import {BackgroundDrop, CenterInScreen, ContentWrap, Middle} from "./GlobalCss";
import {Text} from "@chakra-ui/react";
import {WishItem} from "./model/WishItem";
import {WishItemsPage} from "./pages/WishItemsPage";

function App() {
  const [error, setError] = useState<Error|null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sending, setIsSending] = useState<boolean>(false);
  const [thankYou, setThankYou] = useState<boolean>(false);
  const [items, setItems] = useState<WishItem[]>([]);
  const [regaladorName, setRegaladorName] = useState<string>('');

  const updateComprare = (wishItemId: number|string, comprare: number) => {
      for (const item of items) {
          if (item.id === wishItemId) {
              item.comprare = comprare;

              break;
          }
      }
      setItems(items);
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
            Alguna cosa ha funcionat malament intenta-ho mes tard.
        </CenterInScreen>
    </BackgroundDrop>
  } else if (!isLoaded) {
      return (
          <Loader />
      );
  } else if(sending) {
      return (
          <Loader />
      )
  } else if(thankYou) {
      return (
          <Text>Thank you</Text>
      )
  }
  return (
      <WishItemsPage
          setRegaladorName={setRegaladorName}
          regaladorName={regaladorName}
          items={items}
          updateComprare={updateComprare} />
  );
}

export default App;
