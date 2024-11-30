import { defineStore } from "pinia";

//import { set } from "../app/store";

 export interface Card {
  Name: string;
  ExpiryDay: string;
  CardNumber: string;
  CVV: string;
  ID: number;
  Type: CardType;
  ShowCVV: boolean;
  BankName: string;
}

export enum CardType {
  Mastercard = "Mastercard",
  Visa = "Visa",
  Apple = "Apple",
  Google = "Google",
}

export const useCardStore = defineStore("card", {
  state: () => ({
    cards: [
      {
        ID: 0,
        CardNumber: "4783932500451082",
        Name: "Mwaura Wakati",
        CVV: "123",
        Type: CardType.Visa,
        ExpiryDay: "12/24",
        ShowCVV: false,
        BankName: "Equity Bank"
      },
    ] as Card[],
    defaultCards: [
        {
          ID: 0,
          CardNumber: "4783932500451082",
          Name: "Mwaura Wakati",
          CVV: "123",
          Type: CardType.Visa,
          ExpiryDay: "12/24",
          ShowCVV: false
        },
      ] as Card[],
  }),
});
