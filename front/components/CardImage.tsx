import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { IImages } from "./PostCard";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface CardImageProps {
  images: IImages[];
}

const CardImage: React.FunctionComponent<CardImageProps> = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={3}>
      {images.map((item) => (
        <ImageListItem key={item.src}>
          <img
            src={`${item.src}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.src}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default CardImage;
