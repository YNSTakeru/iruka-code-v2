import { DASHBOARD_GROUP_URL, DASHBOARD_URL } from "@/constants";
import { FileIcon, FolderIcon } from "@/icons";
import { LinkButton } from "@/primitives/Button";
import { Group } from "@/types";
import { normalizeTrailingSlash } from "@/utils";
// eslint-disable-next-line import/order
import clsx from "clsx";
// eslint-disable-next-line import/order
import { usePathname } from "next/navigation";
// eslint-disable-next-line import/order
import { ComponentProps, useMemo } from "react";
import styles from "./DashboardSidebar.module.css";

interface Props extends ComponentProps<"div"> {
  groups: Group[];
}

interface SidebarLinkProps
  extends Omit<ComponentProps<typeof LinkButton>, "href"> {
  href: string;
}

function SidebarLink({
  href,
  children,
  className,
  ...props
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(
    () => normalizeTrailingSlash(pathname) === normalizeTrailingSlash(href),
    [pathname, href]
  );

  return (
    <LinkButton
      className={clsx(className, styles.sidebarLink)}
      data-active={isActive || undefined}
      href={href}
      variant="subtle"
      {...props}
    >
      {children}
    </LinkButton>
  );
}

export function DashboardSidebar({ className, groups, ...props }: Props) {
  return (
    <div className={clsx(className, styles.sidebar)} {...props}>
      <nav className={styles.navigation}>
        <div className={styles.category}>
          <ul className={styles.list}>
            <li>
              <SidebarLink href={DASHBOARD_URL} icon={<FileIcon />}>
                All
              </SidebarLink>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <span className={styles.categoryTitle}>Groups</span>
          <ul className={styles.list}>
            {groups.map((group) => {
              return (
                <li key={group.id}>
                  <SidebarLink
                    href={DASHBOARD_GROUP_URL(group.id)}
                    icon={<FolderIcon />}
                  >
                    {group.name}
                  </SidebarLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
