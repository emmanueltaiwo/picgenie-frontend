export const runtime = "edge"; // 'nodejs' is the default

export function GET(request: Request) {
  return new Response(`I am an Edge Function!`, {
    status: 200,
  });
}
