import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);

  return { user };
};
