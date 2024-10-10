// eslint-disable-next-line import/order
import { Document } from "@/types";
// eslint-disable-next-line import/order
import clsx from "clsx";
// eslint-disable-next-line import/order
import { ComponentProps, useState } from "react";
import styles from "./ShareDialogInvite.module.css";

interface Props extends ComponentProps<"div"> {
  documentId: Document["id"];
  fullAccess: boolean;
  onSetUsers: () => void;
}

export function ShareDialogInviteUser({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  documentId,
  fullAccess,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetUsers,
  className,
  ...props
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>();

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
