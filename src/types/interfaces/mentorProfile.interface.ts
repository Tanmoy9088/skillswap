export interface MentorProfilePageProps {
  params: Promise<{
    authUserId: string;
  }>;
}

export interface MentorProfileData {
  profile?: {
    name?: string | null;
    bio?: string | null;
    profile_img?: string | null;
  };

  skills?: Array<{
    skill_name?: string | null;
  }>;
}
