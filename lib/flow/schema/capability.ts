export type Capability =
  | "user"
  | "frontend"
  | "backend"
  | "database"
  | "auth"
  | "ai"
  | "storage"
  | "external_api";

/**
 * Keep this list small in v1.
 * You can allow custom strings later.
 */
