import { createContext, Dispatch, SetStateAction } from 'react';

interface JourneyContextType {
  experience: string;
  setExperience: Dispatch<SetStateAction<string>>;
}

export const JourneyContext = createContext<JourneyContextType>({
  experience: '',
  setExperience: () => {}
});
