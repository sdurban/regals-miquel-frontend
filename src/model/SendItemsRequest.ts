export type SendItemsRequest = {
    nom: string;
    items: ItemRequest[];
}

export type ItemRequest = {
    id: string|number;
    quantity: string|number;
}