import { createContext, Dispatch, SetStateAction } from "react";

interface ExperienceContextType {
    experience: string;
    setExperience: Dispatch<SetStateAction<string>>;
};

export const ExperienceContext = createContext<ExperienceContextType>({
    experience: '',
    setExperience: () => {}
});