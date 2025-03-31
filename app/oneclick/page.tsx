import {
    usePersonalDataStore,
    useProjectStore,
    useEducationStore,
    useCertificateStore,
    useExperienceStore,
    useSkillStore,
    useAchievementStore,
    useLanguageStore,
  } from "../store"; // Update path accordingly
  
  const fillResumeData = (data: any) => {
    if (!data) return;
  
    const { updatePersonalData } = usePersonalDataStore.getState();
    const { addProject } = useProjectStore.getState();
    const { addEducation } = useEducationStore.getState();
    const { addCertificate } = useCertificateStore.getState();
    const { addExperience } = useExperienceStore.getState();
    const { addSkill } = useSkillStore.getState();
    const { addAchievement } = useAchievementStore.getState();
    const { addLanguage } = useLanguageStore.getState();
  
    // Update personal details
    Object.entries(data.personalData || {}).forEach(([key, value]) => {
      updatePersonalData(key, value as string);
    });
  
    // Add projects
    data.projects?.forEach((project: any) => {
      addProject(project.name, project.description, project.website, project.date);
    });
  
    // Add educations
    data.educations?.forEach((education: any) => {
      addEducation(
        education.institute,
        education.areaofstudy,
        education.typeofstudy,
        education.dateRange,
        education.score
      );
    });
  
    // Add certificates
    data.certificates?.forEach((certificate: any) => {
      addCertificate(certificate.title, certificate.awarder, certificate.date, certificate.link);
    });
  
    // Add experiences
    data.experiences?.forEach((experience: any) => {
      addExperience(
        experience.company,
        experience.position,
        experience.dateRange,
        experience.location,
        experience.description
      );
    });
  
    // Add skills
    data.skills?.forEach((skill: any) => {
      addSkill(skill.heading, skill.items);
    });
  
    // Add achievements
    data.achievements?.forEach((achievement: any) => {
      addAchievement(achievement.name, achievement.details);
    });
  
    // Add languages
    data.languages?.forEach((language: any) => {
      addLanguage(language.heading, language.option);
    });
  
    console.log("Resume data filled successfully!");
  };
  
  export default fillResumeData;
  