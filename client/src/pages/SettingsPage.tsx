import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center py-12 px-4 gap-6 min-h-[90vh]">
      <AccountSettingsCards
        className="max-w-xl"
        classNames={{
          card: {
            base: "bg-black ring ring-indigo-900",
            footer: "bg-zinc-900",
          },
        }}
      />
      <div className="w-full">
        <ChangePasswordCard
          classNames={{
            base: "bg-black ring ring-indigo-900 max-w-xl mx-auto",
            footer: "bg-zinc-900",
          }}
        />
      </div>
      <div className="w-full">
        <DeleteAccountCard
          classNames={{
            base: "bg-black ring ring-red-900 max-w-xl mx-auto",
          }}
        />
      </div>
    </div>
  );
}
