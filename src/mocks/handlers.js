import { http, HttpResponse, delay } from "msw";
const url = import.meta.env.VITE_APP_API_URL;

export const handlers = [
  http.post(`${url}/post`, async ({ request }) => {
    const res = await request.json();
    await delay(2000);
    return HttpResponse.json(res);
  }),
];
