"use client";
import { useAchievementStore } from "@/app/store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { Pencil, Trash2 } from "lucide-react";

export default function AchievementInput() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useAchievementStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.details) return;

    if (editId) {
      updateAchievement(editId, formData.name, formData.details);
    } else {
      addAchievement(formData.name, formData.details);
    }

    setFormData({ name: "", details: "" });
    setEditId(null);
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const achievement = achievements.find((ach) => ach.id === id);
    if (achievement) {
      setFormData({
        name: achievement.name,
        details: achievement.details,
      });
      setEditId(id);
      setIsOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteAchievement(id);
  };

  return (
    <section className="p-6 border-b">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GiAchievement className="text-xl" />
          <h2 className="text-xl font-bold">Awards</h2>
        </div>
      </div>

      {/* Display Achievements */}
      {achievements.length > 0 && (
        <div className="mb-4 space-y-2">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div>
                <strong>{achievement.name}</strong>
                <p className="text-sm text-gray-600">{achievement.details}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(achievement.id)}>
                  <Pencil className="w-4 h-4 text-blue-700" />
                </button>
                <button onClick={() => handleDelete(achievement.id)}>
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
        + {editId ? "Edit Achievement" : "Add a new achievement"}
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
              <h2 className="text-lg font-semibold">{editId ? "Edit Achievement" : "Add Achievement"}</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Title"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="details"
                placeholder="Add description"
                className="w-full p-2 border rounded-md bg-black text-white"
                value={formData.details}
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
