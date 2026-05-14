import { SignCard } from "@/src/components/layout/SignCard";
import Link from "next/link";
import { SignupForm } from "./components/SignupForm";

export default function Cadastro() {
  return (
    <SignCard title="Cadastro" backHref="/">
      <SignupForm />
    </SignCard>
  );
}