"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { ControlledSelectCmProps, SelectOption } from "./types";
import { Input } from "@heroui/input";
import { OutsideWrapper } from "../outside-wrapper";
import { ChevronDown, Search } from "lucide-react";

export function ControlledSelect<TFieldValues extends FieldValues>({
  options,
  name,
  isLoading,
  label,
  offlineSearch,
  emptyStateMessage,
  onAfterSelect,
  onSearch,
  isSearchAble = true,
  size = "md",
}: ControlledSelectCmProps<TFieldValues>) {
  const { control } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (onSearch) {
      const timeout = setTimeout(() => {
        onSearch(searchValue);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchValue, onSearch]);

  const handleOfflineSearch = useCallback(
    (searchValue: string) => {
      if (searchValue.trim() === "") {
        setFilteredOptions([]);
        return;
      }

      const filteredList = options?.filter((opt) =>
        opt.label.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredOptions(filteredList);
    },
    [options]
  );

  const selectOptions = useMemo(() => {
    if (offlineSearch && searchValue.trim() !== "") {
      return filteredOptions;
    }

    return options;
  }, [searchValue, offlineSearch, options, filteredOptions]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSearchValue("");
    setFilteredOptions([]);
  }, []);

  return (
    <OutsideWrapper operator={closeMenu}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selectedOption = options.find(
            (item) => item.value === field.value
          );

          return (
            <div className="relative">
              <Input
                size={size}
                variant="bordered"
                label={label}
                onFocus={() => setIsOpen(true)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                name={field.name}
                endContent={
                  <ChevronDown
                    className={`mb-2 text-foreground-600 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={19}
                  />
                }
                isReadOnly
                value={selectedOption?.label || ""}
              />

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.175 }}
                    className="absolute z-999999 w-full bg-white border border-divider rounded-lg mt-2 p-3 overflow-hidden"
                  >
                    {isSearchAble && (
                      <Input
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="search..."
                        value={searchValue}
                        className="pb-4"
                        variant="bordered"
                        autoFocus
                        onChange={(e) => {
                          setSearchValue(e.target.value);

                          if (offlineSearch) {
                            handleOfflineSearch(e.target.value);
                          }
                        }}
                        endContent={
                          <Search className="text-gray-500" size={20} />
                        }
                      />
                    )}

                    <div
                      className={`flex flex-col gap-y-4 pb-1 min-h-40 max-h-80 overflow-y-auto`}
                    >
                      {isLoading ? (
                        <div className="flex flex-col gap-y-4">
                          {Array.from({ length: 5 }, (_, idx) => (
                            <div
                              key={`loading-${idx}`}
                              className="flex items-center gap-x-3"
                            >
                              {/* <Skeleton className="size-5 rounded-md"></Skeleton>
                              <Skeleton className="w-60 h-3 rounded-xs"></Skeleton> */}
                            </div>
                          ))}
                        </div>
                      ) : selectOptions.length ? (
                        <div className="space-y-1">
                          {selectOptions?.map((option) => {
                            return (
                              <div
                                key={option.value}
                                className={`p-2.5 rounded-lg  ${
                                  field.value === option.value
                                    ? "bg-primary text-white!"
                                    : "cursor-pointer hover:bg-primary/10 text-foreground-600"
                                }`}
                                onClick={() => {
                                  field.onChange(option.value);
                                  onAfterSelect?.(option);
                                  closeMenu();
                                }}
                              >
                                <p className="text-sm">{option.label}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-center py-3 text-foreground-600">
                          {Boolean(emptyStateMessage) && !Boolean(searchValue)
                            ? emptyStateMessage
                            : "No Results Found!"}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      />
    </OutsideWrapper>
  );
}
