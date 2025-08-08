import Image from "next/image";

interface IconItem {
  name: string;
  path: string;
  width: number;
  height: number;
}

interface BrandListProps {
  title: string;
  brands: IconItem[];
}

const BrandList = ({ title, brands }: BrandListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-md px-4 font-semibold md:text-xl">{title}</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => {
          return (
            <div key={brand.name} className="flex flex-col items-center gap-4">
              <div className="flex h-20 items-center justify-center">
                <Image
                  key={brand.name}
                  src={brand.path}
                  alt={brand.name}
                  width={42}
                  height={42}
                  className="object-cover"
                />
              </div>
              <div className="truncate font-semibold capitalize">
                {brand.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandList;
