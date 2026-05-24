import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NavBrand() {
  return (
    <Link href="/" className="shrink-0 select-none">
      <motion.span
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="text-2xl font-black tracking-tight text-(--primary)"
      >
        <Image
          src="/logo.png"
          alt="Aniden Logo"
          width={82}
          height={32}
          className="-mt-1 mr-2 inline-block"
        />
      </motion.span>
    </Link>
  );
}
