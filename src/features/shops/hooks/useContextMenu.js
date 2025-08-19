import { useState, useRef } from "react";
import { UIManager, findNodeHandle, Dimensions } from "react-native";

export default function useContextMenu(menuWidth = 240, menuHeight = 260) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null);
  const iconRefs = useRef({});

  const openMenu = (item) => {
    const ref = iconRefs.current[item.id];
    if (!ref) return;
    const handle = findNodeHandle(ref);
    if (!handle) return;

    UIManager.measureInWindow(handle, (x, y, width, height) => {
      const screen = Dimensions.get("window");
      const spaceBelow = screen.height - (y + height);
      const spaceAbove = y;

      let top;
      if (spaceBelow >= menuHeight) top = y;
      else if (spaceAbove >= menuHeight) top = y - menuHeight;
      else top = Math.max(5, y - menuHeight / 2);

      let left = x - menuWidth;
      if (left < 10) left = 10;
      if (left + menuWidth > screen.width - 10) {
        left = screen.width - menuWidth - 10;
      }

      setPosition({ x: left, y: top });
      setSelectedItem(item);
      setVisible(true);
    });
  };

  return { visible, position, selectedItem, setVisible, openMenu, iconRefs };
}
