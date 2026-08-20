import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/public/navigation";
import { NewsletterUnsubscribeForm } from "@/components/public/NewsletterUnsubscribeForm";
import { SectionHeader } from "@/components/public/SectionHeader";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Remove your email address from the Bosberaaad newsletter.",
  alternates: { canonical: "/newsletter/unsubscribe" },
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage(
  props: PageProps<"/newsletter/unsubscribe">,
) {
  const searchParams = await props.searchParams;
  const raw = searchParams.email;
  const email = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  return (
    <div className="container-site space-y-10 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Newsletter", href: "/newsletter" },
          { label: "Unsubscribe" },
        ]}
      />

      <SectionHeader
        as="h1"
        eyebrow="One click, no questions"
        title="Unsubscribe from the"
        highlight="newsletter"
        subtitle="Enter the address you subscribed with. We will not ask you why, and we will not try to talk you out of it."
      />

      <div className="mx-auto w-full max-w-lg">
        <NewsletterUnsubscribeForm defaultEmail={email} />
      </div>
    </div>
  );
}
