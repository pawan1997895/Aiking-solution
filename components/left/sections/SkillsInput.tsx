"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { Pencil, Trash2 } from "lucide-react";
import { useSkillStore } from "@/app/store";

export default function SkillsInput() {
  const { skills, addSkill, updateSkill, deleteSkill } = useSkillStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    heading: "",
    items: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      updateSkill(editId, formData.heading, formData.items);
    } else {
      addSkill(formData.heading, formData.items);
    }

    setFormData({ heading: "", items: "" });
    setEditId(null);
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const skill = skills.find((s) => s.id === id);
    if (skill) {
      setFormData({ heading: skill.heading, items: skill.items });
      setIsOpen(true);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteSkill(id);
  };

  return (
    <section className="p-6 border-b">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GiAchievement className="text-xl" />
          <h2 className="text-xl font-bold">Skills</h2>
        </div>
      </div>

      {skills.length > 0 && (
        <div>
          {skills.map((skill) => (
            <div key={skill.id} className="flex justify-between items-center border-b py-2">
              <span>{skill.heading}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(skill.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(true);
          setEditId(null);
        }}
        className="w-full p-3 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        + Add a new item
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-[#141414] text-white p-6 rounded-lg w-[600px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editId ? "Update Skill" : "Add Skill"}</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="heading"
                placeholder="Heading"
                className="w-full p-2 bg-black border rounded-md"
                value={formData.heading}
                onChange={handleChange}
              />
              <input
                type="text"
                name="items"
                placeholder="Items (comma separated)"
                className="w-full p-2 bg-black border rounded-md"
                value={formData.items}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-white text-black rounded-md"
                onClick={handleSubmit}
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
