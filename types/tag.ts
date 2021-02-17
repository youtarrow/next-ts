export interface Tag {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  tag: string;
  meta: {
    fieldId: string;
    metaTitle: string;
    metaDescription: string;
},
  kv: {
    fieldId: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    kv_alt: string;
  };
};
