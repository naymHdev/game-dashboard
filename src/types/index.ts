export type TInstrumentsData = {
  name: string;
  image: string;
};

export type FieldType = {
  data: {
    email?: string;
    password?: string;
    remember?: string;
  };
};

export interface IUser {
  id?: string;
  _id?: string | undefined;
  name?: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
  links?: string[];
  photo?: string;
  approvedUpdate: boolean;
  uploadedGame?: string[];
  isDeleted?: boolean;
  status?: "pending" | "approved";
}
