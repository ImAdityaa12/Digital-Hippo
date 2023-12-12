"use client";

import { Product_Catagories } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeItem, setActiveItem] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const isAnyOpen = activeItem !== null;
  useOnClickOutside(navRef, () => setActiveItem(null));
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    document.addEventListener("keydown", (e: KeyboardEvent) => handler(e));
    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => handler(e));
    };
  }, []);
  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {Product_Catagories.map((category, i) => {
        const handleOpen = () => {
          if (activeItem === i) {
            setActiveItem(null);
          } else {
            setActiveItem(i);
          }
        };
        const isOpen = i === activeItem;
        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
