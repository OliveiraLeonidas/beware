import type { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={"ghost"}
            className="rounded-full bg-white text-xs font-semibold"
          >
            {category.name}{" "}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
