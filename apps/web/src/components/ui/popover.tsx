import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "#/lib/utils.ts";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  );
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 z-50 flex w-72 origin-(--transform-origin) scale-100 flex-col gap-2.5 rounded-lg p-2.5 text-sm opacity-100 shadow-md ring-1 outline-hidden transition-[scale,opacity] duration-(--motion-duration-popover-enter) ease-(--motion-ease-out) data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-(--motion-duration-popover-exit) data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-(--motion-duration-reduced) motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
