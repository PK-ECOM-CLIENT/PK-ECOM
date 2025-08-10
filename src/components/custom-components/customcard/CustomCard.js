import "./customCard.css";

export const CustomCard = ({ name, img, description }) => {
  return (
    <article className="c-card" role="group" aria-label={name}>
      <div className="c-card__media">
        <img src={img} alt={name} loading="lazy" />
        <span className="c-card__tag">{name}</span>
        {description && <span className="c-card__badge">{description}</span>}
        <div className="c-card__scrim" />
      </div>

      <div className="c-card__body">
        <h4 className="c-card__title">{name}</h4>
        <p className="c-card__desc">{description}</p>
      </div>
    </article>
  );
};
