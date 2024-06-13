import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

export default function Modal({
  title,
  description,
  open,
  setOpen,
  children,
}: {
  title?: string;
  description?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Credenza onOpenChange={setOpen} open={open}>
      <CredenzaContent>
        <CredenzaHeader className="px-5 pt-5">
          <CredenzaTitle>{title ?? "Modal"}</CredenzaTitle>
          <CredenzaDescription>{description}</CredenzaDescription>
        </CredenzaHeader>
        <div className="px-5 pb-5">{children}</div>
      </CredenzaContent>
    </Credenza>
  );
}
