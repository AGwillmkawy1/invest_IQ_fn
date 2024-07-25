import { useAuthContext } from "../../context/AuthContext.tsx";
import useGetStartUpDocument from "../../hooks/collaboration/useGetStartUpDocument.ts";
import { ChangeEvent } from "react";
import { uploadFile } from "../../utils/sendToCloudinary.ts";
import sendStartUpDocs from "../../utils/sendStartUpDocs.ts";
import toast from "react-hot-toast";

export default function StartupDocs() {
  const { userInfo } = useAuthContext();
  const { document, refetch } = useGetStartUpDocument({
    businessId: userInfo.id,
  });

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    try {
      const fileName = await uploadFile(file, "raw");
      await sendStartUpDocs(fileName, userInfo.id);
      refetch();
    } catch (e) {
      toast.error("document upload failed");
    }
  }

  return (
    <div className="flex justify-between items-center border-2 px-5 py-3 rounded-2xl mt-5">
      <div>
        {document && (
          <a target="_blank" href={document} className="btn btn-success">
            View Document
          </a>
        )}
        {!document && <p className="text-orange-500">No document Uploaded! </p>}
      </div>
      <div>
        <input
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
          onChange={handleFileChange}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
