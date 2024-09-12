import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface GameDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameDrawer: React.FC<GameDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Game Instructions</DrawerTitle>
          <DrawerDescription>
            Press space to start the game or click the button below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col justify-center items-center">
          <p className="mt-4">
            Use arrow keys to move the drone. Press space to start the game.
          </p>
        </div>
        <DrawerFooter>
          <Button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Start Game
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameDrawer;
