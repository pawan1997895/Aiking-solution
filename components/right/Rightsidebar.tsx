"use client";
import React, { useEffect, useState } from "react";
import "./scroll.css";
import { useThemeStore } from "@/app/store";
const RightSidebar: React.FC = () => {
  // State management
  // const [selectedFont, setSelectedFont] = useState<string>('Open Sans');
  // const [fontSize, setFontSize] = useState<number>(14.2);
  // const [lineHeight, setLineHeight] = useState<number>(1.5);
  // const [hideIcons, setHideIcons] = useState<boolean>(false);
  // const [underlineLinks, setUnderlineLinks] = useState<boolean>(true);
  // const [primaryColor, setPrimaryColor] = useState<string>('#dc2626');
  // const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  const {
    primaryColor,
    setPrimaryColor,
    backgroundColor,
    setBackgroundColor,
    selectedFont,
    setSelectedFont,
    fontWeight,
    setFontWeight,
    fontStyle,
    setFontStyle,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    hideIcons,
    setHideIcons,
    underlineLinks,
    setUnderlineLinks,
    selectedTemplate, // Add selectedTemplate
    setSelectedTemplate, // Add setter
  } = useThemeStore();

  const [fontSubset, setFontSubset] = useState<string>("latin");

  // Resume templates with image URLs (replace with actual image paths or URLs)
  const resumeTemplates = [
    { name: "bonzor", image: "/images/bonzor.png" },
    { name: "luxary", image: "/images/luxary.png" },
    { name: "unique", image: "/images/unique.png" },
    { name: "new resume", image: "/images/newResume.png" },
  ];

  // Font options
  const fonts = [
    "Arial",
    "Cambria",
    "Garamond",
    "IBM Plex Sans",
    "IBM Plex Serif",
    "Lato",
    "Lora",
    "Merriweather",
    "Open Sans",
    "Playfair Display",
    "PT Sans",
    "PT Serif",
    "Roboto Condensed",
    "Times New Roman",
  ];

  // Theme colors
  const themeColors = [
    "#1f2937",
    "#4b5563",
    "#dc2626",
    "#ea580c",
    "#d97706",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#2563eb",
    "#4f46e5",
    "#7c3aed",
    "#9333ea",
    "#c026d3",
    "#db2777",
  ];

  // Common slider styles
  const sliderStyles = `
        w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:transition-all
        [&::-webkit-slider-thumb]:duration-150
        [&::-webkit-slider-thumb]:hover:w-5
        [&::-webkit-slider-thumb]:hover:h-5
        [&::-webkit-slider-thumb]:hover:bg-blue-400
        [&::-webkit-slider-thumb]:active:scale-95
        
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-none
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:transition-all
        [&::-moz-range-thumb]:duration-150
        [&::-moz-range-thumb]:hover:w-5
        [&::-moz-range-thumb]:hover:h-5
        [&::-moz-range-thumb]:hover:bg-blue-400
        [&::-moz-range-thumb]:active:scale-95
        
        [&::-ms-thumb]:appearance-none
        [&::-ms-thumb]:w-4
        [&::-ms-thumb]:h-4
        [&::-ms-thumb]:bg-white
        [&::-ms-thumb]:rounded-full
        [&::-ms-thumb]:transition-all
        [&::-ms-thumb]:duration-150
        [&::-ms-thumb]:hover:w-5
        [&::-ms-thumb]:hover:h-5
        [&::-ms-thumb]:hover:bg-blue-400
        [&::-ms-thumb]:active:scale-95
      `;

  useEffect(() => {
    document.documentElement.style.setProperty("--selected-font", selectedFont);
    const systemFonts = ["Arial", "Cambria", "Garamond", "Times New Roman"];
    if (systemFonts.includes(selectedFont)) {
      return; // No need to load Google Fonts for system fonts
    }

    // Remove existing font links
    const existingLinks = document.querySelectorAll("link[data-font]");
    existingLinks.forEach((link) => link.remove());

    // Construct the Google Fonts URL with font weight, style, and subset
    const fontName = selectedFont.replace(" ", "+");
    const weights = [fontWeight]; // You can add more weights if needed, e.g., [400, 700]
    const styles = fontStyle === "italic" ? "ital" : "reg"; // Google Fonts uses 'ital' for italic

    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:${styles},wght@${weights.join(
      ";"
    )}&display=swap`;

    // Create and append the <link> tag
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    link.setAttribute("data-font", fontName);
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      link.remove();
    };
  }, [selectedFont, fontWeight, fontStyle]); // Add dependencies

  useEffect(() => {
    // Skip dynamic loading for system fonts
    const systemFonts = ["Arial", "Cambria", "Garamond", "Times New Roman"];
    if (systemFonts.includes(selectedFont)) {
      return;
    }

    // Remove any existing font links to avoid duplicates
    const existingLinks = document.querySelectorAll("link[data-font]");
    existingLinks.forEach((link) => link.remove());

    // Construct the Google Fonts URL with the selected subset
    const fontName = selectedFont.replace(" ", "+");
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,400;0,700;1,400;1,700&subset=${fontSubset}&display=swap`;

    // Create and append the <link> tag
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    link.setAttribute("data-font", fontName); // Mark the link for cleanup
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      link.remove();
    };
  }, [selectedFont, fontSubset]);

  return (
    <div className="p-6 w-full max-w-[450px] bg-black text-white border-l border-gray-300">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Job Description</h2>
        <textarea
          placeholder="Enter job description here..."
          className="w-full p-2 border border-gray-300 rounded-md bg-black text-white h-32 resize-none focus:border-white focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Resume Templates</h2>
        <div className="grid grid-cols-2 gap-6">
          {resumeTemplates.map((template) => (
            <div
              key={template.name}
              onClick={() => setSelectedTemplate(template.name.toLowerCase())}
              className={`relative cursor-pointer p-1 border rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:scale-105 ${
                selectedTemplate === template.name.toLowerCase()
                  ? "border-2 border-white bg-gray-800 shadow-lg"
                  : "border-gray-300"
              }`}
            >
              {/* Resume Image */}
              <img
                src={template.image}
                alt={`${template.name} preview`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300"
              />

              {/* Overlay with template name */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-white text-lg font-semibold">
                  {template.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Typography</h2>

      {/* Font Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {fonts.map((font) => (
          <button
            key={font}
            onClick={() => setSelectedFont(font)}
            className={`text-sm p-2 border rounded-md transition-colors duration-200
                  ${
                    selectedFont === font
                      ? "border-white font-bold bg-gray-800"
                      : "border-gray-300 hover:border-white hover:bg-gray-900"
                  }`}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>

      {/* Font Family */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Font Family</h3>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-black text-white hover:border-white focus:border-white focus:outline-none transition-colors duration-200"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Subset */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Font Subset</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md bg-black text-white hover:border-white focus:border-white focus:outline-none transition-colors duration-200"
          value={fontSubset}
          onChange={(e) => setFontSubset(e.target.value)}
        >
          <option value="latin">Latin</option>
          <option value="cyrillic">Cyrillic</option>
          <option value="greek">Greek</option>
        </select>
      </div>

      {/* Font Variants */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Font Variants</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md bg-black text-white hover:border-white focus:border-white focus:outline-none transition-colors duration-200"
          value={
            fontStyle === "italic"
              ? "italic"
              : fontWeight === 700
              ? "bold"
              : "regular"
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value === "italic") {
              setFontStyle("italic");
              setFontWeight(400); // Regular weight with italic
            } else if (value === "bold") {
              setFontStyle("normal");
              setFontWeight(700);
            } else {
              setFontStyle("normal");
              setFontWeight(400);
            }
          }}
        >
          <option value="regular">Regular</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
        </select>
      </div>

      {/* Font Size */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Font Size</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <input
              type="range"
              min="8"
              max="24"
              step="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className={sliderStyles}
            />
          </div>
          <span className="min-w-[3ch]">{fontSize}</span>
        </div>
      </div>

      {/* Line Height */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Line Height</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className={sliderStyles}
            />
          </div>
          <span className="min-w-[3ch]">{lineHeight}</span>
        </div>
      </div>

      {/* Options */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Options</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Hide Icons</span>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                hideIcons ? "bg-white" : "bg-gray-700"
              }`}
              onClick={() => setHideIcons(!hideIcons)}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  hideIcons ? "bg-black transform translate-x-6" : "bg-white"
                }`}
              />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Underline Links</span>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                underlineLinks ? "bg-white" : "bg-gray-700"
              }`}
              onClick={() => setUnderlineLinks(!underlineLinks)}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  underlineLinks
                    ? "bg-black transform translate-x-6"
                    : "bg-white"
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Theme */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Theme</h2>
        <div className="grid grid-cols-9 gap-2 mb-4">
          {themeColors.map((color) => (
            <button
              key={color}
              onClick={() => setPrimaryColor(color)}
              className={`w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 ${
                primaryColor === color
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                  : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Color Inputs */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Primary Color</h3>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-black text-white hover:border-white focus:border-white focus:outline-none transition-colors duration-200"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Background Color</h3>
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-black text-white hover:border-white focus:border-white focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
