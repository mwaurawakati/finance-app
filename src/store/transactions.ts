import { defineStore } from "pinia";

//import { set } from "../app/store";

export interface Transaction {
  ID: number; // Unique identifier for the transaction
  CardHolderName: string; // Name of the cardholder
  CardNumber: string; // Masked card number, e.g., "**** **** **** 1234"
  Amount: number; // Transaction amount (positive value for both debit and credit)
  Currency: string; // Currency of the transaction, e.g., "USD", "EUR"
  Date: Date; // Date and time of the transaction
  MerchantOrSource: string; // Name of the merchant or source (e.g., employer for salary)
  Type: TransactionType; // Transaction type (Debit or Credit)
  Category: TransactionCategory; // Category of the transaction, e.g., "Food", "Salary"
  Status: TransactionStatus; // Status of the transaction, e.g., "Completed", "Pending", "Failed"
  Image: string;
  Fee: number
}

export enum TransactionType {
  Debit = "Debit", // Money spent or withdrawn
  Credit = "Credit", // Money received
  Add = "Add"
}

export enum TransactionCategory {
  Food = "Food",
  Travel = "Travel",
  Shopping = "Shopping",
  Entertainment = "Entertainment",
  Utilities = "Utilities",
  Salary = "Salary", // Incoming salary payment
  Refund = "Refund", // Money refunded
  Other = "Other",
}

export enum TransactionStatus {
  Completed = "Completed",
  Pending = "Pending",
  Failed = "Failed",
}

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [
      {
        ID: 1,
        CardHolderName: "John Doe",
        CardNumber: "1234",
        Amount: 45.99,
        Currency: "USD",
        Date: new Date("2024-11-29T10:30:00"),
        MerchantOrSource: "Starbucks",
        Type: TransactionType.Debit,
        Category: TransactionCategory.Food,
        Status: TransactionStatus.Completed,
        Image: "/starbucks.png",
        Fee: 20.021
      },
      {
        ID: 2,
        CardHolderName: "John Doe",
        CardNumber: "**** **** **** 1234",
        Amount: 1500.0,
        Currency: "USD",
        Date: new Date("2024-11-28T09:00:00"),
        MerchantOrSource: "Acme Corp",
        Type: TransactionType.Add,
        Category: TransactionCategory.Salary,
        Status: TransactionStatus.Completed,
        Image: "/mastercard.png",
        Fee: 0
      },
      {
        ID: 3,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 4,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 5,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0
      },
      {
        ID: 6,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 7,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 8,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png", 
        Fee: 0,
      },
      {
        ID: 9,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png", 
        Fee: 0,
      },
      {
        ID: 10,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-27T15:00:00"),
        MerchantOrSource: "Amazon",
        Type: TransactionType.Credit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 11,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-28T15:00:00"),
        MerchantOrSource: "Bolt",
        Type: TransactionType.Debit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0,
      },
      {
        ID: 12,
        CardHolderName: "Jane Smith",
        CardNumber: "**** **** **** 5678",
        Amount: 50.0,
        Currency: "USD",
        Date: new Date("2024-11-21T15:00:00"),
        MerchantOrSource: "Bolt",
        Type: TransactionType.Debit,
        Category: TransactionCategory.Refund,
        Status: TransactionStatus.Completed,
        Image: "/bolt.png",
        Fee: 0
      },
    ] as Transaction[],
    
  }),
});
