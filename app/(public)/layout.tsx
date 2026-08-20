import { Footer } from "@/components/public/Footer";
import { Navbar } from "@/components/public/Navbar";
import { buildSearchIndex } from "@/lib/queries/search";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = await buildSearchIndex();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar searchIndex={searchIndex} />

      {/* Clears the fixed navbar capsule. */}
      <main id="main" className="flex-1 pt-24 sm:pt-28">
        {children}
      </main>

      <Footer />
    </div>
  );
}
