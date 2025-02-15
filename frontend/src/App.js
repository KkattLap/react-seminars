import "./App.css";
import SeminarCard from "./components/SeminarCard/SeminarCard";
import axios from "axios";
import { useEffect, useState } from "react";
import seminarDefaultPhoto from "./images/seminar.jpg";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/seminars")
      .then((resp) => setSeminars(resp.data))
      .catch((err) => setError(err));
  }, []);

  // Проверка URL для seminar.photo: url рабочий - возврат true, иначе false
  function checkPhotoURL(photoURL) {
    axios
      .get(photoURL)
      .then((resp) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  return (
    <div className="App">
      {error ? (
        <p>{error}</p>
      ) : (
        seminars.map((seminar) => {
          return (
            <SeminarCard
              key={seminar.id}
              sCardImg={
                checkPhotoURL(seminar.photo)
                  ? seminar.photo
                  : seminarDefaultPhoto
              }
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
