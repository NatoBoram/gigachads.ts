import { envString, loadEnv } from "@natoboram/load_env"

loadEnv()

export const TOKEN: string = envString("TOKEN")
