export type responseBusinessWithMeta = {
  data: businessType[];
  error: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    prevPage: null;
    nextPage: number | null;
  };
};
export type responseInvestorWithMeta = {
  data: investorType[];
  error: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    prevPage: null;
    nextPage: number | null;
  };
};

export type responseAdminWithMeta = {
  data: adminsType[];
  error: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    prevPage: null;
    nextPage: number | null;
  };
};

export type responseNewsletterWithMeta = {
  data: newsletterType[];
  error: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    prevPage: null;
    nextPage: number | null;
  };
};

export type businessType = {
  businessName: string;
  businessType: string;
  businessWebsite: string;
  country: string;
  createdAt: string;
  email: string;
  firstName: string;
  investmentStage: string;
  jobTitle: string;
  lastName: string;
  phone: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type investorType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  firmName: string;
  investorType: string;
  minimumInvestment: number[];
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type adminsType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type newsletterType = {
  _id: string;
  audience: string;
  title: string;
  signatureImageUrl: string;
  textContent: any;
  htmlContent: any;
  imageUrl: string;
  sent: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
