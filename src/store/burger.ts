import { create } from "zustand";
import { persist } from "zustand/middleware";

function getAmountOfItemsFromState(amount: number, state: string) {
  const items = [];
  for (let i = 0; i < amount; i++) {
    items.push({
      key: i + 1,
      imageSrc: "cheese-burger.jpeg",
      flag: `flags/${state}.svg`,
      label: "einen Cheese-Burger",
      checked: false,
    });
  }
  return items;
}

const initialBurgerState: BurgerItem[] = [
  ...getAmountOfItemsFromState(3, "ca"),
  ...getAmountOfItemsFromState(3, "us"),
  ...getAmountOfItemsFromState(3, "vn"),
  ...getAmountOfItemsFromState(5, "kh"),
  ...getAmountOfItemsFromState(5, "th"),
  ...getAmountOfItemsFromState(3, "qa"),
  ...getAmountOfItemsFromState(5, "na"),
  {
    key: 28,
    imageSrc: "hard-rock-cafe.png",
    label: "ein Essen im HardRock Cafe",
    locations: ["Berlin", "Zürich", "Wil ZH"],
    large: true,
    checked: false,
  },
];

export type BurgerItem = {
  key: number;
  imageSrc?: string;
  label: string;
  flag?: string;
  locations?: string[];
  large?: boolean;
  checked: boolean;
};

interface BurgerState {
  burgers: BurgerItem[];
  checkBurger: (key: number) => void;
}

export const useBurgerStore = create<BurgerState>()(
  persist(
    (set) => ({
      burgers: initialBurgerState,
      checkBurger: (key) =>
        set((state) => {
          const items = state.burgers;
          items[key - 1] = { ...items[key - 1], checked: true };
          return { burgers: items };
        }),
    }),
    {
      name: "burger-storage",
    }
  )
);
