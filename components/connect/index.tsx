"use client";

import { Back, Logo } from "@/common";
import { ConnectForm } from "./form";
import { site } from "@/core/config";

export const Connect: React.FC = () => {
  return (
    <div>
      <Back title={`Connect to ${site.name}`} />
      <Logo showDescription direction="vertical" />

      <div className="mt-10">
        <ConnectForm />
      </div>
    </div>
  );
};
