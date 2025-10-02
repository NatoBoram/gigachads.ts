import { envUuid, loadEnv } from "@natoboram/load_env"
import type { UUID } from "crypto"
import { resolve } from "path"
import { cwd } from "process"

const workspace = cwd() === resolve(import.meta.dirname, "..", "..", "..")
const path = workspace ? resolve(import.meta.dirname, "..") : undefined

await loadEnv({ path })

export const TOKEN: UUID = envUuid("TOKEN")
