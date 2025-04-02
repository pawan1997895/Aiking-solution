"use client";
import { useState } from "react";
import { MdWork } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";
import { useExperienceStore } from "@/app/store";

export default function ExperienceInput() {
  const { experiences, addExperience, updateExperience, deleteExperience } =
    useExperienceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    dateRange: "",
    location: "",
    description: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.position) return; // Prevent empty submissions

    if (editId !== null) {
      updateExperience(
        editId,
        formData.company,
        formData.position,
        formData.dateRange,
        formData.location,
        formData.description
      );
    } else {
      addExperience(
        formData.company,
        formData.position,
        formData.dateRange,
        formData.location,
        formData.description
      );
    }

    setFormData({
      company: "",
      position: "",
      dateRange: "",
      location: "",
      description: "",
    }); // Reset form
    setIsOpen(false); // Close modal after submission
    setEditId(null);
  };

  const handleEdit = (id: string) => {
    const experience = experiences.find((exp) => exp.id === id);
    if (experience) {
      setFormData({ ...experience });
      setIsOpen(true);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
  };

  return (
    <section className="p-6 border-b">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MdWork className="text-xl" />
          <h2 className="text-xl font-bold">Experience</h2>
        </div>
      </div>

      {/* Display Experience List */}
      {experiences.length > 0 && (
        <div className="mb-4 space-y-2">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{experience.company}</strong>
                <p className="text-sm text-gray-600">{experience.position}</p>
                <p className="text-sm text-gray-600">{experience.dateRange}</p>
                {experience.location && (
                  <p className="text-xs text-gray-500">
                    Location: {experience.location}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {experience.description}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(experience.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(experience.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setEditId(null);
        }}
        className="w-full p-3 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        + Add a new item
      </button>

      {/* Experience Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] text-white p-6 rounded-lg w-[600px] shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editId ? "Edit Experience" : "Add Experience"}
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Experience Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="dateRange"
                  placeholder="DD MM YYYY - Present"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.dateRange}
                  onChange={handleChange}
                  onFocus={(e) => e.target.showPicker()} // Calendar open karne ke liye
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Description Textarea */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full p-3 bg-black border rounded-md min-h-[150px]"
                  placeholder="Write your professional experience..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded-md"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
