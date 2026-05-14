import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './Icon';

export const Footer = () => {
    const googleMapsUrl = "https://maps.app.goo.gl/noykfqR7HGqMM55DA";

    return (
        <footer className="bg-gradient-to-r from-[#5714d7] to-[#7929c8] text-white px-20 py-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="flex-1 flex gap-4 items-center justify-center md:justify-start w-full">
                    <Link href="https://wa.me/554599457149" className="bg-white p-2 rounded-full hover:bg-gray-300 transition-colors" target='_blank' rel="noopener noreferrer">
                        <Icon name="faWhatsapp" className="text-[#25D366] text-xl w-6 h-6" />
                    </Link>
                    <Link href="https://www.instagram.com/mcecelulares" className="bg-white p-2 rounded-full hover:bg-gray-300 transition-colors" target='_blank' rel="noopener noreferrer">
                        <Icon name="faInstagram" className="text-[#E4405F] text-xl w-6 h-6" />
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center">
                    <Image src="/img/logo-mcecelulares.png" className="w-[180px] my-3 h-auto" alt="Logo" width={1365} height={503} priority />
                    <p className="text-sm">
                        © {new Date().getFullYear()} Todos os direitos reservados
                    </p>
                </div>

                <Link 
                    href={googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 w-full text-center md:text-right flex flex-col items-center md:items-end text-sm hover:text-gray-300 transition-colors"
                >
                    <p className="font-semibold uppercase flex items-center gap-2 justify-center md:justify-end">
                        <Icon name='faSearchLocation' className="w-4"/> Rua Minas Gerais - 37
                    </p>
                    <p>85420-000 / Centro, Corbélia - PR </p>
                    <span className="mt-2 decoration-1 underline-offset-4 underline">
                        (45) 99945-7149
                    </span>
                </Link>

            </div>
        </footer>
    );
};