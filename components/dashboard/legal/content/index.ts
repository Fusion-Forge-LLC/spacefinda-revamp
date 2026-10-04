import { cancellationPolicy } from "./cancellation-policy";
import { paymentSecurity } from "./payment-security";
import { privacyPolicy } from "./privacy-policy";
import { termsOfService } from "./terms-of-service";

export const LEGAL_DOCUMENTS = [privacyPolicy, termsOfService, cancellationPolicy, paymentSecurity];

export const getLegalDocument = (slug: string) => LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);

export const LEGAL_EFFECTIVE_DATE = "April 2026";
