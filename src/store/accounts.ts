import { defineStore } from "pinia";
import {
  useTransactionStore,
  TransactionCategory,
  TransactionType,
  TransactionStatus,
} from "./transactions";
import { Card } from "./cards";

//import { set } from "../app/store";

interface Account {
  Name: string;
  AccountNumber: number;
  ID: number;
  Type: AccountType;
  Balance: number;
}

enum AccountType {
  Balance = "Balance",
  Jar = "Jar",
  Personal = "Personal",
}

export const useAccountStore = defineStore("account", {
  state: () => ({
    cards: [
      {
        ID: 1,
        AccountNumber: 4783932500451082,
        Name: "EUR",
        Balance: 123.09,
        Type: AccountType.Balance,
      },
      {
        ID: 2,
        AccountNumber: 4783932500451082,
        Name: "USD",
        Balance: 12356.56,
        Type: AccountType.Balance,
      },
      {
        ID: 3,
        AccountNumber: 4783932500451082,
        Name: "GBP",
        Balance: 340.01,
        Type: AccountType.Balance,
      },
      {
        ID: 4,
        AccountNumber: 4783932500451082,
        Name: "AUD",
        Balance: 2000.0,
        Type: AccountType.Balance,
      },
      {
        ID: 5,
        AccountNumber: 4783932500451082,
        Name: "JPY",
        Balance: 100.65,
        Type: AccountType.Balance,
      },
    ] as Account[],
    defaultAccounts: [
      {
        ID: 1,
        AccountNumber: 4783932500451082,
        Name: "EUR",
        Balance: 7.05,
        Type: AccountType.Personal,
      },
      {
        ID: 2,
        AccountNumber: 4783932500451082,
        Name: "USD",
        Balance: 12356.22,
        Type: AccountType.Personal,
      },
      {
        ID: 3,
        AccountNumber: 4783932500451082,
        Name: "GBP",
        Balance: 340.45,
        Type: AccountType.Personal,
      },
      {
        ID: 4,
        AccountNumber: 4783932500451082,
        Name: "AUD",
        Balance: 2000.453,
        Type: AccountType.Personal,
      },
      {
        ID: 5,
        AccountNumber: 4783932500451082,
        Name: "JPY",
        Balance: 100.34,
        Type: AccountType.Personal,
      },
    ] as Account[],
    activeAccountIndex: 0,
  }),
  actions: {
    updateAccount(id: number, amount: number, card: Card) {
      const transactionStore = useTransactionStore();
      const account = this.defaultAccounts.find((account) => account.ID === id);
      if (account) {
        account.Balance += amount;
        transactionStore.transactions.push({
          ID: transactionStore.transactions.length + 1,
          CardHolderName: card.Name,
          CardNumber: card.CardNumber,
          Amount: amount,
          Currency: account.Name,
          Date: new Date(),
          MerchantOrSource: "",
          Type: TransactionType.Add,
          Category: TransactionCategory.Other,
          Status: TransactionStatus.Completed,
          Image: "",
          Fee: 0,
        });
        transactionStore.transactions.sort(
          (a, b) => b.Date.getTime() - a.Date.getTime()
        );
      } else {
        console.error(`Account with ID ${id} not found`);
      }
    },
  },
});
