import Link from "next/link";

export default function Navbar() {
  return (
    <div className="header">
      <div className="navbar-box">
        <div className="navbar" id="name">
          <Link href="/">Leonardo Furlan</Link>
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
