import { router } from "react-query-kit";
import { useGetAddressList } from "./getAddressList";
import { useAddAddress } from "./addAddress";

export const addressModels = router("addressList", {
  list: router.query(useGetAddressList),
  add: router.mutation(useAddAddress),
});
