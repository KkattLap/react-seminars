import "./App.css";
import SeminarCard from "./components/SeminarCard/SeminarCard";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [seminars, setSeminars] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/seminars")
      .then((resp) => setSeminars(resp.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="App">
      {error ? (
        <p>{error}</p>
      ) : (
        seminars.map((seminar) => {
          return (
            <SeminarCard
              key={seminar.id}
              sCardImg={seminar.photo}
              sCardHeader={seminar.title}
              sCardDescription={seminar.description}
              sCardDate={seminar.date}
              sCardTime={seminar.time}
            ></SeminarCard>
          );
        })
      )}
    </div>
  );
}

export default App;
