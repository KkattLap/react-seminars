import styles from "./ModalEdit.module.css";
import closeIcon from "../images/close-icon.svg";

export default function ModalEdit({
  show,
  onCloseButtonClick,
  editSeminar,
  photoUserInput,
  titleUserInput,
  descriptionUserInput,
  setPhotoUserInput,
  setTitleUserInput,
  setDescriptionUserInput,
}) {
  // Не показывать окно
  if (!show) {
    return null;
  }
  // Показать окно
  return (
    <div className={styles.modalEditWrapper}>
      <div className={styles.modalEditWrapper__modal}>
        <button
          className={styles.modalEditWrapper__modal__closeButton}
          onClick={onCloseButtonClick}
        >
          <img
            className={styles.modalEditWrapper__modal__closeButton__closeIcon}
            src={closeIcon}
            alt="close"
          ></img>
        </button>
        <div className={styles.modalEditWrapper__modal__content}>
          <div
            className={styles.modalEditWrapper__modal__content__inputWrapper}
          >
            <label
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__label
              }
              htmlFor="photo"
            >
              Введите ссылку на изображение:
            </label>
            <input
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__input
              }
              id="photo"
              value={photoUserInput}
              onChange={(e) => setPhotoUserInput(e.target.value)}
            ></input>
          </div>
          <div
            className={styles.modalEditWrapper__modal__content__inputWrapper}
          >
            <label
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__label
              }
              htmlFor="title"
            >
              Введите заголовок:
            </label>
            <input
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__input
              }
              id="title"
              value={titleUserInput}
              onChange={(e) => setTitleUserInput(e.target.value)}
            ></input>
          </div>
          <div
            className={styles.modalEditWrapper__modal__content__inputWrapper}
          >
            <label
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__label
              }
              htmlFor="description"
            >
              Введите описание:
            </label>
            <textarea
              className={
                styles.modalEditWrapper__modal__content__inputWrapper__input
              }
              id="description"
              value={descriptionUserInput}
              onChange={(e) => setDescriptionUserInput(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={styles.modalEditWrapper__modal__buttons}>
          <button
            className={styles.modalEditWrapper__modal__buttons__cancelButton}
            onClick={onCloseButtonClick}
          >
            Отмена
          </button>
          <button
            className={styles.modalEditWrapper__modal__buttons__saveButton}
            onClick={() => {
              editSeminar();
              onCloseButtonClick();
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
