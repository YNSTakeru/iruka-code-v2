import { updateUserAccess } from "@/lib/actions";
import { Document, DocumentAccess, DocumentUser } from "@/types";
import clsx from "clsx";
import { ComponentProps, useState } from "react";
import styles from "./ShareDialogInvite.module.css";

interface Props extends ComponentProps<"div"> {
  documentId: Document["id"];
  fullAccess: boolean;
  onSetUsers: () => void;
}

export function ShareDialogInviteUser({
  documentId,
  fullAccess,
  onSetUsers,
  className,
  ...props
}: Props) {
  const [isInviteLoading, setInviteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  // Add a user to the room using email as user id
  async function handleAddDocumentUser(id: DocumentUser["id"]) {
    setErrorMessage(undefined);
    setInviteLoading(true);

    const { error } = await updateUserAccess({
      userId: id,
      documentId: documentId,
      access: DocumentAccess.READONLY,
    });

    setInviteLoading(false);

    if (error) {
      setErrorMessage(error?.suggestion);
      return;
    }

    onSetUsers();
  }

  return (
    <div className={clsx(className, styles.section)} {...props}>
      {fullAccess ? (
        <>
          {errorMessage && (
            <div className={clsx(styles.error, styles.inviteFormMessage)}>
              {errorMessage}
            </div>
          )}
        </>
      ) : (
        <div className={styles.error}>
          You need full access to invite others.
        </div>
      )}
    </div>
  );
}
