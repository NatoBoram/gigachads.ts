import { envUuid, loadEnv } from "@natoboram/load_env"
import type { UUID } from "crypto"

await loadEnv()

export const TOKEN: UUID = envUuid("TOKEN")
