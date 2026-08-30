import type { InputHTMLAttributes } from "react";
import { Divider } from "./Divider";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    prefix?: string
    suffix?: string
}


export function Input({prefix, suffix, ...rest}: InputProps) {
    return (
        <div className="bg-input flex items-center rouded-2xl p-4 shadows-[4px_4px_18px_0px_rgba(0, 0, 0, 0.2)]">
            {prefix  && (
                <>
                    <span className="text-muted-foregroudn text-sm font-medium">
                        {prefix}
                    </span>
                    <Divider orientation="vertical" />
                </>
            )}
            <input className="text-foreground placeholder:text-muted-foreground w-full bg-trasnparent text-sm outline-none" type="text" autoFocus {...rest} />
            {suffix && (
                <>
                    <Divider orientation="vertical" />
                    <span className="text-muted-foregroudn text-sm font-medium">
                        {suffix}
                    </span>
                </>
            )}
        </div>
    )
}