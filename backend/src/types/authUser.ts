export type Role = "admin" | "user"

export interface AuthUser {
  id: number,
  role: Role
}
