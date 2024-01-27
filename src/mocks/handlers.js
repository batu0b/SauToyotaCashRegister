import { http, HttpResponse, delay } from "msw";
import user from "./data/dummy_users.json";
import charts from "./data/dummy_charts.json";

const url = import.meta.env.VITE_APP_API_URL;
let serverStatus = true;

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
    if (serverStatus) {
      return HttpResponse.json();
    }
    return HttpResponse.json({}, { status: 503 });
  }),

  http.post(`${url}/status/set`, async ({ request }) => {
    const req = await request.json();
    serverStatus = req.set;
    return HttpResponse.json(serverStatus);
  }),

  http.get(`${url}/charts/:userCode`, async ({ params }) => {
    const userCharts = charts.find(
      (x) => x.userCode === parseInt(params.userCode)
    );
    await delay(1200);
    if (!!userCharts) {
      const { userCode, ...res } = userCharts;
      return HttpResponse.json(res);
    }
    return HttpResponse.json({}, { status: 404 });
  }),
];
