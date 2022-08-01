// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookie = req.headers.cookie;
  let count = 0;
  if (cookie) {
    const val = /Count=(\d+)/.exec(cookie as string);
    if (val?.[1]) {
      count = parseInt(val[1]);
    }
  }
  res.setHeader("Set-Cookie", `Count=${count + 1}`);
  switch (count) {
    case 0: {
      res.status(502).end(); // bad gateway
      return;
    }
    case 1: {
      res.status(503).end(); // service unavailable
      return;
    }
  }
  res.status(200).json({ name: "John Doe" });
}
