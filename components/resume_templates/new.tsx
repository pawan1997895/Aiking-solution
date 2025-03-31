"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  usePersonalDataStore,
  useCertificateStore,
  useAchievementStore,
  useExperienceStore,
  useEducationStore,
  useProjectStore,
  useLanguageStore,
  useSkillStore,
} from "@/app/store";

export default function Resume() {
  const { personalData } = usePersonalDataStore();
  const { certificates } = useCertificateStore();
  const { achievements } = useAchievementStore();
  const { experiences } = useExperienceStore();
  const { educations } = useEducationStore();
  const { projects } = useProjectStore();
  const { languages } = useLanguageStore();
  const { skills } = useSkillStore();

  const originalBasePageHeight = 1123;
  const basePageHeight = Math.round(originalBasePageHeight * 1.2);
  const paddingTopBottom = 40;
  const contentWrapperHeight = basePageHeight;
  const availableContentHeight = contentWrapperHeight - 2 * paddingTopBottom;

  const contentRef = useRef(null);
  const [pageGroups, setPageGroups] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const pageHeightClass = `h-[${basePageHeight}px]`;
  const contentHeightClass = `h-[${contentWrapperHeight}px] print:h-auto`;
  const paddingClass = `pt-[${paddingTopBottom}px] pb-[${paddingTopBottom}px]`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateElements = () => {
    const headerElement = {
      id: "header",
      type: "header",
      content: [
        { id: "personal-header", type: "personal-header", data: personalData },
        { id: "personal-contact", type: "personal-contact", data: personalData },
      ],
    };

    const sectionElements = [];

    if (personalData.headline) {
      sectionElements.push({
        id: "summary",
        type: "section",
        section: "SUMMARY",
        content: [
          {
            id: "summary-content",
            type: "summary",
            data: { text: personalData.headline || "A brief summary about the candidate." },
          },
        ],
      });
    }

    if (experiences.length) {
      const experienceContent = experiences.flatMap((exp, index) => [
        { id: `experience-${index}-header`, type: "experience-header", data: exp },
        ...(exp.description
          ? exp.description.split(",").map((detail, i) => ({
              id: `experience-${index}-desc-${i}`,
              type: "experience-desc",
              data: { text: detail.trim(), parentId: index },
            }))
          : []),
      ]);
      sectionElements.push({
        id: "experience",
        type: "section",
        section: "EXPERIENCE",
        content: experienceContent,
      });
    }

    if (educations.length) {
      const educationContent = educations.map((edu, index) => ({
        id: `education-${index}`,
        type: "education",
        data: edu,
      }));
      sectionElements.push({
        id: "education",
        type: "section",
        section: "EDUCATION",
        content: educationContent,
      });
    }

    if (skills.length) {
      const skillContent = skills.map((skill, index) => ({
        id: `skill-${index}`,
        type: "skill",
        data: skill,
      }));
      sectionElements.push({
        id: "skills",
        type: "section",
        section: "SKILLS",
        content: skillContent,
      });
    }

    if (achievements.length) {
      const awardContent = achievements.map((ach, index) => ({
        id: `achievement-${index}`,
        type: "achievement",
        data: ach,
      }));
      sectionElements.push({
        id: "awards",
        type: "section",
        section: "AWARDS",
        content: awardContent,
      });
    }

    const profileLinks = [];
    if (personalData.twitter) {
      profileLinks.push({ id: "profile-twitter", type: "profile", data: { name: "Twitter", link: personalData.twitter } });
    }
    if (personalData.linkedin) {
      profileLinks.push({ id: "profile-linkedin", type: "profile", data: { name: "LinkedIn", link: personalData.linkedin } });
    }
    if (personalData.github) {
      profileLinks.push({ id: "profile-github", type: "profile", data: { name: "GitHub", link: personalData.github } });
    }
    if (profileLinks.length) {
      sectionElements.push({
        id: "profiles",
        type: "section",
        section: "PROFILES",
        content: profileLinks,
      });
    }

    if (projects.length) {
      const projectContent = projects.map((proj, index) => ({
        id: `project-${index}`,
        type: "project",
        data: proj,
      }));
      sectionElements.push({
        id: "projects",
        type: "section",
        section: "PROJECTS",
        content: projectContent,
      });
    }

    if (certificates.length) {
      const certificateContent = certificates.map((cert, index) => ({
        id: `certificate-${index}`,
        type: "certificate",
        data: cert,
      }));
      sectionElements.push({
        id: "certifications",
        type: "section",
        section: "CERTIFICATIONS",
        content: certificateContent,
      });
    }

    if (languages.length) {
      const languageContent = languages.map((lang, index) => ({
        id: `language-${index}`,
        type: "language",
        data: lang,
      }));
      sectionElements.push({
        id: "languages",
        type: "section",
        section: "LANGUAGES",
        content: languageContent,
      });
    }

    return { headerElement, sectionElements };
  };

  useEffect(() => {
    if (!contentRef.current || !isMounted) return;

    const { headerElement, sectionElements } = generateElements();
    const pageGroupsTemp = [];
    let currentPage = [];
    let currentHeight = 0;

    const measureElementHeight = (id) => {
      const elementNode = contentRef.current?.querySelector(`#${id}`);
      return elementNode?.scrollHeight || 0;
    };

    const headerHeight = measureElementHeight("header");
    if (headerHeight > 0) {
      currentPage.push(headerElement);
      currentHeight += headerHeight;
    }

    sectionElements.forEach((section) => {
      const sectionHeight = measureElementHeight(section.id);
      if (sectionHeight === 0) {
        console.warn(`Section ${section.id} has zero height, skipping`);
        return;
      }
      if (currentHeight + sectionHeight > availableContentHeight) {
        if (currentPage.length > 0) {
          pageGroupsTemp.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
      }
      currentPage.push(section);
      currentHeight += sectionHeight;
    });

    if (currentPage.length > 0) {
      pageGroupsTemp.push(currentPage);
    }

    setPageGroups(pageGroupsTemp);
  }, [
    personalData,
    certificates,
    achievements,
    experiences,
    educations,
    projects,
    languages,
    skills,
    isMounted,
  ]);

  const renderElement = (element) => {
    switch (element.type) {
      case "header":
        return (
          <div key={element.id} className="mb-8 border-b border-gray-200 pb-4">
            {element.content.map((item) => (
              <div key={item.id}>{renderElement(item)}</div>
            ))}
          </div>
        );
      case "personal-header":
        return (
          <div key={element.id} className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {element.data.name || "Your Name"}
            </h1>
          </div>
        );
      case "personal-contact":
        return (
          <section key={element.id} className="mb-4">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
              {element.data.address && (
                <div key="address" className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <p>{element.data.address}</p>
                </div>
              )}
              {element.data.phone && (
                <div key="phone" className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 5l4-1 2 3-3 4 5 5 4-3 3 2-1 4H5L3 5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a href={`tel:${element.data.phone}`} className="text-blue-600 hover:underline">
                    {element.data.phone}
                  </a>
                </div>
              )}
              {element.data.email && (
                <div key="email" className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16v16H4V4zm0 4l8 5 8-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a href={`mailto:${element.data.email}`} className="text-blue-600 hover:underline">
                    {element.data.email}
                  </a>
                </div>
              )}
              {element.data.website && (
                <div key="website" className="flex items-center space-x-1 print:hidden">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 016 6 6 6 0 01-6 6 6 6 0 01-6-6 6 6 0 016-6zm0 2v8m-4-4h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a
                    href={element.data.website.startsWith("http") ? element.data.website : `https://${element.data.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {element.data.website}
                  </a>
                </div>
              )}
            </div>
          </section>
        );
      case "section":
        return (
          <div key={element.id} className="grid grid-cols-[1fr_3fr] gap-4 mb-6 items-start">
            <div className="font-bold text-lg text-gray-800">{element.section}</div>
            <div>
              {element.content.map((item) => (
                <div key={item.id}>{renderElement(item)}</div>
              ))}
            </div>
          </div>
        );
      case "summary":
        return <p key={element.id} className="text-sm text-gray-700">{element.data.text}</p>;
      case "profile":
        return (
          <div key={element.id} className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
            {element.data.name === "Twitter" && (
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 4.5a9 9 0 01-2.6.7 4.5 4.5 0 00-7.7 4c-4 0-7.5-2-10-5a4.5 4.5 0 001.5 6c-1 0-2-.3-2.5-1v.1a4.5 4.5 0 003.5 4.4 4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3A9 9 0 012 19c2 1 4 1.5 6.5 1.5 7.5 0 12-6 12-12v-.5a8.5 8.5 0 002-2.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
            {element.data.name === "LinkedIn" && (
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-7a2 2 0 110 4 2 2 0 010-4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {element.data.name === "GitHub" && (
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.996.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.311.467-2.382 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.48 5.922.43.372.814 1.102.814 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            )}
            <a
              href={
                element.data.name === "Twitter"
                  ? `https://twitter.com/${element.data.link.replace("@", "")}`
                  : element.data.name === "LinkedIn"
                  ? `https://www.linkedin.com/in/${element.data.link}`
                  : `https://github.com/${element.data.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {element.data.link}
            </a>
          </div>
        );
      case "experience-header":
        return (
          <div key={element.id} className="mb-2">
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-700">
                {element.data.company}, {element.data.location}
              </span>
              <span className="text-sm text-gray-500">{element.data.dateRange}</span>
            </div>
            <p className="text-sm italic text-gray-600">{element.data.position}</p>
            {element.data.website && (
              <p className="text-sm text-gray-500">{element.data.website}</p>
            )}
          </div>
        );
      case "experience-desc":
        return (
          <ul key={element.id} className="list-disc list-inside text-sm text-gray-700 mb-4 pl-4">
            <li>{element.data.text}</li>
          </ul>
        );
      case "project":
        return (
          <div key={element.id} className="mb-4">
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-700">{element.data.name}</span>
              <span className="text-sm text-gray-500">{element.data.date}</span>
            </div>
            {element.data.website && (
              <p className="text-sm text-gray-500">{element.data.website}</p>
            )}
            {element.data.description && (
              <p className="text-sm text-gray-700">{element.data.description}</p>
            )}
          </div>
        );
      case "skill":
        return (
          <div key={element.id} className="text-sm text-gray-700 mb-2 flex items-center">
            <span className="font-medium mr-2">{element.data.heading}:</span>
            <span>{element.data.items}</span>
            <span className="ml-2">●●●●○</span>
          </div>
        );
      case "education":
        return (
          <div key={element.id} className="mb-4">
            <div className="flex justify-between">
              <div>
                <div className="text-base font-medium text-gray-700">
                  {element.data.institute}
                </div>
                <p className="text-sm text-gray-600">
                  {element.data.typeofstudy} in {element.data.areaofstudy}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{element.data.dateRange}</span>
                {element.data.score && (
                  <span className="text-sm text-gray-700 block">{element.data.score}</span>
                )}
              </div>
            </div>
          </div>
        );
      case "certificate":
        return (
          <div key={element.id} className="mb-2">
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-700">{element.data.title}</span>
              <span className="text-sm text-gray-500">{element.data.date}</span>
            </div>
            <a
              href={element.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {element.data.awarder}
            </a>
          </div>
        );
      case "achievement":
        return (
          <div key={element.id} className="mb-2">
            <div className="text-base font-medium text-gray-700">{element.data.name}</div>
            <p className="text-sm text-gray-600">{element.data.details}</p>
          </div>
        );
      case "language":
        return (
          <div key={element.id} className="text-sm text-gray-700 mb-2">
            <span className="font-medium">{element.data.heading}:</span> {element.data.option}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="resume-container min-h-screen font-sans print:p-0">
      <div ref={contentRef} className="absolute top-0 left-0 w-[1080px] opacity-0 pointer-events-none">
        {(() => {
          const { headerElement, sectionElements } = generateElements();
          return (
            <>
              <div key={headerElement.id} id={headerElement.id}>
                {headerElement.content.map((item) => (
                  <div key={item.id}>{renderElement(item)}</div>
                ))}
              </div>
              {sectionElements.map((section) => (
                <div key={section.id} id={section.id}>
                  <div className="grid grid-cols-[1fr_3fr] gap-4 mb-6">
                    <div className="font-bold text-lg text-gray-800">{section.section}</div>
                    <div>
                      {section.content.map((item) => (
                        <div key={item.id}>{renderElement(item)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          );
        })()}
      </div>

      {pageGroups.length > 0 ? (
        pageGroups.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`page print-page bg-white text-gray-800 w-full max-w-[1080px] mx-auto ${pageHeightClass} mb-[20px] shadow-lg print:h-auto print:shadow-none print:mt-0 print:mb-0`}
          >
            <div className={`content-wrapper p-8 ${contentHeightClass} print:p-0`}>
              {page.map((element) => {
                if (element.type === "header") {
                  return (
                    <div key={element.id} className="mb-8 border-b border-gray-200 pb-4">
                      {element.content.map((item) => (
                        <div key={item.id}>{renderElement(item)}</div>
                      ))}
                    </div>
                  );
                } else if (element.type === "section") {
                  return (
                    <div key={element.id} className="grid grid-cols-[1fr_3fr] gap-4 mb-6 items-start">
                      <div className="font-bold text-lg text-gray-800">{element.section}</div>
                      <div>
                        {element.content.map((item) => (
                          <div key={item.id}>{renderElement(item)}</div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))
      ) : (
        <div
          className={`page print-page bg-white text-gray-800 w-full max-w-[1080px] mx-auto ${pageHeightClass} mb-[20px] shadow-lg print:h-auto print:shadow-none print:mt-0 print:mb-0`}
        >
          <div className={`content-wrapper p-8 ${contentHeightClass} print:p-0`}>
            <p className="text-center text-gray-500">Loading content...</p>
          </div>
        </div>
      )}
    </div>
  );
}