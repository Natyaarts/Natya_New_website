import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Natyaarts",
  description: "Read the Privacy Policy for Natyaarts Academy. Information regarding data collection, usage, sharing, cookies, data security, and your rights.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
