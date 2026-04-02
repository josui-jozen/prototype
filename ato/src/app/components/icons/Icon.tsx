type IconName =
  | "door"
  | "brush"
  | "bookmark"
  | "shelf"
  | "ai-spark"
  | "git-branch"
  | "md-stamp"
  | "post"
  | "smartphone"
  | "palette";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={`ato-icon ${className ?? ""}`}
    />
  );
}
