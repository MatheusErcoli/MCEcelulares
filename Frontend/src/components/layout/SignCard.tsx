import { Icon } from "@/src/components/layout/Icon";
import Link from "next/link";
import { ReactNode } from "react";

interface SignCardProps {
  title: string;
  children: ReactNode;
  backHref?: string;
}

export const SignCard = ({ title, children, backHref = "/" }: SignCardProps) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/img/login-background.png')" }}
    >
      <div className="relative w-110 overflow-hidden rounded-[40px] bg-white shadow-2xl">

        <Link
          href={backHref}
          className="absolute right-6 top-3 z-50 flex flex-row-reverse items-center gap-1 text-white transition-all hover:opacity-80"
        >
          <div className="flex h-5 w-5 m-0 items-center justify-center">
            <Icon
              name="faRightFromBracket"
              className="text-white"
              size="lg"
            />
          </div>
          <span className="text-md font-medium">Voltar</span>
        </Link>

        <div className="flex flex-col items-center bg-linear-to-r from-[#5714d7] to-[#7929c8] pb-5 pt-12">
          <img src="/img/logo-mcecelulares.png" alt="Logo" className="h-20 w-auto object-contain" />
          <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
        </div>

        <div className="px-10 pb-3 pt-5">
          {children}
        </div>
      </div>
    </div>
  );
};