"use client";
import React, { useRef, useEffect, useState } from "react";
import LeftSidebar from "@/components/left/LeftSidebar";
import Resume from "@/components/resume_templates/bonzor";
import Rightsidebar from "@/components/right/Rightsidebar";
import { useReactToPrint } from "react-to-print";
import { ref, getDatabase, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import app from "@/firebase/config";
import fillResumeData from "../../oneclick/page"; // Import the function
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useThemeStore } from "@/app/store";
import Luxary from "@/components/resume_templates/luxary";
import Unique from "@/components/resume_templates/Unique";
import NewResume from "@/components/resume_templates/new";

const CreateResume: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null); // Store fetched data
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { selectedTemplate } = useThemeStore(); // Get selected template from store
  

  const db = getDatabase(app);
  console.log(uid, "uid");
  const datapath = ref(db, "user/" + uid + "/" + "resume_data/" + "newData/");

// In CreateResume.tsx
const templateComponents = {
  'bonzor': Resume,
  'luxary': Luxary,
  'unique': Unique,
  'new resume': NewResume,
};

// Fix the selected template logic
const SelectedTemplateComponent = templateComponents[selectedTemplate.toLowerCase()] || Resume;


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const snapshot = await get(datapath);
        if (snapshot.exists()) {
          console.log("Retrieved Data:", snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchDataAsync();
  });



  useEffect(() => {
    const auth = getAuth();
    setUid(auth.currentUser ? auth.currentUser.uid : null);
    let api_key = localStorage.getItem("api_key");
    if (!api_key) {
      console.error("API Key is missing in localStorage!");
      return;
    }
    console.log(api_key);
    setApiKey(api_key);
  }, []);

  const geminiClient = new GoogleGenerativeAI(apiKey);

  useEffect(() => {
    // if (!uid) return;

    // const db = getDatabase(app);
    // const datapath = ref(db, `user/${uid}/resume_data/newData/`);

    // const fetchDataAsync = async () => {
    //   try {
    //     const snapshot = await get(datapath);
    //     if (snapshot.exists()) {
    //       console.log("Retrieved Data:", snapshot.val());
    //       setResumeData(snapshot.val()); // Store data in state
    //       fillResumeData(snapshot.val()); // Fill Zustand state
    //     } else {
    //       console.log("No data available");
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving data:", error);
    //   }
    // };

    // fetchDataAsync();
    let previous_resume_data = "SUMAN BERA  Phone: 8768814455  E - mail :   suman80bera@gmail.com  LinkedIn :   Linkedin.com  GitHub   Link :   Github.com  EXPERIENCE  FunctionUp,   Backend Developer Trainee.  May 2022 -   PRESENT  ●   Upskilling   in making backend applications by using Node.Js,  Express & MongoDB.  ●   Built the backend of 5 group projects with my teammates.  PROJECTS  ●   E - Commerce Dashboard   |   DEPLOYMENT LINK  [Jan - 23 ]  Tech Stack :   Developed backend   and frontend of   an   e - commerce  dashboard   using   node.js, react.js,   Mongo DB ,   Express,   and   JWT for  authentication &   authorization .  ●   URL Shortener   |   GITHUB LINK  [Jul - 21]  Tech Stack :   Developed backend of a website like Tiny URL and  Bit.ly which shortens along URL using the short ID npm   package.  Used   Redis for caching   URLs   to improve performance.  ●   Book Management   |   GITHUB LINK  [Jul - 21]  Tech Stack :   Developed   the   backend of a website like Books Wagon  where users can register,   publish books and give ratings to each  book.  ●   Open To Intern   |   GITHUB LINK  [Jul - 21]  Tech Stack :   A website   that   registers colleges and students looking  for internships.   Used JWT for authentication and authorization,   and  AWS S3 service for storing files.  ●   Blog Management   |   GITHUB LINK  [Jun - 21]  Tech Stack :   Developed   the   backend of a website like NEWBREED  BLOG where users can create their own   accounts , publish blogs and  give ratings to each blog .  SKILLS  ●   Node.Js  ●   Java Script  ●   MongoDB  ●   JWT  ●   AWS S3  ●   Data Structure & Algorithm.  ●   HTML & CSS  ●   Redis  ●   Git  ●   Postman  ●   MySQL  ●   Typescript  ●   React   Js(Basic)  ●   Python  EDUCATION  Siliguri Institute of Technology   -  B.Tech  Electrical Engineering, 8.5 cgpa  June 2018   -   May 2022  Bagnabarh High School,   -  12th,   82%  July 2016   -   July 2018  Bagnabarh High School,   -  10th,   83%  July 2015   -   July 2016  Soft Skills  ●   Team Work.  ●   Time Management.  ●   Quick Learner  ●   Self Motivated. currentCtc 1; ExpectedCtc 2; NoticePeriod 15; Location remote"
    let job_description = `Writing clean and well structured HTML, CSS and JavaScript code to create layout,style,functionality of webpages.
     Adding and improving functionalities to the various domains of websites.
Developing new user-facing features using various front-end libraries and frameworks((e.g., React, Angular, Vue.js) to enhance user engagement and functionality.
Building reusable components and front-end libraries for future use.
Collaborating closely with UI/UX designers to translate design mockups and wireframes into functional web interfaces, paying attention to detail and design consistency.
Optimizing components for maximum performance across a vast array of web-capable devices and browsers.
Using version control systems like Git to manage code changes, collaborate with team members, and maintain a clean and organized codebase.
Effectively communicating with designers, back-end developers, project managers, and other team members to ensure seamless integration of front-end components with the overall project.
Understanding business requirements and translating them into technical requirements.`
    async function analyzeResumeForSkill() {
      // console.log("from analyzer",);

      const prompt = `You are an AI that generates structured resume data in JSON format. Below, I will provide previous resume data and a job description. Your task is to carefully analyze both, understand the job requirements, and update the resume while ensuring that all fields remain correctly structured.

### Instructions:
1. **Retain personal details exactly as they are** without any modifications.
2. **Modify the 'skills' section** to align with the job description while maintaining the structure. Ensure that all skills are grouped under relevant headings and formatted as in the example JSON.
3. **Update the 'experiences' section** by emphasizing responsibilities and achievements relevant to the job description. Retain the same structure and formatting.
4. **Preserve the JSON structure** exactly as shown in the example, ensuring that key names remain unchanged.
5. **Ensure uniformity in field values** (e.g., the format of dates, lists, objects) so that the modified resume is consistent with the example structure.

### Input Data:
**Previous Resume Data:**
${previous_resume_data}

**Job Description:**
${job_description}

### Output Format:
Return the updated resume in **JSON format** ensuring all key names, structures, and data formats are identical to the following example:

\ \ \json
      {
        "personalData": {
          "name": "John Doe",
            "headline": "Software Developer",
              "summary": "Experienced in web development",
                "profile": "profile-url",
                  "address": "123 Main St, City",
                    "phone": "1234567890",
                      "email": "john@example.com",
                        "skill": "React, Node.js",
                          "hobbie": "Reading, Coding",
                            "language": "English, French",
                              "twitter": "john_twitter",
                                "linkedin": "john_linkedin",
                                  "github": "john_github",
                                    "location": "City, Country",
                                      "website": "www.johndoe.com"
        },
        "projects": [
          {
            "name": "Portfolio Website",
            "description": "Personal website",
            "date": "2023",
            "website": "www.portfolio.com"
          }
        ],
          "educations": [
            {
              "institute": "XYZ University",
              "areaofstudy": "Computer Science",
              "typeofstudy": "Bachelors",
              "dateRange": "2015-2019",
              "score": "3.8 GPA"
            }
          ],
            "certificates": [
              {
                "title": "AWS Certified",
                "awarder": "Amazon",
                "date": "2022",
                "link": "www.aws.com"
              }
            ],
              "experiences": [
                {
                  "company": "Tech Corp",
                  "position": "Software Engineer",
                  "dateRange": "2020-2024",
                  "location": "Remote",
                  "description": "Developed web applications"
                }
              ],
                "skills": [
                  {
                    "heading": "Frontend",
                    "items": "React, JavaScript"
                  },
                  {
                    "heading": "Backend",
                    "items": "Node.js, JavaScript, Mongodb"
                  }
                ],
                  "achievements": [
                    {
                      "name": "Hackathon Winner",
                      "details": "Won XYZ Hackathon"
                    }
                  ],
                    "languages": [
                      {
                        "heading": "English",
                        "option": "Fluent"
                      }
                    ]
      }
                    \ \ \
      `



      try {
        const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
        const response = await model.generateContent(prompt);
        const textResponse = response.response.candidates[0].content.parts[0].text;

        if (!textResponse) {
          return { message: "Empty response from Gemini API." };
        }
        console.log("response", textResponse)

        const regex = /```json([\s\S]*?)```/;
        const match = textResponse.match(regex);

        if (!match) {
          return { message: "No valid JSON output found in Gemini API response." };
        }
        console.log("match", match[1])
        const parsedJSON = JSON.parse(match[1]);
        setResumeData(parsedJSON)
        return parsedJSON;
      } catch (error) {
        setLoading(false);
        console.error("Error processing Gemini API response:", error);
        return { message: "Failed to process Gemini API response.", error: error.message };
      }
    }

    analyzeResumeForSkill()
    // setResumeData(sampleData);
    // fillResumeData(sampleData)
  }, [apiKey]);

  useEffect(() => {
    setResumeData(resumeData);
    fillResumeData(resumeData)
  }, [resumeData])

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @page {
        size: 250mm 350mm;
        margin: 10;
      }
      header, footer {
        display: none!important;
      }
      `,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/12 h-screen overflow-y-auto scrollbar-hidden print:hidden">
        <LeftSidebar />
      </div>

      <div
        ref={contentRef}
        className="w-[250mm] h-screen p-4 bg-gray-200 overflow-y-auto scrollbar-hidden print:h-auto print:p-0 print:w-[250mm] mx-auto"
      >
        <div className="resume-container w-full max-w-[250mm] bg-gray-200 mx-auto p-4 print:p-0 print:w-full">
          <SelectedTemplateComponent /> {/* Dynamically render selected template */}
        </div>
      </div>

      <div className="w-3/12 h-screen overflow-y-auto scrollbar-hidden print:hidden">
        <Rightsidebar />
        <button
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 print:hidden"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default CreateResume;
