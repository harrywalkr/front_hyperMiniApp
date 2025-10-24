import { router } from "react-query-kit";
import { useGetPositionsList } from "./getPositionsList";

export const positionsModels = router("positions", {
  getOpenPositions: router.query(useGetPositionsList),
});
