import { PATHS } from "@app/_constants/path";
import { redirect } from "next/navigation";

export default function page() {
  redirect(PATHS.PersonManagement());
}
