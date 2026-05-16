import type { Metadata } from "next";
import RefundClient from "./RefundClient";

export const metadata: Metadata = {
  title: "Refund Policy | Natyaarts",
  description: "Read the Refund Policy for Natyaarts Academy. Information regarding eligibility, non-refundable items, request process, review workflow, and processing time.",
};

export default function RefundPage() {
  return <RefundClient />;
}
