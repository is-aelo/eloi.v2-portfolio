import { 
  PiHouseLight, 
  PiUserCircleLight, 
  PiBriefcaseLight, 
  PiShapesLight, 
  PiSunLight, 
  PiMoonLight,
  PiArrowRightLight, 
  PiArrowUpRightLight,
  PiArrowDownLight,
  PiArrowUpLight,
  PiEnvelopeLight,
  PiInstagramLogoLight,
  PiGithubLogoLight,
  PiLinkedinLogoLight,
  PiMapPinLight,
  PiTranslateLight,
  PiStudentLight,
  PiCaretDownLight
} from "react-icons/pi";

import { 
  SiAdobephotoshop, 
  SiFigma, 
  SiCanva, 
  SiAdobeillustrator, 
  SiAdobepremierepro,
  SiTailwindcss,
  SiNextdotjs,
  SiBehance,
  SiLaravel,
  SiMysql,
  SiDjango,
  SiBootstrap
} from "react-icons/si";

import { 
  FaLinkedin, 
  FaBehance 
} from "react-icons/fa6";

export const Icons = {
  // --- Navigation & UI ---
  home: PiHouseLight,
  about: PiUserCircleLight,
  work: PiBriefcaseLight, 
  design: PiShapesLight, 
  sun: PiSunLight,
  moon: PiMoonLight,
  arrowRight: PiArrowRightLight,
  arrowDown: PiArrowDownLight,
  arrowUp: PiArrowUpLight,
  external: PiArrowUpRightLight,
  location: PiMapPinLight,
  languages: PiTranslateLight,
  graduation: PiStudentLight,
  chevron: PiCaretDownLight,

  // --- Software & Design Tools ---
  figma: SiFigma,
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  canva: SiCanva,
  premiere: SiAdobepremierepro,

  // --- Web Development Stack ---
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  laravel: SiLaravel,
  django: SiDjango,
  mysql: SiMysql,
  bootstrap: SiBootstrap,

  // --- Socials & Contact ---
  email: PiEnvelopeLight,
  instagram: PiInstagramLogoLight,
  github: PiGithubLogoLight,
  linkedin: FaLinkedin,
  behance: FaBehance, 
};

export type IconKey = keyof typeof Icons;