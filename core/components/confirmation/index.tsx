"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { ConfirmationProps } from "./types";
import { RefObject, useState } from "react";

export const Confirmation: React.FC<ConfirmationProps> = ({
  title = "عملیات غیرقابل برگشت",
  description = "آیا مطمئن هستید که می خواهید این عملیات را انجام دهید؟",
  children,
  onConfirm,
  onCancel,
  ref,
}) => {
  const [showConfirmation, toggleConfirmation] = useState(false);

  return (
    <>
      <div
        ref={ref as RefObject<HTMLDivElement>}
        onClick={(e) => {
          e.stopPropagation();
          toggleConfirmation(true);
        }}
        className="contents"
      >
        {children}
      </div>

      <Modal
        isOpen={showConfirmation}
        onClose={() => toggleConfirmation(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-base font-semibold text-foreground/85">
              {title}
            </h2>
          </ModalHeader>

          <ModalBody>
            <p>{description}</p>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="light"
              onPress={() => {
                onCancel?.();
                toggleConfirmation(false);
              }}
            >
              انصراف
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onConfirm?.();
                toggleConfirmation(false);
              }}
            >
              تایید
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
