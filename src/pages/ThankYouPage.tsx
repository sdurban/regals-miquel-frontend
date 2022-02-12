import {WishItem} from "../model/WishItem";
import React, {PropsWithChildren} from "react";
import {Box, Center, ListItem, Text, UnorderedList} from "@chakra-ui/react";

export interface Props {
    name: string;
    items: WishItem[];
}

export const ThankYouPage =  (props: PropsWithChildren<Props>) => {
    return (
        <Center h="100vh">
        <Box p="5" w="md" borderWidth="1px" backgroundColor={"white"}>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" textAlign="center">
                Moltes gracies {props.name}!!
            </Text>
            <Text mt={10}>
                Has triat els seguents items:
                <UnorderedList>
                    {props.items.map((item: WishItem) => {
                        return (<ListItem>{item.item} (x{item.comprare}).</ListItem>)
                    })}
                </UnorderedList>
            </Text>
        </Box>
    </Center>
    )
}