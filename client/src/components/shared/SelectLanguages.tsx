import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLanguagesProps {
  languages: Array<string>;
}

const SelectLanguages: React.FC<SelectLanguagesProps> = ({ languages }) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a lanugage" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>

          {languages.map((lang: string) => (
            <SelectItem value={lang} key={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguages;
