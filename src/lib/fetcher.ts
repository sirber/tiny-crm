export const fetcher = <T>(
  ...args: [RequestInfo | URL, RequestInit?]
): Promise<T> =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json() as Promise<T>;
  });
