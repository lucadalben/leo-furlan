import Link from "next/link";
import Footer from "@/components/Footer";
import ThreeBallWrapper from "@/components/ThreeBallWrapper";

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <ThreeBallWrapper />

      <section className="home-container">
        <div className="menu">
          <div className="name">
            <Link href="/">Leonardo Furlan</Link>
          </div>
          <div className="bio">
            <span>Italian artist based in Venice (IT).</span>
          </div>
          <div className="works">
            <Link href="/works">Works</Link>
          </div>
          <div className="info">
            <Link href="/info">Info</Link>
          </div>
        </div>

        <div className="footer home-footer">
          <Footer />
        </div>
      </section>
    </main>
  );
}
