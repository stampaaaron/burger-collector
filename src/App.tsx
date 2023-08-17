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
            frontComponent={
              <img src={`${import.meta.env.BASE_URL}${item.imageSrc}`} />
            }
            backComponent={
              <>
                <h3>Gutschein für {item.label}!</h3>
                {item.locations && (
                  <div className="locations">
                    Einlösbar in:
                    <ul>
                      {item.locations?.map((location) => (
                        <li>{location}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
