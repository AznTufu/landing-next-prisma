import { getTag, deleteTag } from "@/app/actions/tagActions";
import { notFound, redirect } from "next/navigation";
import { FaTrash } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const tag = await getTag(resolvedParams.id);
  if (!tag) {
    return { title: "Tag non trouvé" };
  }
  return { title: `Détails du tag : ${tag.name}` };
}

export default async function TagDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const tag = await getTag(resolvedParams.id);

  if (!tag) {
    notFound();
  }

  const handleDelete = async () => {
    "use server";
    await deleteTag(resolvedParams.id);
    redirect("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Détails du tag : {tag.name}</h1>
      <div>
        <strong>ID :</strong> {tag.id}
      </div>
      <div>
        <strong>Nom :</strong> {tag.name}
      </div>
      <div>
        <strong>Créé le :</strong>{" "}
        {new Date(tag.createdAt).toLocaleString("fr-FR")}
      </div>
      <div>
        <strong>Mis à jour le :</strong>{" "}
        {new Date(tag.updatedAt).toLocaleString("fr-FR")}
      </div>
      <form action={handleDelete}>
        <button
          type="submit"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaTrash style={{ color: "red" }} />
        </button>
      </form>
    </div>
  );
}
