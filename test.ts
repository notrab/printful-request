import { PrintfulClient } from "./src";

const client = new PrintfulClient("test");

client
  .get<{ data: { id: string; name: string }[] }>("/products")
  .then((res) => res.data.map((p) => p.id));

client.post<{ name: string; price: number }, { name: string }>("test", {
  name: "hi",
  price: 3,
});
