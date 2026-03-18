import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
  return (
    <div className="flex min-h-[90vh] w-full flex-col items-center justify-center gap-6 bg-background px-4 py-12">
      <AccountSettingsCards
        className="max-w-xl"
        classNames={{
          card: {
            base: "border border-border bg-card text-card-foreground shadow-md ring-0",
            footer: "border-t border-border bg-muted",
          },
        }}
      />
      <div className="w-full">
        <ChangePasswordCard
          classNames={{
            base: "mx-auto max-w-xl border border-border bg-card text-card-foreground shadow-md ring-0",
            footer: "border-t border-border bg-muted",
          }}
        />
      </div>
      <div className="w-full">
        <DeleteAccountCard
          classNames={{
            base: "mx-auto max-w-xl border border-border bg-card text-card-foreground shadow-md ring-0",
          }}
        />
      </div>
    </div>
  );
}
