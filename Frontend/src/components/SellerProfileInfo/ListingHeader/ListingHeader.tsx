// components/ListingHeader.tsx
import { SortDropdown } from "./SortDropdown";
import "./ListingHeader.css";

interface ListingHeaderProps {
  onSortChange?: (value: string) => void;
  showSort?: boolean;
  currentSort?: string;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  onSortChange = () => {},
  showSort = true,
  currentSort = ""
}) => {
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A to Z", value: "name-asc" },
    { label: "Name: Z to A", value: "name-desc" },
  ];

  return (
    <div className="listing-header">
      <h1 className="listing-title">Listings</h1>
      {showSort && (
        <div className="listing-sort">
          <SortDropdown
            options={sortOptions}
            onSortChange={onSortChange}
            defaultValue={currentSort}
            className="w-48" // Set a fixed width
          />
        </div>
      )}
    </div>
  );
};

export default ListingHeader;