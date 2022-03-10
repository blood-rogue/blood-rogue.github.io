import * as React from "react";

interface CtxMenuItem {
  name: string,
  onClick: () => void
}

const ContextMenu: React.FC<{ open: boolean, ev: MouseEvent, items?: CtxMenuItem[] }> = ({ open, ev, items }) => {
  const { clientX, clientY, pageY, pageX } = ev
  const { innerHeight: h, innerWidth: w } = window
  const ctxmenuRef = React.useRef<HTMLDivElement>(null)
  const [height, width] = ctxmenuRef.current ? [ctxmenuRef.current.clientHeight, ctxmenuRef.current.clientWidth] : [211, 160]
  const [dx, dy] = [width, height]
  const { px, py }: { px: number, py: number } = { px: ((dx + clientX) <= w) ? pageX : (pageX - dx), py: ((dy + clientY) <= h) ? pageY : (pageY - dy) }
  const menuItems: { name: string, onClick: () => void }[] = items || [
    { name: "item 1", onClick: () => console.log("item 1")},
    { name: "item 2", onClick: () => console.log("item 2")},
    { name: "item 3", onClick: () => console.log("item 3")},
    { name: "item 4", onClick: () => console.log("item 4")}
  ]
  return (
    <>{open && <div
      id="ctxmenu"
      ref={ctxmenuRef}
      className={`absolute ${open ? "flex__col" : "hidden"} ctx-menu__container`}
      style={{ top: `${py}px`, left: `${px}px` }}
    >
      {menuItems.map(({ name, onClick }, i) =>
      <div
        className="ctx-menu__item"
        key={i}
        onClick={onClick}
      >
        {name}
      </div>)
      }
    </div>}</>
  )
}

export default ContextMenu