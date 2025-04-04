"use client";
import { useEducationStore } from "@/app/store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";
import { GiGraduateCap } from "react-icons/gi";

export default function EducationInput() {
  const { educations, addEducation, updateEducation, deleteEducation } =
    useEducationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institute: "",
    areaofstudy: "",
    typeofstudy: "",
    dateRange: "",
    score: "",
    location: "",
  });

  // Handle Form Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institute || !formData.typeofstudy || !formData.areaofstudy)
      return;

    if (editId) {
      updateEducation(
        editId,
        formData.institute,
        formData.areaofstudy,
        formData.typeofstudy,
        formData.dateRange,
        formData.score
      );
    } else {
      addEducation(
        formData.institute,
        formData.areaofstudy,
        formData.typeofstudy,
        formData.dateRange,
        formData.score
      );
    }

    // Reset Form and Close Modal
    setFormData({
      institute: "",
      dateRange: "",
      areaofstudy: "",
      typeofstudy: "",
      score: "",
      location: "",
    });
    setEditId(null);
    setIsOpen(false);
  };

  // Handle Edit
  const handleEdit = (id: string) => {
    const education = educations.find((edu) => edu.id === id);
    if (education) {
      setFormData({
        institute: education.institute,
        areaofstudy: education.areaofstudy,
        typeofstudy: education.typeofstudy,
        dateRange: education.dateRange,
        score: education.score,
        location: education.location || "", // Provide default empty string if location is missing
      });
      setIsOpen(true);
      setEditId(id);
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    deleteEducation(id);
  };

  return (
    <section className="p-6 border-b">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GiGraduateCap className="text-xl" />
          <h2 className="text-xl font-bold">Education</h2>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <span className="sr-only">Toggle</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Display Education List */}
      {educations.length > 0 && (
        <div className="mb-4 space-y-2">
          {educations.map((education) => (
            <div
              key={education.id}
              className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{education.institute}</strong>
                <p className="text-sm text-gray-600">{education.typeofstudy}</p>
                <p className="text-sm text-gray-600">{education.areaofstudy}</p>
                <p className="text-sm text-gray-600">{education.dateRange}</p>
                {education.score && (
                  <p className="text-xs text-gray-500">
                    Score: {education.score}
                  </p>
                )}
                {education.location && (
                  <p className="text-xs text-gray-500">
                    Location: {education.location}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(education.id)}>
                  <Pencil className="w-4 h-4 text-blue text-red-700" />
                </button>{" "}
                <button onClick={() => handleDelete(education.id)}>
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#141414] text-white p-6 rounded-lg w-[600px] shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editId ? "Edit Education" : "Add Education"}
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="institute"
                  placeholder="Institute"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.institute}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="typeofstudy"
                  placeholder="Type of Study"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.typeofstudy}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="areaofstudy"
                  placeholder="Area of Study"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.areaofstudy}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="score"
                  placeholder="Score"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.score}
                  onChange={handleChange}
                  step="0.01" // Allows decimal values
                />
                <input
                  type="date"
                  name="dateRange"
                  className="w-full p-2 bg-black border rounded-md"
                  value={formData.dateRange}
                  placeholder="Date Range"
                  onChange={handleChange}
                  onFocus={(e) => e.target.showPicker()} // Show the date picker
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
              {/* Footer */}
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
