import { router } from "react-query-kit";
import { useAboutMe } from "./aboutMe";
import { useGetPreferences } from "./preferences";

export const userModels = router("user", {
  aboutMe: router.query(useAboutMe),
  preferences: router.query(useGetPreferences),
});
