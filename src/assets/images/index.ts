import { StaticImageData } from "next/image";
import fallBack from "./fallBack.avif";

type Images = {
  [key: string]: StaticImageData;
};

const images: Images = {
  fallBack,
};

export default images;
