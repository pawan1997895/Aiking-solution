"use client";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import React, { useState, useEffect } from "react";
import app, { auth } from "@/firebase/config";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const GeminiPage = () => {
    let gemini_key = localStorage.getItem("api_key");
    const GEMINI_API_KEY = gemini_key;
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState("");
    const [urd,setUrd] = useState("")
    const auth = getAuth()
    const db = getDatabase(app)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                console.error("No user logged in!");
                toast.error("No user logged in!");
                window.location.href = "./sign-in";
            }
        });
    
        return () => unsubscribe(); // Cleanup listener
    }, []);

    useEffect(()=>{
        async function getUserData(){
        const userRef = ref(db, "user/" + uid +"/"+"forms/"+"keyvalues/"+"URD");
            // console.log(country,)
             await get(userRef).then(async (snapshot) => {
                setUrd(snapshot.val())

            }).catch((err)=>{
                toast.error(err.message);
                return
            })
        }
        getUserData()

    },[uid])
    

    useEffect(() => {
        async function fetchGeminiResponse() {
            setLoading(true);
            console.log(uid)
            try {
                const resumeData = urd;
                console.log(resumeData)

                const exampleOutput = `[
                    {
                        "jobTitle": "Python Developer",
                        "location": "remote",
                        "experience": "2-5"
                    },
                    {
                        "jobTitle": "Backend Developer",
                        "location": "remote",
                        "experience": "2-5"
                    },
                    {
                        "jobTitle": "Full Stack Developer",
                        "location": "remote",
                        "experience": "2-5"
                    },
                    {
                        "jobTitle": "MERN Stack Developer",
                        "location": "remote",
                        "experience": "2-5"
                    },
                    {
                        "jobTitle": "Software Engineer",
                        "location": "remote",
                        "experience": "2-5"
                    }
                ]`;

                const userPrompt = `Analyze the following resume and extract suitable job titles, preferred location, and estimated experience range.
                Ensure the response is a valid JSON array following this format:

                \`\`\`json
                [
                    {
                        "jobTitle": "<Job Title>",
                        "location": "<Preferred Location>",
                        "experience": "<Experience Range in Years>"
                    }
                ]
                \`\`\`

                Resume:
                ${resumeData}

                Guidelines:
                - Identify relevant job titles based on skills, experience, and education.
                - Keep the location as "remote" unless a specific location is mentioned.
                - Estimate the experience range in years.
                - Provide at least five job titles.

                Example Output:
                \`\`\`json
                ${exampleOutput}
                \`\`\`
                `;

                const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const response = await model.generateContent(userPrompt);
                const textResponse = await response.response.text();

                // Extract JSON from the response
                const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/);
                const jsonOutput = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(textResponse);

                console.log("✅ Gemini Parsed Response:", jsonOutput);
                setJsonData(jsonOutput);
            } catch (error) {
                console.error("❌ Error in fetchGeminiResponse:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchGeminiResponse();
    }, [urd]); // Empty dependency array ensures it runs once on mount

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : jsonData ? (
                <div>
                    <h2>Suggested Jobs</h2>
                    <ul>
                        {jsonData.map((job, index) => (
                            <li key={index}>
                                <strong>{job.jobTitle}</strong> - {job.location} (Experience: {job.experience} years)
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default GeminiPage;
