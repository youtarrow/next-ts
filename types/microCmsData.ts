export type microCmsData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tag: string;
  meta: {
    fieldId: string;
    metaTitle: string;
    metaDescription: string;
  };
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