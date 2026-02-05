import React from "react";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return (
      <section className="flex">
        <div className="my-banks">
          <HeaderBox
            title="My Bank Accounts"
            subtext="Please sign in to view your bank accounts."
          />
        </div>
      </section>
    );
  }

  const accountsResponse = await getAccounts({
    userId: loggedIn.$id,
  });

  const accounts = accountsResponse?.data ?? [];

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>

          {accounts.length === 0 ? (
            <p className="text-gray-500">
              You don’t have any bank accounts yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {accounts.map((account: Account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={loggedIn.firstName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
