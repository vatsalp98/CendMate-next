export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      kycComplete?: boolean;
      role?: "ADMIN" | "USER";
    };
  }
}
