"use client";
import React, { ChangeEvent } from "react";
import { usePersonalDataStore } from "@/app/store";
import { GoPerson } from "react-icons/go";
import { BiWorld } from "react-icons/bi";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import EducationInput from "./sections/EducationInput";
import ExperienceInput from "./sections/ExperienceInput";
import AchievementInput from "./sections/AchievementInput";
import CertificationInput from "./sections/CertificationInput";
import ProjectInput from "./sections/ProjectInput";
import SkillsInput from "./sections/SkillsInput";
import LanguageInput from "./sections/LanguageInput";

export default function LeftSidebar() {
  const { personalData, updatePersonalData } = usePersonalDataStore();
  const handleChangePersonal = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalData(name, value);
  };

  return (
    <div className="w-full h-[1000px] overflow-scroll scrollbar-hidden bg-white text-black">
      {/* Basics Section */}

      <section className="p-6 border-b">
        <div className="flex items-center gap-2 mb-6">
          <GoPerson className="text-xl" />
          <h2 className="text-xl font-bold">Basics</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Picture</label>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center text-white text-xl">
              {personalData.name?.[0] || "M"}
            </div>
            <button className="p-2 border rounded-md hover:bg-gray-50">
              <AiOutlineLink className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            name="name"
            value={personalData.name || ""}
            onChange={handleChangePersonal}
            placeholder="Your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Headline</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            name="headline"
            value={personalData.headline || ""}
            onChange={handleChangePersonal}
            placeholder="Your professional headline"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-2 pl-8 border rounded-md"
                name="email"
                value={personalData.email || ""}
                onChange={handleChangePersonal}
                placeholder="Your email"
              />
              <AiOutlineMail className="absolute left-2 top-3 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-2 pl-8 border rounded-md"
                name="website"
                value={personalData.website || ""}
                onChange={handleChangePersonal}
                placeholder="Your website"
              />
              <BiWorld className="absolute left-2 top-3 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Twitter</label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-2 pl-8 border rounded-md"
                name="twitter"
                value={personalData.twitter || ""}
                onChange={handleChangePersonal}
                placeholder="Your Twitter profile"
              />
              <svg
                className="absolute left-2 top-3 text-gray-500 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 4.5a9 9 0 01-2.6.7 4.5 4.5 0 00-7.7 4c-4 0-7.5-2-10-5a4.5 4.5 0 001.5 6c-1 0-2-.3-2.5-1v.1a4.5 4.5 0 003.5 4.4 4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3A9 9 0 012 19c2 1 4 1.5 6.5 1.5 7.5 0 12-6 12-12v-.5a8.5 8.5 0 002-2.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn</label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-2 pl-8 border rounded-md"
                name="linkedin"
                value={personalData.linkedin || ""}
                onChange={handleChangePersonal}
                placeholder="Your LinkedIn profile"
              />
              <svg
                className="absolute left-2 top-3 text-gray-500 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="9"
                  width="4"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <div className="relative">
              <input
                type="tel"
                className="w-full p-2 pl-8 border rounded-md"
                name="phone"
                value={personalData.phone || ""}
                onChange={handleChangePersonal}
                placeholder="+1 (123) 456-7890"
              />
              <FiPhone className="absolute left-2 top-3 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pl-8 border rounded-md"
                name="address"
                value={personalData.address || ""}
                onChange={handleChangePersonal}
                placeholder="Your location"
              />
              <svg
                className="absolute left-2 top-3 text-gray-500 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">GitHub</label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-2 pl-8 border rounded-md"
                name="github"
                value={personalData.github || ""}
                onChange={handleChangePersonal}
                placeholder="Your GitHub profile"
              />
              <svg
                className="absolute left-2 top-3 text-gray-500 w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.996.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.311.467-2.382 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.48 5.922.43.372.814 1.102.814 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <ExperienceInput />

      <EducationInput />

      <SkillsInput />

      <AchievementInput />

      <CertificationInput />

      <ProjectInput />

      <LanguageInput />
    </div>
  );
}
