import Navbar from "@/components/Navbar";
import WorksGallery from "@/components/WorksGallery";
import { getAllArtworks, getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function WorksPage() {
  const settings = await getSiteSettings();
  const artworks = await getAllArtworks(settings?.worksSort ?? "manual");

  return (
    <>
      <Navbar />
      <WorksGallery artworks={artworks} />
    </>
  );
}
