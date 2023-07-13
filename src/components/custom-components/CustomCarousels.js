import "./customComponents.css";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
export const CustomCarousels = ({ items }) => {
  return (
    <Carousel className="carousel" indicators={false}>
      {items.map((item, i) => (
        <Carousel.Item key={i}>
          <img className="carousel_img" src={item.img} alt="First slide" />
          <Carousel.Caption className="carousel_caption">
            <h3 className="carousel_name">{item.name}</h3>
            <p className="carousel_description">{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
