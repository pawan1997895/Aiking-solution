"use client";
import { useState } from "react";
import { FaTimes, FaTag } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { Pencil, Trash2 } from "lucide-react";
import { useProjectStore } from "@/app/store";

export default function ProjectInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    website: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.description) return;

    if (editId) {
      updateProject(editId, formData.name, formData.description);
    } else {
      addProject(formData.name, formData.description, formData.website, formData.date);
    }

    setFormData({ name: "", date: "", website: "", description: "" });
    setEditId(null);
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const project = projects.find((proj) => proj.id === id);
    if (project) {
      setFormData({
        name: project.name,
        date: project.date,
        website: project.website,
        description: project.description,
      });
      setEditId(id);
      setIsOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  return (
    <section className="p-6 border-b">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BiBook className="text-xl" />
          <h2 className="text-xl font-bold">Projects</h2>
        </div>
      </div>

      {/* Display Projects */}
      {projects.length > 0 && (
        <div className="mb-4 space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div>
                <strong>{project.name}</strong>
                <p className="text-sm text-gray-600">{project.date}</p>
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs underline"
                  >
                    View Project
                  </a>
                )}
                <p className="text-xs text-gray-500">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(project.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-3 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        + {editId ? "Edit Project" : "Add a new project"}
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
              <h2 className="text-lg font-semibold">{editId ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.name}
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
                name="website"
                placeholder="Project Website (Optional)"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.website}
                onChange={handleChange}
              />

              {/* Description Field */}
              <textarea
                name="description"
                className="w-full p-3 bg-black border rounded-md min-h-[100px]"
                placeholder="Describe your project..."
                value={formData.description}
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
