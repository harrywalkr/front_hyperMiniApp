"use client";

import { Back } from "@/common";
import { ConnectForm } from "./form";
import { site } from "@/core/config";

export const Connect: React.FC = () => {
  return (
    <div>
      <Back title={`Connect to ${site.name}`} />

      <div>
        <ConnectForm />
      </div>
    </div>
  );
};
