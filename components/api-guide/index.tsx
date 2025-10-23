"use client";
import { Back } from "@/common";
import { Step, Steps } from "@/common/steps";
import { Button } from "@heroui/react";
import { CircleAlert, CircleCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const ApiGuide: React.FC = () => {
  return (
    <div>
      <Back title="API Credentials Guide" />

      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex items-start gap-2 bg-[#EFF6FF] border-2 border-[#BEDBFF] p-4 rounded-lg">
          <ShieldAlert
            className="text-[#1C398E] min-w-5 min-h-5 mt-1"
            size={20}
          />

          <p className="leading-relaxed text-[#1C398E]">
            <strong>Important:</strong> Only create API keys with{" "}
            <strong>read-only</strong> permissions. Never grant withdrawal or
            trading permissions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Step-by-Step Instructions:</h3>

          <Steps className="mt-5">
            <Step>
              <p className="leading-relaxed">
                Visit the HyperLiquid website and log in to your account
              </p>
              <a className="text-blue-700 block my-2">app.hyperliquid.xyz</a>
              <p className="leading-relaxed">
                Navigate to your Account Settings or API Management section
              </p>
            </Step>

            <Step>
              <p className="leading-relaxed">
                Click on "Create New API Key" or "Generate API Credentials"
              </p>
            </Step>

            <Step>
              <>
                <p className="leading-relaxed">
                  Configure your API key with the following permissions:
                </p>

                <div className="bg-content2 p-3 flex flex-col w-full gap-y-3 rounded-lg border-2 border-divider mt-3">
                  <div className="flex items-center gap-2">
                    <CircleCheck
                      className="text-success mt-0.5"
                      size={19}
                      strokeWidth={1.6}
                    />

                    <p className="text-foreground text-normal">
                      Read Account Data
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <CircleCheck
                      className="text-success mt-0.5"
                      size={19}
                      strokeWidth={1.6}
                    />

                    <p className="text-foreground text-normal">
                      View Positions
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <CircleCheck
                      className="text-success mt-0.5"
                      size={19}
                      strokeWidth={1.6}
                    />

                    <p className="text-foreground text-normal">
                      View Trade History
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <CircleAlert
                      className="text-danger mt-0.5"
                      size={19}
                      strokeWidth={1.6}
                    />

                    <div>
                      <p className="text-danger text-normal font-semibold">
                        DO NOT
                      </p>

                      <p className="text-danger text-normal">
                        enable: Trading, Withdrawals, Transfers
                      </p>
                    </div>
                  </div>
                </div>
              </>
            </Step>

            <Step>
              <p className="leading-relaxed">
                Copy both the API Key and API Secret immediately. The secret is
                only shown once!
              </p>
            </Step>

            <Step>
              <p className="leading-relaxed">
                Store your credentials securely. Never share them with anyone.
              </p>
            </Step>

            <Step>
              <p className="leading-relaxed">
                Return to this app and enter your API credentials on the login
                screen
              </p>
            </Step>
          </Steps>
        </div>

        <div>
          <div className=" bg-[#FFFBEB] border-2 border-[#FEE685] p-4 rounded-lg">
            <h3 className="text-base font-medium">Security Best Practices</h3>

            <div className="space-y-2 mt-2">
              <p className="flex items-center">
                <span className="size-1 bg-[#E17100] rounded-full mr-2"></span>
                Use read-only API keys only
              </p>
              <p className="flex items-center">
                <span className="size-1 bg-[#E17100] rounded-full mr-2"></span>
                Enable IP whitelisting if available
              </p>
              <p className="flex items-center">
                <span className="size-1 bg-[#E17100] rounded-full mr-2"></span>
                Regularly rotate your API keys
              </p>
              <p className="flex items-center">
                <span className="size-1 bg-[#E17100] rounded-full mr-2"></span>
                Never share your API secret
              </p>
              <p className="flex items-center">
                <span className="size-1 bg-[#E17100] rounded-full mr-2"></span>
                Revoke unused API keys immediately
              </p>
            </div>
          </div>
        </div>

        <Link href="/login">
          <Button fullWidth radius="full" color="primary">
            Got it, back to login
          </Button>
        </Link>
      </div>
    </div>
  );
};
