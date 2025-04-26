import { getTranslations } from "next-intl/server";
import { HeroParallax } from "./_components/hero";

export default async function Home() {
  const t = await getTranslations("Index");

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
