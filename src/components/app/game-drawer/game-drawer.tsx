import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  SquareArrowDown,
  SquareArrowUp,
  SquareArrowLeft,
  SquareArrowRight,
} from "lucide-react";

interface GameDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameDrawer: React.FC<GameDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen}>
      <DrawerContent className="bg-black">
        <DrawerHeader>
          <DrawerTitle>Game Instructions</DrawerTitle>
          <DrawerDescription>
            Press space to start the game or click the button below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col justify-center items-center">
          <p className="mt-4 text-lg font-semibold">Controls</p>
          <div className="flex items-center mt-4 gap-6">
            <div className="min-w-[340px] flex items-center flex-col">
              <div className="flex flex-col items-center relative space-y-1">
                <span className="text-sm">Decrease drone speed</span>
                <div className="w-[1px] h-3 bg-white/80" />
                <SquareArrowUp />
              </div>
              <div className="flex items-center space-x-1 w-full">
                <span className="text-sm min-w-[113px] text-right">
                  Move drone left
                </span>
                <div className="w-3 h-[1px] bg-white/80" />
                <div className="flex">
                  <SquareArrowLeft />
                  <SquareArrowDown />
                  <SquareArrowRight />
                </div>
                <div className="w-3 h-[1px] bg-white/80" />
                <span className="text-sm min-w-[113px]">Move drone right</span>
              </div>
              <div className="w-[1px] h-3 bg-white/80 my-[1px]" />
              <span className="text-sm">Increase drone speed</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-white text-black rounded-lg"
          >
            Start Game
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameDrawer;
