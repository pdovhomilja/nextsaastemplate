import { useTranslations } from "next-intl";
import { HeroParallax } from "./_components/hero";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Index");

  const products = [
    {
      title: "Product 1",
      link: "/product/1",
      thumbnail: "/images/nextcrm-dark.png",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/images/nextcrm-light.png",
    },
    {
      title: "Product 1",
      link: "/product/1",
      thumbnail: "/images/nextcrm-dark.png",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/images/nextcrm-light.png",
    },
    {
      title: "Product 1",
      link: "/product/1",
      thumbnail: "/images/nextcrm-dark.png",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/images/nextcrm-light.png",
    },
    {
      title: "Product 1",
      link: "/product/1",
      thumbnail: "/images/nextcrm-dark.png",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/images/nextcrm-light.png",
    },
  ];
  return (
    <main>
      {t("title")}
      <HeroParallax products={products} />
    </main>
  );
}
