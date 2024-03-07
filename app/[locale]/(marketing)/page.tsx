import Image from "next/image";
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
      thumbnail: "/product-1.jpg",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/product-2.jpg",
    },
    {
      title: "Product 3",
      link: "/product/3",
      thumbnail: "/product-3.jpg",
    },
    {
      title: "Product 4",
      link: "/product/4",
      thumbnail: "/product-4.jpg",
    },
    {
      title: "Product 5",
      link: "/product/5",
      thumbnail: "/product-5.jpg",
    },
    {
      title: "Product 6",
      link: "/product/6",
      thumbnail: "/product-6.jpg",
    },
    {
      title: "Product 7",
      link: "/product/7",
      thumbnail: "/product-7.jpg",
    },
    {
      title: "Product 8",
      link: "/product/8",
      thumbnail: "/product-8.jpg",
    },
    {
      title: "Product 9",
      link: "/product/9",
      thumbnail: "/product-9.jpg",
    },
  ];
  return (
    <main>
      {t("title")}
      <HeroParallax products={products} />
    </main>
  );
}
