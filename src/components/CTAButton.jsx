export default function CTAButton({
  children,
  onClick,
  href,
  type = "button",
  size = "lg",
  variant = "pink",
  className = "",
}) {
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-lg sm:text-xl" : "px-6 py-3 text-base";

  const variantClasses =
    variant === "pink"
      ? "bg-pink text-white"
      : variant === "whatsapp"
        ? "bg-[#25D366] text-white"
        : "bg-ink text-cream";

  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink font-display ${sizeClasses} ${variantClasses} shadow-doodle transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:shadow-doodle-lg active:translate-y-0 active:scale-[0.98] active:shadow-doodle focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/30 ${className}`}
    >
      {children}
    </Tag>
  );
}
