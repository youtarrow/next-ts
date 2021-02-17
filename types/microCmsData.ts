import { Tag } from "types/tag";

export interface microCmsData {
  id: string;
  title: string;
  image: { url: string };
  body: string;
  origin: string;
  tags: Tag[];
};