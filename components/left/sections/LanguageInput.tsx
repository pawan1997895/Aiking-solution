"use client";
import { useState } from "react";
import { FaTimes, FaLanguage } from "react-icons/fa";
import { useLanguageStore } from "@/app/store";
import { Pencil, Trash2 } from "lucide-react";

export default function LanguageInput() {
  const fluencyLevels = [
    "Native",
    "Proficient",
    "Advanced",
    "Intermediate",
    "Conversational",
    "Elementary",
  ];

  const { languages, addLanguage, updateLanguage, deleteLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    language: "",
    option: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.language || !formData.option) return;

    if (editId) {
      updateLanguage(editId, formData.language, formData.option);
    } else {
      addLanguage(formData.language, formData.option);
    }

    setFormData({ language: "", option: "" });
    setEditId(null);
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const language = languages.find((lang) => lang.id === id);
    if (language) {
      setFormData({
        language: language.heading,
        option: language.option,
      });
      setEditId(id);
      setIsOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteLanguage(id);
  };

  return (
    <section className="p-6 border-b">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaLanguage className="text-xl" />
          <h2 className="text-xl font-bold">Languages</h2>
        </div>
      </div>

      {/* Display Languages */}
      {languages.length > 0 && (
        <div className="mb-4 space-y-2">
          {languages.map((language) => (
            <div key={language.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div>
                <strong>{language.heading}</strong>
                <p className="text-sm text-gray-600">{language.option}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(language.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(language.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Language Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-3 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        + {editId ? "Edit Language" : "Add a new language"}
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
              <h2 className="text-lg font-semibold">{editId ? "Edit Language" : "Add Language"}</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="language"
                placeholder="Enter language"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.language}
                onChange={handleChange}
              />

              <select
                name="option"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.option}
                onChange={handleChange}
              >
                <option value="">Select proficiency</option>
                {fluencyLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>

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
