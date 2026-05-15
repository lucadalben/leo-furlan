import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function Navbar() {
  const settings = await getSiteSettings();
  const artistName = settings?.artistName ?? "Leonardo Furlan";

  return (
    <div className="header">
      <div className="navbar-box">
        <div className="navbar" id="name">
          <Link href="/">{artistName}</Link>
        </div>
        <div className="navbar" id="works">
          <Link href="/works">Works</Link>
        </div>
      </div>
      <div className="navbar" id="info">
        <Link href="/info">Info</Link>
      </div>
    </div>
  );
}
