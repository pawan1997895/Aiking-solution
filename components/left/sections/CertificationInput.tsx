"use client";
import { useCertificateStore } from "@/app/store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import { Pencil, Trash2 } from "lucide-react";

export default function CertificationInput() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useCertificateStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    awarder: "",
    date: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.awarder || !formData.date) return;

    if (editId) {
      updateCertificate(editId, formData.title, formData.awarder, formData.date, formData.link);
    } else {
      addCertificate(formData.title, formData.awarder, formData.date, formData.link);
    }

    setFormData({ title: "", awarder: "", date: "", link: "" });
    setEditId(null);
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const certificate = certificates.find((cert) => cert.id === id);
    if (certificate) {
      setFormData({
        title: certificate.title,
        awarder: certificate.awarder,
        date: certificate.date,
        link: certificate.link || "",
      });
      setIsOpen(true);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteCertificate(id);
  };

  return (
    <section className="p-6 border-b">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PiCertificateLight className="text-xl" />
          <h2 className="text-xl font-bold">Certifications</h2>
        </div>
      </div>

      {/* Display Certificates */}
      {certificates.length > 0 && (
        <div className="mb-4 space-y-2">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div>
                <strong>{certificate.title}</strong>
                <p className="text-sm text-gray-600">{certificate.awarder}</p>
                <p className="text-xs text-gray-500">{certificate.date}</p>
                {certificate.link && (
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(certificate.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(certificate.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to Open Modal */}
      <button
        onClick={() => {
          setIsOpen(true);
          setEditId(null);
        }}
        className="w-full p-3 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        + Add a new certification
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#141414] text-white p-6 rounded-lg w-[400px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editId ? "Update Certification" : "Add Certification"}</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Certification Title"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="awarder"
                placeholder="Awarded By"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.awarder}
                onChange={handleChange}
              />
              <input
                type="date"
                name="date"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.date}
                onChange={handleChange}
              />
              <input
                type="url"
                name="link"
                placeholder="Certificate Link (Optional)"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.link}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-white text-black rounded-md">
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
