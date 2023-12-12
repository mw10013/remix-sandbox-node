import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// @ts-expect-error ts(7016)
import * as base32 from "thirty-two";
import { Buffer } from "node:buffer";
import { generateTOTP } from "@epic-web/totp";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Sandbox Node" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  const buf = Buffer.from("hello world", "utf8");
  const totp = generateTOTP({});
  return {
    encode: base32.encode("node").toString(),
    decode: base32.decode("NZXWIZI=").toString(),
    buf: buf.toString(),
    buf64: buf.toString("base64"),
    totp,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix Sandbox Node</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
