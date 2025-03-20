import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 動畫管理器
export const useAnimations = () => {
  const animationManager = {
    animations: new Map(),

    register(name, animation) {
      this.animations.set(name, animation)
    },

    play(name) {
      const animation = this.animations.get(name)
      if (animation) {
        requestAnimationFrame(() => animation())
      }
    },

    clear() {
      this.animations.clear()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    },
  }

  const initializeHeroAnimations = () => {
    // 首頁標題動畫
    animationManager.register('heroContent', () => {
      const tl = gsap.timeline()
      tl.from('.index__hero-content-text span, .index__hero-content-text p', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
      })
        .from(
          '.index__search-filters',
          {
            opacity: 0,
            duration: 1,
            y: 50,
            ease: 'power2.out',
          },
          '-=0.8',
        )
        .from(
          '.index__search-bar',
          {
            opacity: 0,
            duration: 1,
            y: 50,
            ease: 'power2.out',
          },
          '-=0.8',
        )
    })
  }

  const initializeScrollAnimations = () => {
    // 最新揪團區塊動畫
    ScrollTrigger.create({
      trigger: '.index__groups-latest',
      start: '-80% center',
      markers: false,
      once: true,
      onEnter: () => {
        // 第一區塊動畫
        const groupTl = gsap.timeline()

        groupTl
          .from('.index__groups-latest-title', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          })
          .from(
            '.index__groups-latest-content-card',
            {
              x: -100,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.2,
            },
            '-=0.5',
          )
          .from(
            '.index__groups-latest-content-button',
            {
              x: -100,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
            },
            '-=0.5',
          )
      },
    })

    // 即將到來區塊動畫
    ScrollTrigger.create({
      trigger: '.index__groups-upcoming',
      start: '5% center',
      markers: false,
      once: true,
      onEnter: () => {
        const groupTl2 = gsap.timeline()

        groupTl2
          .from('.index__groups-upcoming-title', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          })
          .from(
            '.index__groups-upcoming-content-card',
            {
              x: 100,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.2,
            },
            '-=0.5',
          )
          .from(
            '.index__groups-upcoming-content-button',
            {
              x: 100,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
            },
            '-=0.5',
          )
      },
    })

    // 說明區塊動畫
    ScrollTrigger.create({
      trigger: '.index__introduction',
      start: 'center center',
      markers: false,
      once: true,
      onEnter: () => {
        const cardTl = gsap.timeline()
        cardTl
          .from('.index__introduction-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          })
          .from(
            '.index__introduction-card-left',
            {
              scale: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.5',
          )
          .from(
            '.index__introduction-card-right',
            {
              scale: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.5',
          )
      },
    })

    // 步驟區塊動畫
    ScrollTrigger.create({
      trigger: '.index__steps',
      start: '31% center',
      markers: false,
      once: true,
      onEnter: () => {
        const cardTl = gsap.timeline()
        cardTl
          .from('.index__steps-content', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          })
          .from(
            '.index__steps-img',
            {
              x: 100,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
            },
            '-=0.5',
          )
      },
    })
  }

  return {
    animationManager,
    initializeHeroAnimations,
    initializeScrollAnimations,
  }
}
