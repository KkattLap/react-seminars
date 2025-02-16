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

  // Состояние загрузки данных (семинаров)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("http://localhost:3001/seminars");
        setSeminars(resp.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

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
    // Получаем текущую дату и время
    const now = new Date();

    // Получаем дату в нужном формате
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}.${month}.${year}`; // финальная дата в формате дд.мм.гггг

    // Получаем время в нужном формате
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`; // финальное время в формате чч:мм

    const newData = {
      photo: photoUserInput,
      title: titleUserInput,
      description: descriptionUserInput,
      date: formattedDate,
      time: formattedTime,
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
        <div className="App__seminars">
          {seminars.map((seminar) => {
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
          })}
        </div>
      )}
    </div>
  );
}

export default App;
