/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Address {
  _id: string;
  addressLine1: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  postal: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Transactions {
  fincra: {
    link: string;
    payCode: string;
  };
  amount: number;
  status: string;
  comment: string;
  _id: string;
  user: {
    _id: string;
    fName: string;
    lName: string;
  };
  wallet: {
    _id: string;
    currency: string;
  };
  currency: string;
  type: string;
  referenceId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Wallet {
  amount: number;
  beneficiaries: any[];
  _id: string;
  user: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  phoneNumber: string;
  country: string;
  isVerified: boolean;
  isSubmitted: boolean;
  userName: string;
  userClass: string;
  wallets: Wallet[];
  image: string;
  isAdmin: boolean;
  address: Address;
  token: string;
  clientId: string;
  status: string;
}
