import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar
            key={connectionId}
            picture={info.avatar ?? ""}
            name={info.name ?? "Unknown"}
          />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.avatar ?? ""}
            name={currentUser.info.name ?? "Unknown"}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
        alt={name}
      />
    </div>
  );
}
