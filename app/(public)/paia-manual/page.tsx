import { LegalPage, legalMetadata } from "@/components/public/LegalPage";

export const revalidate = 3600;

export const generateMetadata = () => legalMetadata("paia-manual");

export default function Page() {
  return <LegalPage slug="paia-manual" />;
}
