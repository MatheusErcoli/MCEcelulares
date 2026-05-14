"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Icon } from "./Icon";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all flex items-center gap-2"
    >
      Sair <Icon name="faRightFromBracket" className="w-3" />
    </button>
  );
};