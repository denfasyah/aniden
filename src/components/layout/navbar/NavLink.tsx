import Link from "next/link";

interface Props {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function MobileNavLink({ href, onClick, children }: Props) {
  return (
    <Link href={href} onClick={onClick} className="mobile-nav-link">
      {children}
    </Link>
  );
}