import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { SearchCmProps } from "./types";

export const SearchCm: React.FC<SearchCmProps> = ({ endContent }) => {
  return (
    <div className="flex items-center gap-3">
      <Input
        size="lg"
        placeholder="Search ..."
        startContent={
          <Search strokeWidth={1.5} size={20} className="text-default-800" />
        }
        className="grow"
        radius="full"
        classNames={{
          inputWrapper:
            "border border-primary bg-primary-50 focus-within:border-primary focus-within:bg-primary-50",
          input:
            "font-normal text-sm placeholder:font-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent",
        }}
      />

      {endContent ? endContent : null}
    </div>
  );
};
