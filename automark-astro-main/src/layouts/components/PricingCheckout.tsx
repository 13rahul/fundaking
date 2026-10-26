interface PricingCheckoutProps {
  planTitle: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonLabel?: string;
  isFeatured?: boolean;
  buttonLink?: string;
}

const DEFAULT_WHATSAPP =
  "https://wa.me/918421053710?text=Hi%20Rahul%2C%20I%20want%20to%20book%20a%20free%20SEO%20audit";

export default function PricingCheckout({
  planTitle,
  buttonLabel = "Book on WhatsApp",
  buttonLink,
}: PricingCheckoutProps) {
  const href =
    buttonLink && buttonLink.startsWith("http")
      ? buttonLink
      : `${DEFAULT_WHATSAPP}%20about%20${encodeURIComponent(planTitle)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary w-full my-10 block text-center cursor-pointer"
    >
      {buttonLabel}
    </a>
  );
}
