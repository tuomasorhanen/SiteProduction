import { ICategory } from '../../_lib/types';

type CategoryFilterProps = {
  categories: ICategory[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryName: string | null) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex flex-wrap justify-center px-2 pt-8 md:pt-16">
      <button
        className={`mt-2 sm:text-sm md:text-lg ${
          selectedCategory === null ? 'button border-bg bg-accent text-white' : 'button'
        }`}
        onClick={() => setSelectedCategory(null)}>
        Kaikki
      </button>
      {categories.map(category => (
        <button
          key={category._id}
          className={`mt-2 sm:text-sm md:text-lg ${
            selectedCategory === category.name ? 'button border-bg bg-accent text-white' : 'button'
          }`}
          onClick={() => setSelectedCategory(category.name)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
