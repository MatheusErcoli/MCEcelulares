import Link from "next/link";
import { Icon } from "@/src/components/layout/Icon";
import { Button } from "@/src/components/layout/Button";

export const SocialLinksCard = () => {
    return (
        <aside className="p-8 flex flex-col items-center md:items-start text-center md:text-left gap-10">
            <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold text-black flex items-center gap-3 justify-center md:justify-start">
                    <Icon name="faComment" className="w-8" />
                    Fale direto comigo!
                </h2>
                <p className="text-lg text-black/90">
                    Prefere um contato mais direto? Clique abaixo e fale comigo pelo WhatsApp ou Instagram.
                </p>
            </div>

            <div className="w-full flex flex-col gap-6">
                <Link href="https://wa.me/554599457149" target="_blank" className="w-full">
                    <Button
                        text="WhatsApp"
                        icon="faWhatsapp"
                        className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 rounded-full text-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
                    />
                </Link>

                <Link href="https://www.instagram.com/mcecelulares" target="_blank" className="w-full">
                    <Button
                        text="Instagram"
                        icon="faInstagram"
                        className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white py-4 rounded-full text-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
                    />
                </Link>
            </div>
        </aside>
    );
};