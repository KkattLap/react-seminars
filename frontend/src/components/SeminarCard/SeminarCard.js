import styles from "./SeminarCard.module.css";

export default function SeminarCard({
  sCardImg,
  sCardHeader,
  sCardDescription,
  sCardDate,
  sCardTime,
}) {
  return (
    <article>
      <img src={sCardImg} alt={sCardDescription}></img>
      <div>
        <h2>{sCardHeader}</h2>
        <p>{sCardDescription}</p>
        <time dateTime={sCardDate + "T" + sCardTime}></time>
      </div>
    </article>
  );
}
