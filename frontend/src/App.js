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
  const [seminarDeleteId, setSeminarDeleteId] = useState(null);

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
    // Изменить массив seminars, удалить соотв. элемент
  }
  function editCard(cardId) {
    console.log("edit ", cardId);
  }

  function deleteCard(cardId) {
    console.log(cardId);
    setSeminarDeleteId(cardId);
  }

  function deleteSeminar() {
    axios
      .delete(`http://localhost:3001/seminars/${seminarDeleteId}`)
      .then((response) => {
        console.log(`Deleted seminar with ID ${seminarDeleteId}`);
        // Удалить seminar с соотв. id из seminars
        setSeminars(
          seminars.filter((seminar) => seminar.id !== seminarDeleteId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="App">
      <ModalDelete
        show={isShowingModalDelete}
        onCloseButtonClick={toggleModalDelete}
        deleteSeminar={deleteSeminar}
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
              deleteCard={() => {
                deleteCard(seminar.id);
                toggleModalDelete();
              }}
            ></SeminarCard>
          );
        })
      )}
    </div>
  );
}

export default App;
