/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

import { z } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WebhookResponse {
  data: {
    backup_code_enabled: boolean;
    banned: boolean;
    create_organization_enabled: boolean;
    created_at: number;
    delete_self_enabled: boolean;
    email_addresses: EmailAddress[];
    external_accounts: unknown[];
    external_id: string | null;
    first_name: string;
    has_image: boolean;
    id: string;
    image_url: string;
    last_active_at: number;
    last_name: string;
    last_sign_in_at: number | null;
    locked: boolean;
    lockout_expires_in_seconds: number | null;
    mfa_disabled_at: number | null;
    mfa_enabled_at: number | null;
    object: string;
    passkeys: unknown[];
    password_enabled: boolean;
    phone_numbers: PhoneNumber[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Record<string, unknown>;
    profile_image_url: string;
    public_metadata: Record<string, unknown>;
    saml_accounts: unknown[];
    totp_enabled: boolean;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, unknown>;
    updated_at: number;
    username: string | null;
    verification_attempts_remaining: number;
    web3_wallets: unknown[];
  };
  event_attributes: {
    http_request: {
      client_ip: string;
      user_agent: string;
    };
  };
  object: string;
  type: string;
}

interface EmailAddress {
  created_at: number;
  email_address: string;
  id: string;
  linked_to: unknown[];
  object: string;
  reserved: boolean;
  updated_at: number;
  verification: {
    attempts: number;
    expire_at: number;
    status: string;
    strategy: string;
  };
}

interface PhoneNumber {
  backup_codes: unknown;
  created_at: number;
  default_second_factor: boolean;
  id: string;
  linked_to: unknown[];
  object: string;
  phone_number: string;
  reserved: boolean;
  reserved_for_second_factor: boolean;
  updated_at: number;
  verification: unknown;
}

export interface MobileMoneyOperator {
  name: string;
  value: string;
  icon: string;
}

// Define the structure of the entire response
export interface OperatorResponseModel {
  status: boolean;
  message: string;
  data: MobileMoneyOperator[];
}

export interface MapleRadCustomerData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  status: string;
  tier: number;
  created_at: string;
  updated_at: string;
}

// Define the structure of the entire response
export interface MapleRadResponseModel {
  status: boolean;
  message: string;
  data: MapleRadCustomerData;
}

export interface MapleRadUpgradeResponse {
  status: boolean;
  message: string;
}

export interface AccountCreationResponse {
  status: boolean;
  message: string;
  data: VirtualAccountData;
}

interface VirtualAccountData {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  currency: string;
  created_at: string; // ISO 8601 date string
}

export interface FincraApiResponse {
  status: boolean;
  message: string;
  data: {
    link: string;
    payCode: string;
  };
}

// FINCRA WEBHOOK RESPONSE
interface Authorization {
  mode: string | null;
  redirect: string | null;
  metadata: any | null;
}

interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
}

interface VirtualAccount {
  bankName: string;
  id: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  sessionId: string;
  channelName: string;
  payerAccountNumber: string;
  payerAccountName: string;
  payerBankName: string;
  payerBankCode: string;
  expiresAt: string;
  business: string;
}

interface Data {
  chargeReference: string;
  amountToSettle: number;
  id: number;
  authorization: Authorization;
  auth_model: string | null;
  amount: number;
  amountExpected: number;
  amountReceived: number;
  varianceType: string | null;
  currency: string;
  fee: number;
  vat: number;
  message: string;
  actionRequired: string | null;
  status: string;
  reference: string;
  description: string;
  type: string;
  customer: Customer;
  metadata: {
    phone: string;
    operator: string;
  };
  settlementDestination: string;
  settlementTime: string;
  virtualAccount: VirtualAccount;
}

export interface FincraChargeEvent {
  event: string;
  data: Data;
}

export interface ComplySession {
  redirectUrl: string;
}

export interface ComplyCheckCompleted {
  id: string;
  type: string;
  resourceType: string;
  payload: ComplyPayload;
  createdAt: string;
}

interface ComplyPayload {
  id: string;
  clientId: string;
  enableMonitoring: boolean;
  outcome: string;
  createdAt: string;
  updatedAt: string;
}

export interface beneficiaryResponseSchemaObject {
  $schema: string;
  $id: string;
  type: string;
  title: string;
  required: string[];
  properties: Record<keyof Beneficiary, beneficiaryPropertySchema>;
}

export interface beneficiaryPropertySchema {
  $id: string;
  type: string;
  title: string;
  maxLength?: string;
  enum?: string[];
  pattern?: string;
  errorMessage: string;
}

export interface Beneficiary {
  clientLegalEntity: string;
  destinationCountry: "CA" | string; // "CA" for Canada, string for other countries
  beneficiaryName: string;
  beneficiaryAddress?: string;
  beneficiaryCity?: string;
  beneficiaryState?: string;
  beneficiaryPostcode?: string;
  beneficiaryCountryCode: string;
  beneficiaryAccountType: "Individual" | "Corporate";
  beneficiaryAccountNumber: string;
  beneficiaryBankCode?: string;
  routingCodeType1: "TRANSIT NUMBER" | "SWIFT" | "INTERAC";
  routingCodeValue1: string;
  beneficiaryAlias?: string;
  beneficiaryEmail?: string;
  beneficiaryBankAccountType?: "Checking" | "Saving" | "Maestra" | "Current";
  beneficiaryContactNumber?: string;
  remitterBeneficiaryRelationship?: string;
  beneficiaryBankName?: string;
  beneficiaryIdentificationType?: string;
  beneficiaryIdentificationValue?: string;
  routingCodeType2?: string;
  routingCodeValue2?: string;
}

// curl --request POST \
//      --url https://gateway.nium.com/api/v2/client/7ae4ae1a-7bac-45c7-8212-b27d26743454/customer/8d992de5-2aaf-4e7c-8fa9-a0ae683fa590/beneficiaries \
//      --header 'accept: */*' \
//      --header 'content-type: application/json' \
//      --header 'x-api-key: dNIRWnsnXr9tR625jDiYw2zWh53GJyO68xvtvYuf' \
//      --data '
// {
//   "beneficiaryAccountType": "Individual",
//   "beneficiaryCountryCode": "CA",
//   "destinationCurrency": "USD",
//   "destinationCountry": "US",
//   "beneficiaryName": "RanjithP Singh",
//   "beneficiaryAddress": "TOWER bridge of MY",
//   "beneficiaryCity": "Wales",
//   "beneficiaryState": "MY",
//   "beneficiaryPostcode": "654646",
//   "beneficiaryAccountNumber": "TESTCAODF12",
//   "routingCodeType1": "ACH CODE",
//   "routingCodeValue1": "111000025"
// }

interface AddBeneficiaryResponse {
  beneficiaryHashId: string; // Alphanumeric
  beneficiaryName: string; // Alphanumeric and special characters
  beneficiaryContactCountryCode?: string | null; // Optional, nullable
  beneficiaryContactNumber?: string | null; // Optional, nullable
  beneficiaryAccountType: "Individual" | "Corporate"; // Either "Individual" or "Corporate"
  beneficiaryEmail?: string | null; // Optional, nullable
  autosweepPayoutAccount: boolean; // Boolean
  defaultAutosweepPayoutAccount: boolean; // Boolean
  remitterBeneficiaryRelationship?: string | null; // Optional, nullable
  beneficiaryAddress: string; // Alphanumeric and special characters
  beneficiaryCountryCode: string; // Valid country code
  beneficiaryState: string; // Alphanumeric
  beneficiaryCity: string; // Alphanumeric
  beneficiaryPostcode: string; // Alphanumeric
  beneficiaryCreatedAt: string; // Date string
  beneficiaryUpdatedAt: string; // Date string
  payoutHashId: string; // Alphanumeric
  destinationCountry: string; // Valid country code
  destinationCurrency: string; // Valid currency code
  beneficiaryBankName: string; // Alphanumeric and special characters
  beneficiaryBankAccountType?: string | null; // Optional, nullable
  beneficiaryAccountNumber: string; // Alphanumeric
  beneficiaryBankCode?: string | null; // Optional, nullable
  routingCodeType1: string; // Alphanumeric
  routingCodeValue1: string; // Alphanumeric
  routingCodeType2?: string | null; // Optional, nullable
  routingCodeValue2?: string | null; // Optional, nullable
  payoutMethod: string; // Alphanumeric
  beneficiaryIdentificationType?: string | null; // Optional, nullable
  beneficiaryIdentificationValue?: string | null; // Optional, nullable
  payoutCreatedAt: string; // Date string
  payoutUpdatedAt: string; // Date string
  beneficiaryCardType?: string | null; // Optional, nullable
  beneficiaryCardToken?: string | null; // Optional, nullable
  beneficiaryCardNumberMask?: string | null; // Optional, nullable
  beneficiaryCardIssuerName?: string | null; // Optional, nullable
  beneficiaryCardExpiryDate?: string | null; // Optional, nullable
  beneficiaryCardMetaData?: string | null; // Optional, nullable
  proxyType?: string | null; // Optional, nullable
  proxyValue?: string | null; // Optional, nullable
  convertDestinationCurrency: boolean; // Boolean
  beneficiaryContactName?: string | null; // Optional, nullable
  beneficiaryEntityType?: string | null; // Optional, nullable
  beneficiaryDob?: string | null; // Optional, nullable
  beneficiaryEstablishmentDate?: string | null; // Optional, nullable
  accountVerification?: string | null; // Optional, nullable
}
