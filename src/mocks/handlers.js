import { http, HttpResponse, delay } from "msw";
import user from "./dummy_users.json";
const url = import.meta.env.VITE_APP_API_URL;

export const handlers = [
  http.post(`${url}/login`, async ({ request }) => {
    const reqBody = await request.json();
    const res = user.find((x) => {
      return (
        (x.userCode === reqBody.userCode && x.password === reqBody.password) ||
        x.token === reqBody.token
      );
    });
    await delay(2000);
    if (!!res) {
      const { password, ...rest } = res;
      return HttpResponse.json(rest);
    }
    return HttpResponse.json("user code or password is incorrect", {
      status: 400,
    });
  }),

  http.get(`${url}/status`, async ({ request }) => {
    const isOk = true;
    if (isOk) {
      return HttpResponse.json();
    }
    return HttpResponse.json({}, { status: 503 });
  }),
];
