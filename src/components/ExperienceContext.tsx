import { createContext, Dispatch, SetStateAction } from "react";

interface ExperienceContextType {
    experience: boolean;
    setExperience: Dispatch<SetStateAction<boolean>>;
};

export const ExperienceContext = createContext<ExperienceContextType>({
    experience: false,
    setExperience: () => {}
});