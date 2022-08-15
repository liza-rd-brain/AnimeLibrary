export type DetailAnime = {
  pictureUrl: string;
  description: string;
  otherNames: string;
  status: string;
  studio: string;
  genre: string;
  country: string;
  episode: string;
  duration: string;
  dateRelease: string;
  dateAired: string;
};

export type DetailObj = Omit<DetailAnime, "pictureUrl" | "description">;
