import { router } from "react-query-kit";
import { useCheckIsUserEligible } from "./checkIsUserEligible";

export const eligibilityModels = router("eligibility", {
  checkIsUserEligible: router.query(useCheckIsUserEligible),
});
