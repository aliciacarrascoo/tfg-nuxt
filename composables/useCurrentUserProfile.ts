export const useCurrentUserProfile = async () => {
  const user = await useSupabaseUser();
  const client = useSupabaseClient();
  const { data: currentUserProfile } = await useAsyncData(
    "currentProfile",
    async () => {
      if (!user.value) return null;
      const { data } = await client
        .from("profiles")
        .select("*")
        .eq("id", user.value.id);
      return data![0];
    },
  );
  return currentUserProfile;
};
