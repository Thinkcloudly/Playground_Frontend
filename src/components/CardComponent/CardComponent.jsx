import Button from "@mui/material/Button";
import './card.css';

export default function CardComponent({
  id,
  image,
  message,
  title,
  buttonLabel,
  handleConfirm,
}) {
  return (
    <div className="card">
      <div className="imgContainer">

      <img src={image} alt="media" />
      </div>
      <div className="cardContent">

      <div className="heading">{title}</div>
      <p>{message}</p>
      <div>

      <Button variant="outlined" onClick={() => handleConfirm(id)}>{buttonLabel}</Button>
      </div>
      </div>
    </div>
  );
}
