import ReactFlipCard from "reactjs-flip-card";
import "./App.css";
import { useBurgerStore } from "./store/burger";

export function App() {
  const { burgers, checkBurger } = useBurgerStore();

  const hasCheckItem = burgers.some((item) => item.checked);

  return (
    <>
      <h1>{hasCheckItem ? "Deine Gutscheine" : "Happy birthday Tom!"}</h1>

      <p>
        {hasCheckItem
          ? "Die List mit deinen übrigen Gutscheinen:"
          : "Zu deinem 27. Geburtstag stehen dir 27 Gutscheine für einen Cheeseburger zu. Diese Gutscheine kannst du frei irgendwo auf unserer Weltreise einlösen. Ganz am Ende dieser App findest du auch noch einen ganz besondern Gutschein..."}
      </p>
      <div className="burger-container">
        {burgers.map((item) => (
          <div style={item.large ? { gridColumn: "1/3" } : {}}>
            <ReactFlipCard
              containerStyle={item.large ? { columnSpan: "all" } : undefined}
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
          </div>
        ))}
      </div>
    </>
  );
}
