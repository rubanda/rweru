import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Page() {
    return (
        <>
            <Header />
            <main className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 space-y-16">
                <Hero />
                <SelectedWork />
                <Services />
                <Contact />
            </main>
            <button className="fixed bottom-8 right-8 size-16 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
                <span className="material-symbols-outlined text-3xl">chat_bubble</span>
            </button>
            <Footer />
        </>
    );
}