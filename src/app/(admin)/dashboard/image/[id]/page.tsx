import { getImage } from "@/app/actions/imageActions";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ImageDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const image = await getImage(resolvedParams.id);

  if (!image) {
    notFound();
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Détails de l&apos;image</h1>
      <div className="space-y-4">
        <p>
          <strong>Nom du fichier :</strong> {image.filename}
        </p>
        <p>
          <strong>Projet associé :</strong> {image.projectId}
        </p>
        <p>
          <strong>Créée le :</strong>{" "}
          {new Date(image.createdAt).toLocaleString("fr-FR")}
        </p>

        <div>
          <Image
            src={image.filePath}
            alt={image.filename}
            className="mt-2 max-w-full rounded-lg w-auto h-auto"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
}
