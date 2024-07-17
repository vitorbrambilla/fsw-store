import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "../../components/ui/section-title";
import PrommoBanner from "./components/promo-banner";
import ProductList from "@/components/ui/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <PrommoBanner src="/banner-01.svg" alt="Até 55% de desconto esse mês!" />

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PrommoBanner src="/banner-02.svg" alt="Até 55% de desconto em mouses!" />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PrommoBanner
          src="/banner-03.svg"
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
