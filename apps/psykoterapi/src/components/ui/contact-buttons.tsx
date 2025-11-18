import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Paragraph } from "@/components/ui/typography";
import { useTouch } from "@/contexts/touch-context";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

function ContactButtons({ contactEmail, contactButtonText, copyEmailTooltipText, className, isHamburgerMenuOpen }: { contactEmail: string; contactButtonText: string; copyEmailTooltipText: string; className?: string; isHamburgerMenuOpen?: boolean }) {
  const [copied, setCopied] = useState(false);
  const isTouch = useTouch();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  // Only apply tabIndex logic when isHamburgerMenuOpen is provided (used in navigation)
  // When undefined (used outside navigation), buttons are always focusable
  const tabIndex = isHamburgerMenuOpen !== undefined ? (isHamburgerMenuOpen ? undefined : -1) : undefined;

  const copyButton = (
    <Button variant="icon" onClick={handleCopy} className="relative flex place-items-center focus-visible:outline-light" aria-label={copied ? "E-mail kopieret" : "Kopier e-mail"} tabIndex={tabIndex}>
      <span className="relative inline-flex items-center justify-center w-16 h-16">
        <CopyIcon
          size={16}
          className={cn(
            "absolute inset-0 m-auto transition-all duration-300",
            copied ? "opacity-0 blur-sm scale-95" : "opacity-100 blur-0 scale-100",
          )}
        />
        <CheckIcon
          size={16}
          className={cn(
            "absolute inset-0 m-auto transition-all duration-300",
            copied ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-95",
          )}
        />
      </span>
    </Button>
  );

  return (
    <div className="flex items-center gap-8">
      <Button size="small" variant="secondary" href={`mailto:${contactEmail}`} className={cn("w-full focus-visible:outline-light whitespace-nowrap", tabIndex !== undefined && "tabindex-0", className)} tabIndex={tabIndex}>{contactButtonText}</Button>
      {isTouch === true
        ? (
            copyButton
          )
        : (
            <Tooltip>
              <TooltipTrigger asChild className="flex place-items-center">
                {copyButton}
              </TooltipTrigger>
              <TooltipContent>
                <Paragraph className="text-xs">{copyEmailTooltipText}</Paragraph>
              </TooltipContent>
            </Tooltip>
          )}
    </div>
  );
}

export default ContactButtons;
