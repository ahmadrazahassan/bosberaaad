import { LegalPage, legalMetadata } from "@/components/public/LegalPage";

export const revalidate = 3600;

export const generateMetadata = () => legalMetadata("editorial-policy");

export default function Page() {
  return <LegalPage slug="editorial-policy" />;
}
