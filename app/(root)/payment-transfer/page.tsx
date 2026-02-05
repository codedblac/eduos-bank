import React from "react";
import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Please sign in to make a payment transfer."
        />
      </section>
    );
  }

  const accountsResponse = await getAccounts({
    userId: loggedIn.$id,
  });

  const accounts = accountsResponse?.data ?? [];

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Provide the required details to complete your payment transfer."
      />

      <section className="size-full pt-5">
        {accounts.length === 0 ? (
          <p className="text-gray-500">
            You need at least one bank account to make a transfer.
          </p>
        ) : (
          <PaymentTransferForm accounts={accounts} />
        )}
      </section>
    </section>
  );
};

export default Transfer;
