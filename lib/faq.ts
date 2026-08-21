import { formatNumber, formatPricePerPeriod, formatRating } from "@/lib/format";
import type { Software, StarDistribution } from "@/lib/types";

export type Faq = { question: string; answer: string };

/**
 * FAQs are generated from the product's own record rather than hand written,
 * so they can never drift from the data on the page and they exist for every
 * product without an editor writing forty of them.
 */
export function buildFaqs(software: Software, distribution?: StarDistribution): Faq[] {
  const faqs: Faq[] = [];
  const vendor = software.vendor_name ?? software.name;

  /* Cost */
  if (software.starting_price === null) {
    faqs.push({
      question: `How much does ${software.name} cost in South Africa?`,
      answer: `${vendor} does not publish a list price for ${software.name}. It is quoted on scope, usually on user count and the modules you need, and implementation is normally quoted separately. Expect a scoping conversation rather than a price list, and budget the implementation as well as the licence.`,
    });
  } else if (software.starting_price === 0) {
    faqs.push({
      question: `Is ${software.name} really free?`,
      answer: `${software.name} has a genuinely free plan. ${software.pricing_note ?? "Paid tiers add capability beyond the free plan."} Free plans in this category are usually limited by volume or by the features you need as you grow, so check the limits against your own usage before committing to it long term.`,
    });
  } else {
    const price = formatPricePerPeriod(
      software.starting_price,
      software.price_currency,
      software.billing_period,
    );
    const vat =
      software.price_vat_inclusive === null
        ? "with the VAT basis not stated by the vendor"
        : software.price_vat_inclusive
          ? "including VAT"
          : "excluding VAT";
    const rand =
      software.price_currency === "ZAR"
        ? ""
        : " Because it is billed in a foreign currency, the rand cost moves with the exchange rate and carries a card forex fee, so budget it as a variable cost.";
    faqs.push({
      question: `How much does ${software.name} cost in South Africa?`,
      answer: `${software.name} starts at ${price} ${vat}. ${software.pricing_note ?? ""}${rand} List prices move, so confirm the current figure on the vendor's own page before you buy.`.trim(),
    });
  }

  /* Free trial */
  faqs.push({
    question: `Does ${software.name} offer a free trial?`,
    answer: software.free_trial
      ? `Yes. ${software.name} offers a free trial. Use it properly: load real data rather than the sample set, run one full period, and test the specific workflow you are buying it for. A product that feels fast with five records can behave differently with five hundred.`
      : `No. ${software.name} does not offer a self service free trial. ${vendor} works through a demonstration and a scoping process instead, so ask for a proof of concept using your own data if the decision is significant.`,
  });

  /* Local suitability */
  if (software.compliance.length > 0) {
    const positives = software.compliance.filter((item) => !/^(no |not |limited |manual |generic )/i.test(item));
    const gaps = software.compliance.filter((item) => /^(no |not |limited |manual |generic )/i.test(item));

    const parts: string[] = [];
    if (positives.length > 0) {
      parts.push(`It covers ${positives.slice(0, 4).join(", ").toLowerCase()}.`);
    }
    if (gaps.length > 0) {
      parts.push(`Worth knowing before you commit: ${gaps.slice(0, 3).join(", ").toLowerCase()}.`);
    }

    faqs.push({
      question: `Is ${software.name} suitable for a South African business?`,
      answer: parts.join(" ") || `${software.name} is used by South African businesses.`,
    });
  }

  /* Bank feeds, only where relevant */
  if (software.bank_feeds.length > 0) {
    faqs.push({
      question: `Which South African banks does ${software.name} support?`,
      answer: `${software.name} works with ${software.bank_feeds.join(", ")}. A direct feed and a scheduled statement import are not the same thing, so connect your actual account during the trial and leave it for two weeks to see whether the connection holds.`,
    });
  }

  /* Integrations */
  if (software.integrations.length > 0) {
    faqs.push({
      question: `What does ${software.name} integrate with?`,
      answer: `${software.name} connects to ${software.integrations.slice(0, 8).join(", ")}${software.integrations.length > 8 ? " and others" : ""}. Confirm the specific integration you need during the trial rather than trusting a logo on a website, because integration depth varies from a full two way sync to a nightly file transfer.`,
    });
  }

  /* What users say */
  if (software.review_count > 0) {
    const positiveShare = distribution
      ? Math.round(
          ((distribution[3] + distribution[4]) / (distribution.reduce((a, b) => a + b, 0) || 1)) * 100,
        )
      : null;

    faqs.push({
      question: `What do users say about ${software.name}?`,
      answer: `${software.name} holds ${formatRating(software.overall_rating)} out of 5 from ${formatNumber(software.review_count)} verified reviews.${positiveShare !== null ? ` ${positiveShare}% of reviewers rate it four stars or better.` : ""} Reviewers rate it ${formatRating(software.ease_of_use_rating)} for ease of use, ${formatRating(software.value_for_money_rating)} for value for money, ${formatRating(software.customer_service_rating)} for customer service and ${formatRating(software.functionality_rating)} for functionality.`,
    });
  }

  /* Who it suits */
  if (software.best_for_size.length > 0) {
    faqs.push({
      question: `Who is ${software.name} best suited to?`,
      answer: `Based on our assessment and the profile of its reviewers, ${software.name} suits ${software.best_for_size.join(", ").toLowerCase()} businesses, and is most often used by ${software.best_for_role.join(", ").toLowerCase()}.`,
    });
  }

  return faqs;
}
