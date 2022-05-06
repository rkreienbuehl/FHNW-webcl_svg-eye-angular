import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'svg-eye',
  templateUrl: './svg-eye.component.html',
  styleUrls: ['./svg-eye.component.css'],
})
export class SvgEyeComponent implements OnInit {
  @Input() posTop = '0px'
  @Input() posLeft = '0px'

  @ViewChild('iris') iris: ElementRef | undefined
  @ViewChild('closeLid') closeLid: ElementRef | undefined

  private rect: DOMRect = new DOMRect()

  private xo = 0
  private yo = 0

  constructor() {}

  ngOnInit(): void {
    setInterval((evt: Event) => {
      if (this.closeLid) {
        if (this.closeLid.nativeElement.style.opacity === '1') return // do not close and then open if already closed
        this.closeLid.nativeElement.style.opacity = '1'
        setTimeout((evt: Event) => {
          if (this.closeLid) this.closeLid.nativeElement.style.opacity = '0'
        }, 300)
      }
    }, 7 * 1000)
  }

  ngAfterViewInit(): void {
    if (this.closeLid) {
      this.closeLid.nativeElement.style.opacity = '0'
    }

    if (this.iris) {
      this.rect = this.iris.nativeElement.children[0].getBoundingClientRect()

      this.xo = this.rect.x + this.rect.width / 2 // x-origin
      this.yo = this.rect.y + this.rect.height / 2 // y-origin
    }
  }

  changeLidState() {
    if (this.closeLid)
      this.closeLid.nativeElement.style.opacity =
        this.closeLid.nativeElement.style.opacity === '1' ? '0' : 1
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const xm = e.clientX - this.xo // the normalized x/y coords to work with
    const ym = e.clientY - this.yo

    const xmax = this.rect.width / 1.5
    const ymax = this.rect.height / 2

    const widestFocus = 400 // when x is so far away, the eye is maximal extended
    const scaledX = xm * (xmax / widestFocus)
    let xe = xm > 0 ? Math.min(xmax, scaledX) : Math.max(-xmax, scaledX)
    const scaledY = ym * (ymax / widestFocus)
    let ye = ym > 0 ? Math.min(ymax, scaledY) : Math.max(-ymax, scaledY)
    if (xe * xe + ye * ye > xmax * ymax) {
      xe *= 0.9
      ye *= 0.9
    }
    if (this.iris)
      this.iris.nativeElement.style.transform = `translateX(${xe}px) translateY(${ye}px)`
  }
}
