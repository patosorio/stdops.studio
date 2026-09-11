function errorDigest(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("digest" in error)) return undefined;
  const digest = error.digest;
  return typeof digest === "string" ? digest : undefined;
}

export function onRequestError(
  error: unknown,
  request: Readonly<{
    path: string;
    method: string;
    headers: NodeJS.Dict<string | string[]>;
  }>,
  context: Readonly<{
    routerKind: string;
    routePath: string;
    routeType: string;
  }>,
): void {
  console.error(
    JSON.stringify({
      msg: "request_error",
      digest: errorDigest(error),
      path: request.path,
      method: request.method,
      route: context.routePath,
      type: context.routeType,
    }),
  );
}
