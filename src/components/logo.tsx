import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
      {...props}
    >
      <path d="M12 22v-5" />
      <path d="M12 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
      <path d="M12 7V2" />
      <path d="M6.34 11.66 4 14" />
      <path d="m4.5 9.5-1-1" />
      <path d="M17.66 11.66 20 14" />
      <path d="m19.5 9.5 1-1" />
      <path d="M7 15h10" />
    </svg>
  )
}
