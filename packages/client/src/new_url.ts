/** Creates a full URL to be used to make API requests.
 *
 * Before creating the final URL, leading slashes are removed from the path
 * and a trailing slash is added to the base.
 */
export function newUrl(
	path: string,
	base: URL,
	query?: Record<string, unknown>,
): URL {
	const url = new URL(
		// The path should not start with a slash
		path.replace(/^\/+/, ""),
		// The base should end with a slash
		base.toString().replace(/([^/]$)/, "$1/"),
	)

	if (query)
		for (const [name, value] of Object.entries(query)) {
			if (value instanceof Date) url.searchParams.set(name, value.toISOString())
			else url.searchParams.set(name, String(value))
		}

	return url
}
