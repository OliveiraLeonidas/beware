import Image from "next/image";

import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";

import listBranckIcons from "../../public/icon.json" assert { type: "json" };

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({
    orderBy: (categoryTable, { asc }) => [asc(categoryTable.name)],
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: (productTable, { desc }) => [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="space-y-6">
        <div className="px-4">
          <Image
            src="/banner-01.svg"
            alt="Leve a vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <BrandList
          title="Marcas parceiras"
          brands={Object.values(listBranckIcons.brands)}
        />
        <ProductList title="Mais vendidos" products={products} />
        <CategorySelector categories={categories} />

        <div className="px-5">
          <Image
            src="/banner-02.svg"
            alt="Leve a vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList title="Novidades" products={newlyCreatedProducts} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
