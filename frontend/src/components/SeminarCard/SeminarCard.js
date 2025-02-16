import styles from "./SeminarCard.module.css";
import deleteIcon from "./images/delete-icon.svg";
import editIcon from "./images/edit-icon.svg";

export default function SeminarCard({
  sCardImg,
  sCardHeader,
  sCardDescription,
  sCardDate,
  sCardTime,
  editCard,
  deleteCard,
}) {
  return (
    <article className={styles.seminarCard}>
      <div className={styles.seminarCard__buttonsContainer}>
        <button
          className={styles.seminarCard__buttonsContainer__editButton}
          onClick={editCard}
        >
          <img
            className={
              styles.seminarCard__buttonsContainer__editButton__editIcon
            }
            src={editIcon}
            alt="edit"
          ></img>
        </button>
        <button
          className={styles.seminarCard__buttonsContainer__deleteButton}
          onClick={deleteCard}
        >
          <img
            className={
              styles.seminarCard__buttonsContainer__deleteButton__deleteIcon
            }
            src={deleteIcon}
            alt="delete"
          ></img>
        </button>
      </div>
      <div className={styles.seminarCard__photoContainer}>
        <img
          className={styles.seminarCard__photoContainer__photo}
          src={sCardImg}
          alt={sCardDescription}
        ></img>
      </div>
      <div>
        <h2 className={styles.seminarCard__title}>{sCardHeader}</h2>
        <p className={styles.seminarCard__description}>{sCardDescription}</p>
        <time
          className={styles.seminarCard__time}
          dateTime={sCardDate + "T" + sCardTime}
        >
          {sCardDate} {sCardTime}
        </time>
      </div>
    </article>
  );
}
