export type TGameTable = {
  key?: string | undefined;
  categories: string[];
  name: string;
  gameStatus: "active" | "upcoming";
  thumbnail: string;
  price: number;
  title: string;
  id?: string;
};
