import { createClient } from "@/lib/supabase/client";

export const getCurrentProfile = async () => {
const supabase = createClient();

// Get authenticated user
const {
data: { user },
error: userError,
} = await supabase.auth.getUser();

if (userError) {
throw new Error(userError.message);
}

if (!user) {
return null;
}

// Get user's profile including custom role
const { data: profile, error: profileError } = await supabase
.from("profiles")
.select("*")
.eq("auth_user_id", user.id)
.single();

if (profileError) {
throw new Error(profileError.message);
}

return profile;
};
