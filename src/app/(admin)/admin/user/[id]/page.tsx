"use client";

import {
  Loader2,
  MapPinned,
  ReceiptText,
  Wallet2Icon,
  ArrowUpDownIcon,
  ChevronLeft,
  UserCheck2,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CopyButton from "~/app/_components/CopyButton";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import AccordionDetailsItem from "~/app/_components/accordion-item";
import BanUserDialog from "~/app/_components/admin/ban-user-dialog";
import ChangeRoleDialog from "~/app/_components/admin/user-role-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  cn,
  formatComplyCubeDate,
  formatCurrency,
  formatMoney,
} from "~/lib/utils";
import { api } from "~/trpc/react";

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({
  params: { id },
}: UserDetailsPageProps) {
  const {
    data: userData,
    isLoading,
    refetch: refetchUser,
  } = api.user.getCompleteUserInfo.useQuery({ id });
  const { mutate: getCheckInfo } = api.user.getUserKycInfo.useMutation();

  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (userData) {
    const user = userData.user;
    const document_check = userData.document_check;
    const result = userData.check_result;
    return (
      <>
        <div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
        <MaxWidthWrapper>
          <div className="my-6">
            <div>
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-2xl font-semibold">Customer #{user.id}</h2>
                <CopyButton text={user.id} textTitle="User ID" />
              </div>
              <span className="text-lg font-semibold text-muted-foreground">
                {user.email}
              </span>
            </div>

            <div className="mt-4 flex w-full flex-row gap-4">
              <ChangeRoleDialog
                id={id}
                default_role={user.role}
                refetch={refetchUser}
              />
              <Button
                className="flex-1 gap-2"
                variant={"destructive"}
                onClick={() => getCheckInfo({ id })}
              >
                <UserCheck2 className="h-4 w-4" />
                Require KYC
              </Button>
              <BanUserDialog
                id={id}
                status={user.isBanned}
                refetch={refetchUser}
              />
            </div>

            <div className="mt-4">
              <Accordion type="multiple" defaultValue={["item-1"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <ReceiptText />
                      Customer Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <AccordionDetailsItem
                        title="Full Name"
                        value={user.firstName + " " + user.lastName}
                      />
                      <AccordionDetailsItem title="Phone" value={user.phone} />
                      <AccordionDetailsItem
                        title="Role"
                        value={user.role}
                        isBadge={true}
                      />
                      {user.emailVerified && (
                        <AccordionDetailsItem
                          title="Email Verified"
                          value={new Date(user.emailVerified).toLocaleString()}
                        />
                      )}
                      <AccordionDetailsItem
                        title="Birthday"
                        value={new Date(user.dob!).toLocaleDateString()}
                      />
                      <AccordionDetailsItem
                        title="2FA Enabled"
                        value={user.isTwoFactorEnabled ? "ON" : "OFF"}
                        isBadge={true}
                        className={
                          user.isTwoFactorEnabled
                            ? "bg-green-600"
                            : "bg-red-600"
                        }
                      />
                      <AccordionDetailsItem
                        title="Account Status"
                        value={user.isBanned ? "SUSPENDED" : "ACTIVE"}
                        isBadge={true}
                        className={
                          user.isBanned ? "bg-red-600" : "bg-green-600"
                        }
                      />
                      <AccordionDetailsItem
                        title="Comply Cube ID"
                        value={user.complyClientId}
                        className="bg-gray-600 text-xs"
                        isBadge={true}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <UserCheck />
                      KYC Information
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <AccordionDetailsItem
                        title="Status"
                        value={document_check.status.toUpperCase()}
                        isBadge={true}
                        className={
                          document_check.status === "complete"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }
                      />
                      <AccordionDetailsItem
                        title="Legal Name"
                        value={
                          result.breakdown.extractedData.allExtractedData.visual
                            .entityNameNative
                        }
                      />
                      <AccordionDetailsItem
                        title="Document Type"
                        value={result.breakdown.extractedData.documentDetails.documentType.toUpperCase()}
                        isBadge={true}
                      />
                      <AccordionDetailsItem
                        title="Country of Issue"
                        value={
                          result.breakdown.extractedData.documentDetails
                            .issuingCountry
                        }
                      />
                      <AccordionDetailsItem
                        title="Document number"
                        value={
                          result.breakdown.extractedData.documentDetails
                            .documentNumber
                        }
                      />
                      <AccordionDetailsItem
                        title="Date of Issue"
                        value={formatComplyCubeDate(
                          result.breakdown.extractedData.documentDetails
                            .issuingDate,
                        )}
                      />
                      <AccordionDetailsItem
                        title="Date of Expiry"
                        value={formatComplyCubeDate(
                          result.breakdown.extractedData.documentDetails
                            .expirationDate,
                        )}
                      />
                      <AccordionDetailsItem
                        title="Nationality"
                        value={
                          result.breakdown.extractedData.holderDetails
                            .nationality
                        }
                      />
                      <AccordionDetailsItem
                        title="Birth Place"
                        value={
                          result.breakdown.extractedData.holderDetails
                            .birthPlace
                        }
                      />
                      <AccordionDetailsItem
                        title="Age"
                        value={
                          result.breakdown.extractedData.holderDetails.age +
                          " years"
                        }
                      />
                      <AccordionDetailsItem
                        title="Date of Birth"
                        value={formatComplyCubeDate(
                          result.breakdown.extractedData.holderDetails.dob,
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {user.address && (
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex flex-row gap-2">
                        <MapPinned />
                        Address
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <AccordionDetailsItem
                          title="Address 1"
                          value={user.address.addressLine1}
                        />
                        <AccordionDetailsItem
                          title="City"
                          value={user.address.city}
                        />
                        <AccordionDetailsItem
                          title="State"
                          value={user.address.state}
                        />
                        <AccordionDetailsItem
                          title="Country"
                          value={user.address.country}
                        />
                        <AccordionDetailsItem
                          title="Postal"
                          value={user.address.postal}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <Wallet2Icon />
                      Wallets
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex w-full flex-col gap-2">
                      {user.wallets.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-row justify-between rounded-lg border px-4 py-2 shadow-md"
                        >
                          <div className="flex flex-row gap-3">
                            <Badge variant={"secondary"} className="rounded-sm">
                              {item.id}
                            </Badge>
                            <span>{item.currency}</span>
                          </div>
                          <div>
                            {formatCurrency(
                              item.currency,
                              formatMoney(item.amount),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-2">
                      <ArrowUpDownIcon />
                      Transactions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex w-full flex-col gap-2">
                      {user.transactions.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-row justify-between rounded-lg border px-4 py-2"
                        >
                          <div className="flex flex-row gap-3">
                            <Badge variant={"secondary"} className="rounded-sm">
                              {item.id}
                            </Badge>
                            <span>{item.currency}</span>
                          </div>
                          <div className="flex flex-row gap-4">
                            <Badge
                              className={cn(
                                "rounded-sm",
                                item.type === "pay-in"
                                  ? "bg-green-700"
                                  : "bg-red-700",
                              )}
                            >
                              {item.type.toUpperCase()}
                            </Badge>
                            <Badge
                              className={cn(
                                "rounded-sm",
                                item.status === "SUCCESS"
                                  ? "bg-green-700"
                                  : "bg-yellow-700",
                              )}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div>
                            {formatCurrency(
                              item.currency,
                              formatMoney(item.amount),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </MaxWidthWrapper>
      </>
    );
  }
}
