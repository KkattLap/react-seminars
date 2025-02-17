import styles from "./ModalDelete.module.css";
import closeIcon from "../images/close-icon.svg";

export default function ModalDelete({
  show,
  onCloseButtonClick,
  deleteSeminar,
}) {
  // Не показывать окно
  if (!show) {
    return null;
  }
  // Показать окно
  return (
    <div className={styles.modalDeleteWrapper}>
      <div className={styles.modalDeleteWrapper__modal}>
        <button
          className={styles.modalDeleteWrapper__modal__closeButton}
          onClick={onCloseButtonClick}
        >
          <img
            className={styles.modalDeleteWrapper__modal__closeButton__closeIcon}
            src={closeIcon}
            alt="close"
          ></img>
        </button>
        <p className={styles.modalDeleteWrapper__modal__question}>
          Вы уверены, что хотите удалить семинар?
        </p>
        <div className={styles.modalDeleteWrapper__modal__buttons}>
          <button
            className={styles.modalDeleteWrapper__modal__buttons__cancelButton}
            onClick={onCloseButtonClick}
          >
            Отмена
          </button>
          <button
            className={styles.modalDeleteWrapper__modal__buttons__deleteButton}
            onClick={() => {
              deleteSeminar();
              onCloseButtonClick();
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
