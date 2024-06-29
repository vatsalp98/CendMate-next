/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
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
  amountCharged?: number;
  varianceType: string | null;
  currency: string;
  fee: number;
  vat: number;
  message: string;
  actionRequired: string | null;
  status: string;
  reference: string;
  customerReference?: string;
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

export interface FincraPayoutResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    reference: string;
    customerReference: string;
    status: string;
    documentsRequired: any[]; // Adjust this type if documentsRequired has a specific structure
  };
}

export interface FincraPayoutTransaction {
  id: number;
  amountCharged: number;
  amountReceived: number;
  recipient: {
    name: string;
    accountNumber: string;
    type: string;
    email: string;
  };
  fee: number;
  rate: number;
  paymentScheme: string | null; // Assuming it can be a string or null
  paymentDestination: string;
  sourceCurrency: string;
  destinationCurrency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reference: string;
  customerReference: string;
  reason: string;
  traceId: string | null; // Assuming it can be a string or null
  valuedAt: string;
}

export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: MapContext;
  language: string;
  maki: string;
  poi_category?: string[];
  poi_category_ids?: string[];
  external_ids?: object;
  metadata: object;
}
interface Country {
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

interface Postcode {
  id: string;
  name: string;
}

interface Place {
  id: string;
  name: string;
}

interface Neighborhood {
  id: string;
  name: string;
}

interface Address {
  name: string;
  address_number: string;
  street_name: string;
}

interface Street {
  name: string;
}

interface Region {
  id: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

interface MapContext {
  country: Country;
  postcode: Postcode;
  place: Place;
  neighborhood: Neighborhood;
  address: Address;
  street: Street;
  region: Region;
}

export interface MapboxResponse {
  suggestions: Suggestion[];
  attribution: string;
  response_id: string;
}

interface RateInfo {
  rate: number;
  timestamp: string;
}

export type RatesToUSD = Record<string, RateInfo>;
