import { redirect } from "react-router";

export default function adminLoader() {
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  if (currentUser && token) {
    if (isAdmin !== "true") {
      return redirect("/dashboard");
    }
  }
  return null;
}
