export default async function fetcher(
  input: RequestInfo | URL,
  init: RequestInit | undefined
) {
  const res = await fetch(input, init)

  return res.json()
}
