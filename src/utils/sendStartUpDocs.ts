import { ApiUrl } from "./api.ts";

export default function sendStartUpDocs(fileName: string, businessId: string) {
  return fetch(`${ApiUrl}/business-startup/doc/${businessId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      document: fileName,
    }),
  });
}
