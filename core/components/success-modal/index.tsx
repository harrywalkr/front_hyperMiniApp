"use client";
import { useCallback } from "react";
import { AnimatedCheckmark } from "../icons/animatedSuccess";
import type { SuccessModalCmProps } from "./types";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";

export const SuccessModal: React.FC<SuccessModalCmProps> = ({
  title,
  isOpen,
  onCloseAction,
  text,
  onCloseRedirectUrl,
  buttonTitle = "متوجه شدم",
}) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    onCloseAction();

    if (onCloseRedirectUrl) {
      router.push(onCloseRedirectUrl);
    }
  }, [onCloseRedirectUrl, onCloseAction]);

  return (
    <Modal isOpen={isOpen} hideCloseButton>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col items-center justify-center py-4 gap-y-4">
            <AnimatedCheckmark size={120} />

            <div>
              <h3 className="text-center text-base font-semibold text-foreground-600">
                {title}
              </h3>
              <p className="mt-1 text-center text-foreground-600 text-sm">
                {text}
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button variant="bordered" onPress={handleClose}>
            {buttonTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
