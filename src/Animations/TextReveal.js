import { gsap } from 'gsap'

export class TextReveal {
  constructor(el) {
    this.DOM = {
      outer: el,
      inner: Array.isArray(el)
        ? el.map(outer => outer.querySelector('.inner_text'))
        : el.querySelector('.inner_text'),
      line: Array.isArray(el)
        ? el.map(outer => outer.querySelector('.line'))
        : el.querySelector('.line')
    }
  }
  in() {
    if (this.outTimeline && this.outTimeline.isActive()) {
      this.outTimeline.kill()
    }

    this.inTimeline = gsap
      .timeline({ defaults: { duration: 1.2, ease: 'expo' } })
      .set(this.DOM.outer, {
        pointerEvents: 'all'
      })
      .set(this.DOM.inner, {
        y: '150%',
        rotate: 15
      })
      .to(
        this.DOM.inner,
        {
          y: '0%',
          rotate: 0,
          stagger: 0.03
        },
        'start'
      )
      .to(
        this.DOM.line,
        {
          width: '100%'
        },
        'start'
      )
    return this.inTimeline
  }
  out() {
    if (this.inTimeline && this.inTimeline.isActive()) {
      this.inTimeline.kill()
    }

    this.outTimeline = gsap
      .timeline({ defaults: { duration: 0.7, ease: 'power2' } })
      .set(this.DOM.outer, {
        pointerEvents: 'none'
      })
      .to(
        this.DOM.line,
        {
          width: '0%',
          duration: 0.2
        },
        'start'
      )
      .to(
        this.DOM.inner,
        {
          y: '-150%',
          rotate: -5,
          stagger: 0.03
        },
        'start'
      )
    return this.outTimeline
  }
}
