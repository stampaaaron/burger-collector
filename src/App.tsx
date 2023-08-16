import ReactFlipCard from "reactjs-flip-card";
import "./App.css";
import { useBurgerStore } from "./store/burger";

export function App() {
  const { burgers, checkBurger } = useBurgerStore();

  return (
    <>
      <h1>Gutscheine</h1>
      <p>List aller Gutscheine</p>
      <div className="burger-container">
        {burgers.map((item) => (
          <ReactFlipCard
            flipTrigger="onClick"
            frontComponent={<img src={item.imageSrc} />}
            backComponent={
              <>
                <h3>Gutschein für {item.label}!</h3>
                <label className="burger-item">
                  {item.checked ? "Eingelöst" : "Einlösen"}
                  <input
                    type="checkbox"
                    id={item.key.toString()}
                    checked={item.checked}
                    onChange={() => checkBurger(item.key)}
                  />
                </label>
              </>
            }
          ></ReactFlipCard>
        ))}
      </div>
    </>
  );
}
