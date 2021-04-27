export type MicroCmsData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tag: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      tagTitle: string;
      tagType: number;
    }
  ];
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

export type MicroCmsBlog = {
  contents: MicroCmsData[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type MicroCmsTags = {
  contents: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      tagTitle: string;
      tagType: number;
    }
  ];
};
