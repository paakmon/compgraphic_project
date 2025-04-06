import { UploadButton } from "./UploadButton";
import { Instructions } from "./Instructions";
import { Divider } from "./Divider";
import { Glossy } from "./Glossy";
import Outline from "./Outline";
import { ColorFilter } from "./ColorFilter";
import { BackgroundColor } from "./BackgroundColor";

type SideBarProps = {
  setBgColor: (color: string) => void;
};

export default function SideBar({ setBgColor }: SideBarProps) {
  return (
    <div
      className="fixed left-0 top-0 flex h-full 
      w-72 flex-col items-center bg-white px-5 py-10 shadow-lg"
    >
      <UploadButton/>
      <Instructions/>
      <Divider/>
      <div className="flex flex-col items-start w-full gap-2">
        <Glossy />
        <Outline />
        <ColorFilter />
      </div>
      <div className="mt-auto">
        <Divider />
        <BackgroundColor setBgColor={setBgColor}/>
      </div>
    </div>
  );
}