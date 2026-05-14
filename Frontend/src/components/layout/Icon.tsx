import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export const AllIcons = { ...SolidIcons, ...BrandIcons };

type IconProps = {
  name: keyof typeof AllIcons;
  className?: string;
  size?: SizeProp;
}

export const Icon = ({ name, className, size }: IconProps) => {
  const iconData = AllIcons[name] as IconProp; 
  
  return <FontAwesomeIcon icon={iconData} className={className} size={size} />;
};