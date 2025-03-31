"use client";
import React,{useState} from "react";
import { auth } from "@/firebase/config";
import "./settings.css"
import DeleteAccountModal from "../../components/DeleteAccountModal";

const Settings = function () {
    let user = auth.currentUser;
    const [isModalOpen, setIsModalOpen] = useState(false);
    async function updateKey() {
        window.location.href = "/updategemini"


    }
    async function updateData() {
        window.location.href = "/updateresume"

    }
    async function deleteAccount() {
        window.location.href = "/deleteaccount"

    }
    async function handleLogout() {
        try {
            await auth.signOut();
            localStorage.clear()
            window.location.href = "/sign-in";
            // console.log("User logged out successfully!");
            //Event Listner
            function notifyExtensionOnLogout(key) {
                const event = new CustomEvent('onLogout');
                document.dispatchEvent(event);
            }

            // Call this function after successful login
            notifyExtensionOnLogout();  // userUID is the UID of the logged-in user


        } catch (error) {
            console.error("Error logging out:", error.message);
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#11011E] via-[#35013e] to-[#11011E] bg-[#11011E]p-4">
            <div className="w-full max-w-md bg-[#FFFFFF05] border-[1px] border-white rounded-lg shadow-md p-6">
                <h1 className="text-center text-2xl font-bold text-white mb-6">
                    Settings
                </h1>

                {/* Setting Options */}
                <div className="space-y-4">
                    {/* Update Gemini Key */}
                    <div className="flex justify-between items-center border-[1px] border-white rounded-lg px-4 py-3">
                        <span className="text-white font-medium">Update Gemini Key</span>
                        <button className="bg-primary hover:bg-teal-400 text-white text-sm font-medium px-4 py-1 rounded-md transition" onClick={updateKey}>
                            Update Key
                        </button>
                    </div>

                    {/* Update Data */}
                    <div className="flex justify-between items-center border-[1px] border-white rounded-lg px-4 py-3">
                        <span className="text-white font-medium">Update Data</span>
                        <button className="bg-primary hover:bg-teal-400 text-white text-sm font-medium px-4 py-1 rounded-md transition" onClick={updateData}>
                            Update Data
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex justify-between items-center border-[1px] border-white rounded-lg px-4 py-3">
                        <span className="text-white font-medium">Delete Account</span>
                        <button onClick={() => setIsModalOpen(true)}
                            className="bg-red-500 hover:bg-red-400 text-white text-sm font-medium px-4 py-1 rounded-md transition">
                            Delete Account
                        </button>
                        {isModalOpen && (
                            <DeleteAccountModal onClose={() => setIsModalOpen(false)} />
                        )}
                    </div>

                    {/* Logout */}
                    <div className="flex justify-between items-center border-[1px] border-white rounded-lg px-4 py-3">
                        <span className="text-white font-medium">Log Out</span>
                        <button className="bg-primary hover:bg-teal-400 text-white text-sm font-medium px-4 py-1 rounded-md transition" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;