import React from "react";
import Card from "react-bootstrap/Card";
export const CustomCard = ({ name, img, description, parent }) => {
  return (
    <Card className=" card bg-dark text-white">
      <Card.Img className={parent + "_card__img"} src={img} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className={parent + "_card__title"}>{name}</Card.Title>
        <Card.Text className={parent + "_card__description"}>
          {description}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};
