import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  href: string
  result?: string
  className?: string
}

export function ProjectCard({ title, description, image, tags, href, result, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border bg-background-card",
        "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {result && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground font-semibold">{result}</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <Link
            href={href}
            className="shrink-0 w-8 h-8 rounded-md bg-primary-ice flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={`Voir le projet ${title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal text-foreground-muted border-border">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
