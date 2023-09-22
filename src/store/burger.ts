import { create } from "zustand";
import { persist } from "zustand/middleware";

function getAmountOfItemsFromState(amount: number, state: string) {
  const items: BurgerState["burgers"] = {};
  for (let i = 0; i < amount; i++) {
    items[`${state}-${i}`] = {
      imageSrc: "cheese-burger.jpeg",
      flag: `flags/${state}.svg`,
      label: "einen Cheese-Burger",
      checked: false,
    };
  }
  return items;
}

const initialBurgerState: BurgerState["burgers"] = {
  ...getAmountOfItemsFromState(3, "ca"),
  ...getAmountOfItemsFromState(3, "us"),
  ...getAmountOfItemsFromState(3, "vn"),
  ...getAmountOfItemsFromState(5, "kh"),
  ...getAmountOfItemsFromState(5, "th"),
  ...getAmountOfItemsFromState(3, "qa"),
  ...getAmountOfItemsFromState(5, "na"),
  "hard-rock-cafe": {
    imageSrc: "hard-rock-cafe.png",
    label: "ein Essen im HardRock Cafe",
    locations: [
      "Kanada (Niagara Falls)",
      "Hawai (Honolulu)",
      "Kambodscha (Angkor oder Phnom Penh)",
      "Thailand (Bangkok)",
    ],
    large: true,
    checked: false,
  },
};

export type BurgerItem = {
  imageSrc?: string;
  label: string;
  flag?: string;
  locations?: string[];
  large?: boolean;
  checked: boolean;
};

interface BurgerState {
  burgers: Record<string, BurgerItem>;
  checkBurger: (key: string) => void;
}

export const useBurgerStore = create<BurgerState>()(
  persist(
    (set) => ({
      burgers: initialBurgerState,
      checkBurger: (key) =>
        set((state) => {
          const items = state.burgers;
          items[key] = { ...items[key], checked: true };
          return { burgers: items };
        }),
    }),
    {
      name: "burger-storage",
    }
  )
);
