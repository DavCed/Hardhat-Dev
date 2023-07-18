import { createHelia } from "helia";
import { json } from "@helia/json";
import student from "../student.json" assert { type: "json" };

const heliaNode = await createHelia();
const jsonObj = json(heliaNode);

const cid = await jsonObj.add(student);

console.log(cid.toString());
console.log(await jsonObj.get(cid));

heliaNode.stop();
