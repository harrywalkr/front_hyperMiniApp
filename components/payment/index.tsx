"use client";

import { Back, Logo } from "@/common";
import { addToast, Alert, Button } from "@heroui/react";
import { useCallback, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

export const Payment: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>("BEP20");

  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyAddress = useCallback(() => {
    copyToClipboard("TEPLkh9svaunDzgSAa67Q9FxnbrLhV8xJa")
      .then(() => {
        addToast({
          title: "Address copied to clipboard",
          description: "You can now paste it anywhere",
          color: "success",
        });
      })
      .catch(() => {
        addToast({
          title: "Failed to copy address",
          description: "Please try again",
          color: "danger",
        });
      });
  }, [copyToClipboard]);

  return (
    <div>
      <Back title="Payment" />
      <Logo direction="horizontal" showDescription />

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex flex-col gap-y-3">
          <p className="text-base font-semibold text-center">
            Choose Wallet Protocol
          </p>

          <div className="flex items-center gap-2">
            <Button
              onPress={() => setSelectedProtocol("BEP20")}
              radius="sm"
              className="text-xs"
              color={selectedProtocol === "BEP20" ? "primary" : "default"}
            >
              USDT (BEP20)
            </Button>

            <Button
              onPress={() => setSelectedProtocol("ERC20")}
              radius="sm"
              className="text-xs"
              color={selectedProtocol === "ERC20" ? "primary" : "default"}
            >
              USDT (ERC20)
            </Button>

            <Button
              onPress={() => setSelectedProtocol("TRC20")}
              radius="sm"
              className="text-xs"
              color={selectedProtocol === "TRC20" ? "primary" : "default"}
            >
              USDT (TRC20)
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Pay with BEP20</h3>
          <p className="leading-relaxed mt-1">
            Users need to transfer assets to the address below, please complete
            the transfer within 30 minutes
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <p className="text-center text-danger font-medium text-lg">19:59</p>

          <p className="text-center">Left to finish the process</p>

          <p className="text-center text-primary font-medium">
            Currently, this merchant only supports the deposit and withdrawal of
            USDT.
          </p>

          <div className="flex flex-col gap-y-1 items-center">
            <p className="text-lg">Payment Amount (BEP20)</p>

            <p className="text-center text-lg font-semibold text-primary">20</p>

            <p className="text-center">≈ 20 USD</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <p className="text-base text-center font-medium">
            Scan the QR code and pay immediately
          </p>

          <QRCodeSVG value="TEPLkh9svaunDzgSAa67Q9FxnbrLhV8xJa" size={200} />

          <p className="text-center text-default-700">
            Get the user payment results every 15s
          </p>

          <p className="text-center font-medium">
            TEPLkh9svaunDzgSAa67Q9FxnbrLhV8xJa
          </p>

          <Button
            variant="light"
            endContent={<Copy size={16} />}
            onPress={handleCopyAddress}
          >
            Copy Address
          </Button>
        </div>

        <Alert
          color="warning"
          title="Security Note:"
          classNames={{
            title: "mb-3 font-semibold text-[#973C00]",
            description: "font-normal",
            base: "border border-warning-400 bg-warning-50/80",
          }}
        >
          <span className="text-[#973C00] leading-relaxed">
            Do not deposit non-BEP20 assets to this address, otherwise the
            assets will not be recovered. Other wise the assets will not be
            recovered!
          </span>
        </Alert>
      </div>
    </div>
  );
};
