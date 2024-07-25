import { redirect } from "react-router";

export default function homeLoader() {
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (currentUser && token) {
    return redirect("/dashboard");
  }
  return null;
}
