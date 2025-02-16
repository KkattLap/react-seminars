import "./App.css";
import SeminarCard from "./components/SeminarCard/SeminarCard";
import axios from "axios";
import { useEffect, useState } from "react";
import seminarDefaultPhoto from "./images/seminar.jpg";
import useModal from "./components/SeminarCard/useModal";
import ModalDelete from "./components/SeminarCard/ModalDelete/ModalDelete";
import ModalEdit from "./components/SeminarCard/ModalEdit/ModalEdit";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [error, setError] = useState("");
  const [isShowingModalDelete, toggleModalDelete] = useModal();
  const [isShowingModalEdit, toggleModalEdit] = useModal();
  const [seminarDeleteId, setSeminarDeleteId] = useState(null);
  const [seminarEditId, setSeminarEditId] = useState(null);

  // Состояния для полей input в модальном окне (редактирование семинара)
  const [photoUserInput, setPhotoUserInput] = useState("");
  const [titleUserInput, setTitleUserInput] = useState("");
  const [descriptionUserInput, setDescriptionUserInput] = useState("");

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

  function deleteCard(cardId) {
    setSeminarDeleteId(cardId);
  }
  function editCard(cardId) {
    setSeminarEditId(cardId);
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
  function editSeminar() {
    const newData = {
      photo: photoUserInput,
      title: titleUserInput,
      description: descriptionUserInput,
    };
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) =>
        seminar.id === seminarEditId ? { ...seminar, ...newData } : seminar
      )
    );
  }

  return (
    <div className="App">
      <ModalDelete
        show={isShowingModalDelete}
        onCloseButtonClick={toggleModalDelete}
        deleteSeminar={deleteSeminar}
      />
      <ModalEdit
        show={isShowingModalEdit}
        onCloseButtonClick={toggleModalEdit}
        editSeminar={editSeminar}
        photoUserInput={photoUserInput}
        titleUserInput={titleUserInput}
        descriptionUserInput={descriptionUserInput}
        setPhotoUserInput={setPhotoUserInput}
        setTitleUserInput={setTitleUserInput}
        setDescriptionUserInput={setDescriptionUserInput}
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
              editCard={() => {
                editCard(seminar.id);
                toggleModalEdit();
              }}
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
