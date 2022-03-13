import * as React from "react";

interface CtxMenuItem {
  item: string | JSX.Element,
  onClick: () => void
}

const ContextMenu: React.FC<{ open: boolean, ev: MouseEvent, items?: CtxMenuItem[] }> = ({ open, ev, items }) => {
  const { clientX, clientY, pageY, pageX } = ev
  const { innerHeight: h, innerWidth: w } = window
  const ctxmenuRef = React.useRef<HTMLDivElement>(null)
  const [height, width] = ctxmenuRef.current ? [ctxmenuRef.current.clientHeight, ctxmenuRef.current.clientWidth] : [211, 160]
  const [dx, dy] = [width, height]
  const { px, py }: { px: number, py: number } = { px: ((dx + clientX) <= w) ? pageX : (pageX - dx), py: ((dy + clientY) <= h) ? pageY : (pageY - dy) }
  const menuItems: CtxMenuItem[] = items || [
    { item: "item 1", onClick: () => console.log("item 1")},
    { item: "item 2", onClick: () => console.log("item 2")},
    { item: "item 3", onClick: () => console.log("item 3")},
    { item: "item 4", onClick: () => console.log("item 4")}
  ]
  return (
    <>{open && <div
      id="ctxmenu"
      ref={ctxmenuRef}
      className={`absolute ${open ? "flex__col" : "hidden"} ctx-menu__container`}
      style={{ top: `${py}px`, left: `${px}px` }}
    >
      {menuItems.map(({ item, onClick }, i) =>
      <div
        className="ctx-menu__item"
        key={i}
        onClick={onClick}
      >
        {item}
      </div>)
      }
    </div>}</>
  )
}

export default ContextMenu