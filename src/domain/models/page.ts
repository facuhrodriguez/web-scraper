export type Page = {
  _id?: string;
  links: Link[];
  userId: string;
  name: string;
};

export type Link = {
  name: string;
  link: string;
};

export type WebScraperRequest = {
  user: { userId: string };
  name: string;
  link: string;
};

export type PageResponse = {
  _id?: string;
  links: Link[];
  userId: string;
  name: string;
  totalLinks: number;
};
