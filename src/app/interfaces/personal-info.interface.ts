export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };
  workMode: string;
  availability: string;
  experience: string;
  cvFileName: string;
  shortName: string; // First name only
  fullTitle: string; // Extended professional title
}