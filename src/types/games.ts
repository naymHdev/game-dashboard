export type TGameSubmission = {
  userId: string | null;
  gameId: string;
  title: string;
  description: string;
  image: string[];
  categories: string[];
  platform: ("Android" | "Apple" | "Windows" | "Linux" | "Mac")[];
  price: number;
  socialLinks: string[];
  gameStatus: "active" | "upcoming";
  upcomingDate: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
