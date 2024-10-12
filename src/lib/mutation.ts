import { fetcher } from "./fetcher";

export type AuthBodyI = { email: string; password: string };

export function Auth(mode: "signin" | "signup", body: AuthBodyI) {
  return fetcher<AuthBodyI>(`/${mode}`, body);
}
