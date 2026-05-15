import Navbar from "@/components/Navbar";
import WorksGallery from "@/components/WorksGallery";
import Footer from "@/components/Footer";
import { getAllArtworks, getWorksSort } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function WorksPage() {
  const sort = await getWorksSort();
  const artworks = await getAllArtworks(sort);

  return (
    <>
      <Navbar />
      <WorksGallery artworks={artworks} footer={<Footer />} />
    </>
  );
}
