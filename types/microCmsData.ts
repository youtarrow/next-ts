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
  totalCount: number;
  offset: number;
  limit: number;
};

export type UserData = {
  contents: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
      occupation: string;
      introduction: any;
      career: any;
      image: {
        url: string;
        height: number;
        width: number;
      };
      twitter: string;
      git: string;
    }
  ];
  totalCount: number;
  offset: number;
  limit: number;
};

export type infoData = {
  contents: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      siteName: string;
      subTitle: string;
      description: string;
      favicon: {
        url: string;
        height: number;
        width: number;
      };
    }
  ];
  totalCount: number;
  offset: number;
  limit: number;
};

export type PortfolioData = {
  contents: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      siteName: string;
      date: string;
      framework: [
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
      comment: any;
      siteImage: {
        url: string;
        height: number;
        width: number;
      };
      siteUrl: string;
      git: string;
    }
  ];
  totalCount: number;
  offset: number;
  limit: number;
};
