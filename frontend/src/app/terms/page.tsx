import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | Natyaarts",
  description: "Read the Terms & Conditions for Natyaarts Academy. Information regarding services, accounts, payments, intellectual property, and acceptable use.",
};

export default function TermsPage() {
  return <TermsClient />;
}
