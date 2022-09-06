import { gsap } from 'gsap'

export default class ImgReveal {
  constructor(el) {
    this.DOM = {
      el: el,
      outerImages: el,
      innerImages: el.querySelectorAll('img')
    }
  }
  in() {
    gsap.killTweensOf([this.DOM.innerImages, this.DOM.outerImages])
    return gsap
      .timeline({ defaults: { duration: 1.2, ease: 'expo' } })

      .set(this.DOM.innerImages, {
        y: '-101%'
      })
      .set(this.DOM.outerImages, {
        y: '101%'
      })
      .to([this.DOM.innerImages, this.DOM.outerImages], {
        y: '0%'
      })
  }
  out() {
    gsap.killTweensOf([this.DOM.innerImages, this.DOM.outerImages])
    return gsap
      .timeline({ defaults: { duration: 0.7, ease: 'power2' } })
      .to([this.DOM.innerImages], {
        y: '101%'
      })
      .to(
        [this.DOM.outerImages],
        {
          y: '-101%'
        },
        0
      )
  }
}
