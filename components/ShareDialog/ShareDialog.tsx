// eslint-disable-next-line import/order
import { UserIcon } from "@/icons";
// eslint-disable-next-line import/order
import {
  getDocument,
  getDocumentGroups,
  getDocumentUsers,
} from "@/lib/actions";
// eslint-disable-next-line import/order
import { useDocumentsFunctionSWR, useInitialDocument } from "@/lib/hooks";
// eslint-disable-next-line import/order
import { getDocumentAccess } from "@/lib/utils";
// eslint-disable-next-line import/order
import { Dialog } from "@/primitives/Dialog";
// eslint-disable-next-line import/order
import { DocumentAccess } from "@/types";
import {
  useBroadcastEvent,
  useEventListener,
} from "@liveblocks/react/suspense";
import * as Tabs from "@radix-ui/react-tabs";
import { useSession } from "next-auth/react";
import { ComponentProps, useCallback, useEffect, useState } from "react";
// eslint-disable-next-line import/order
import styles from "./ShareDialog.module.css";
import { ShareDialogDefault } from "./ShareDialogDefault";
import { ShareDialogInviteUser } from "./ShareDialogInviteUser";
import { ShareDialogUsers } from "./ShareDialogUsers";

type Props = Omit<ComponentProps<typeof Dialog>, "content" | "title">;

export function ShareDialog({ children, ...props }: Props) {
  const { id: documentId, accesses: documentAccesses } = useInitialDocument();

  const { data: session } = useSession();
  const [currentUserAccess, setCurrentUserAccess] = useState(
    DocumentAccess.NONE
  );

  // Get a list of users attached to the document (+ their info)
  const {
    data: users,
    mutate: revalidateUsers,
    // error: usersError,
  } = useDocumentsFunctionSWR([getDocumentUsers, { documentId }], {
    refreshInterval: 0,
  });

  // Get a list of groups attached to the document (+ their info)
  const {
    data: groups,
    mutate: revalidateGroups,
    // error: groupsError,
  } = useDocumentsFunctionSWR([getDocumentGroups, { documentId }], {
    refreshInterval: 0,
  });

  // Get the current document
  const {
    data: document,
    error: defaultAccessError,
    mutate: revalidateDefaultAccess,
  } = useDocumentsFunctionSWR([getDocument, { documentId }], {
    refreshInterval: 0,
  });

  // Get default access value from document, or the default value from the property
  const defaultAccess = document
    ? document.accesses.default
    : documentAccesses.default;

  // If you have no access to this room, refresh
  if (defaultAccessError && defaultAccessError.code === 403) {
    window.location.reload();
  }

  // Refresh the current user's access level
  const revalidateCurrentUserAccess = useCallback(() => {
    if (!document) {
      return;
    }

    const accessLevel = getDocumentAccess({
      documentAccesses: document.accesses,
      userId: session?.user?.info.id ?? "",
      groupIds: session?.user?.info.groupIds ?? [],
    });

    // Reload if current user has no access (will show error page)
    if (accessLevel === DocumentAccess.NONE) {
      window.location.reload();
      return;
    }

    // Reload app if current user swapping between READONLY and EDIT/FULL (will reconnect to app with new access level)
    const accessChanges = new Set([currentUserAccess, accessLevel]);
    if (
      accessChanges.has(DocumentAccess.READONLY) &&
      (accessChanges.has(DocumentAccess.EDIT) ||
        accessChanges.has(DocumentAccess.FULL))
    ) {
      window.location.reload();
      return;
    }

    setCurrentUserAccess(accessLevel);
  }, [document, session, currentUserAccess]);

  useEffect(() => {
    revalidateCurrentUserAccess();
  }, [document, revalidateCurrentUserAccess, session]);

  // Revalidate all access data
  function revalidateAll() {
    revalidateUsers();
    revalidateGroups();
    revalidateDefaultAccess();
    revalidateCurrentUserAccess();
  }

  // Broadcasts are used for sending share dialog updates below
  const broadcast = useBroadcastEvent();

  // If a share dialog update has been received, refresh data
  useEventListener(({ event }) => {
    if (event.type === "SHARE_DIALOG_UPDATE") {
      revalidateAll();
    }
  });

  return (
    <Dialog
      content={
        <div className={styles.dialog}>
          <Tabs.Root className={styles.dialogTabs} defaultValue="users">
            <Tabs.List className={styles.dialogTabList}>
              <Tabs.Trigger className={styles.dialogTab} value="users">
                <span className={styles.dialogTabLabel}>
                  <UserIcon className={styles.dialogTabIcon} />
                  <span>ユーザー情報</span>
                </span>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="users" className={styles.dialogTabContent}>
              <ShareDialogInviteUser
                className={styles.dialogSection}
                documentId={documentId}
                fullAccess={currentUserAccess === DocumentAccess.FULL}
                onSetUsers={() => {
                  revalidateAll();
                  broadcast({ type: "SHARE_DIALOG_UPDATE" });
                }}
              />
              {users?.length ? (
                <ShareDialogUsers
                  className={styles.dialogSection}
                  documentId={documentId}
                  documentOwner={document?.owner || ""}
                  fullAccess={currentUserAccess === DocumentAccess.FULL}
                  onSetUsers={() => {
                    revalidateAll();
                    broadcast({ type: "SHARE_DIALOG_UPDATE" });
                  }}
                  users={users}
                />
              ) : null}
            </Tabs.Content>
          </Tabs.Root>
          <ShareDialogDefault
            className={styles.dialogSection}
            defaultAccess={defaultAccess}
            documentId={documentId}
            fullAccess={currentUserAccess === DocumentAccess.FULL}
            onSetDefaultAccess={() => {
              revalidateAll();
              broadcast({ type: "SHARE_DIALOG_UPDATE" });
            }}
          />
        </div>
      }
      title="コードを共有"
      {...props}
    >
      {children}
    </Dialog>
  );
}
