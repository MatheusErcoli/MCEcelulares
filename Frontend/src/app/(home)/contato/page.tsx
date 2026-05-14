import { ContactFormCard } from "./components/ContactFormCard";
import { SocialLinksCard } from "./components/SocialLinksCard";

const Contato = () => {
    return (
        <main className="min-h-screen text-black p-6 md:p-12 lg:p-20">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    <ContactFormCard />

                    <SocialLinksCard />
                    
                </div>

            </div>
        </main>
    );
};

export default Contato;