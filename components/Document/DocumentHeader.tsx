import { InboxPopover } from "@/components/Inbox";
import { ShareIcon } from "@/icons";
import { renameDocument } from "@/lib/actions";
import { useInitialDocument } from "@/lib/hooks";
import { Button } from "@/primitives/Button";
import { Skeleton } from "@/primitives/Skeleton";
import { Document } from "@/types";
// eslint-disable-next-line import/order
import { ClientSideSuspense } from "@liveblocks/react";
// eslint-disable-next-line import/order
import clsx from "clsx";
// eslint-disable-next-line import/order
import Link from "next/link";
// eslint-disable-next-line import/order
import { ComponentProps } from "react";
import { Logo } from "../Logo";
import { ShareDialog } from "../ShareDialog";
import styles from "./DocumentHeader.module.css";
// eslint-disable-next-line import/order
import { DocumentHeaderAvatars } from "./DocumentHeaderAvatars";
// eslint-disable-next-line import/order
import { DocumentHeaderName } from "./DocumentHeaderName";

interface Props extends ComponentProps<"header"> {
  documentId: Document["id"];
}

export function DocumentHeader({ documentId, className, ...props }: Props) {
  const initialDocument = useInitialDocument();

  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        <ClientSideSuspense
          fallback={
            <span className={styles.documentNameFallback}>
              {initialDocument.name}
            </span>
          }
        >
          <DocumentHeaderName
            onDocumentRename={(name) => renameDocument({ documentId, name })}
          />
        </ClientSideSuspense>
      </div>
      <div className={styles.collaboration}>
        <div className={styles.presence}>
          <ClientSideSuspense fallback={null}>
            <DocumentHeaderAvatars />
          </ClientSideSuspense>
        </div>
        <ClientSideSuspense
          fallback={
            <Button icon={<ShareIcon />} disabled={true}>
              共有
            </Button>
          }
        >
          <ShareDialog>
            <Button icon={<ShareIcon />}>共有</Button>
          </ShareDialog>
        </ClientSideSuspense>

        <InboxPopover align="end" sideOffset={4} />
      </div>
    </header>
  );
}

export function DocumentHeaderSkeleton({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        <Skeleton style={{ width: 120 }} />
      </div>
    </header>
  );
}
