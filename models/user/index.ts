import { router } from "react-query-kit";
import { useAboutMe } from "./aboutMe";

export const userModels = router("user", {
  aboutMe: router.query(useAboutMe),
});
