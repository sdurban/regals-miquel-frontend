/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import Loader from "./components/Loader";
import {BackgroundDrop, CenterInScreen} from "./GlobalCss";
import {WishItem} from "./model/WishItem";
import {WishItemsPage} from "./pages/WishItemsPage";
import {ItemRequest, SendItemsRequest} from "./model/SendItemsRequest";
import {ThankYouPage} from "./pages/ThankYouPage";

function App() {
    const MIQUEL_WEBHOOK = "https://n8n.durban.cat/webhook/miquel-list";
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

    const sendRegals = (): void => {
        const postBody: SendItemsRequest = {
            nom: regaladorName,
            items: items.filter((it) => it.comprare != null && it.comprare > 0).map((it): ItemRequest => {
                return {
                    id: it.id,
                    quantity: it.comprare!,
                }
            })
        };

        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(postBody)
        };

        setIsSending(true);

        // @ts-ignore
        fetch(MIQUEL_WEBHOOK, requestMetadata)
            .then(res => res.json())
            .then(() => {
                setIsSending(false);
                setThankYou(true)
            });
    }

  useEffect(() => {
    fetch(MIQUEL_WEBHOOK)
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
          <ThankYouPage
              name={regaladorName}
              items={items.filter((it) => it.comprare != null && it.comprare > 0)}
          />
      )
  }
  return (
      <WishItemsPage
          setRegaladorName={setRegaladorName}
          regaladorName={regaladorName}
          items={items}
          updateComprare={updateComprare}
          sendRegals={sendRegals}
      />
  );
}

export default App;
