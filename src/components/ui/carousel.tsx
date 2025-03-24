import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn-button"

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: any
  slides: React.ReactNode[]
  className?: string
}

const Carousel = ({ opts, slides, className }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts)

  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev())
      setNextBtnEnabled(emblaApi.canScrollNext())
    })
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden">
        <div className="flex" ref={emblaRef}>
          <div className="flex touch-pan-y gap-2">
            {slides.map((slide, index) => (
              <div key={index} className="relative min-w-full">
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

export { Carousel }
