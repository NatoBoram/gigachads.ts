const token = process.env["TOKEN"]
if (!token) throw new Error("$TOKEN is missing")
export const TOKEN: string = token
