import "./App.css";
import SeminarCard from "./components/SeminarCard/SeminarCard";
import axios from "axios";
import { useEffect, useState } from "react";
import seminarDefaultPhoto from "./images/seminar.jpg";
import useModal from "./components/SeminarCard/useModal";
import ModalDelete from "./components/SeminarCard/ModalDelete/ModalDelete";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [error, setError] = useState("");
  const [isShowingModalDelete, toggleModalDelete] = useModal();

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
  function editCard(cardId) {
    console.log("edit ", cardId);
  }
  // function deleteCard(cardId) {
  //   console.log("delete ", cardId);
  // }
  return (
    <div className="App">
      <ModalDelete
        show={isShowingModalDelete}
        onCloseButtonClick={toggleModalDelete}
      />
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
              editCard={() => editCard(seminar.id)}
              deleteCard={toggleModalDelete}
            ></SeminarCard>
          );
        })
      )}
    </div>
  );
}

export default App;
