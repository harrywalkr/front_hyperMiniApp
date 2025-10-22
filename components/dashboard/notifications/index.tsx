"use client";

import { Back } from "@/common";
import { Button } from "@heroui/react";
import { CircleCheckBig } from "lucide-react";

export const DashboardNotifications: React.FC = () => {
  return (
    <div>
      <Back title="Notifications" />

      <div className="flex flex-col gap-y-4">
        <div className="flex justify-end">
          <Button variant="light" color="danger" className="font-medium">
            Clear All
          </Button>
        </div>

        <div className="bg-primary/15 w-full rounded-full px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig strokeWidth={2} size={18} />
            <p>something happened!</p>
          </div>

          <p>10/07/2025</p>
        </div>

        <div className="bg-primary/15 w-full rounded-full px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig strokeWidth={2} size={18} />
            <p>something happened!</p>
          </div>

          <p>10/07/2025</p>
        </div>

        <div className="bg-primary/15 w-full rounded-full px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig strokeWidth={2} size={18} />
            <p>something happened!</p>
          </div>

          <p>10/07/2025</p>
        </div>

        <div className="bg-primary/15 w-full rounded-full px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig strokeWidth={2} size={18} />
            <p>something happened!</p>
          </div>

          <p>10/07/2025</p>
        </div>

        <div className="bg-primary/15 w-full rounded-full px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig strokeWidth={2} size={18} />
            <p>something happened!</p>
          </div>

          <p>10/07/2025</p>
        </div>
      </div>
    </div>
  );
};
