'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import ProjectVersionBanner from '../components/ProjectVersionBanner';
import './gsap.css';

export default function GsapDemo() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const colors = ['#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#FFEBEE'];

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-panel').forEach((panel, i) => {
        panel.style.backgroundColor = colors[i];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            scrub: true,
            pin: true,
            start: 'top top',
            end: '+=100%'
          }
        });
        tl.from(panel.querySelector('p'), { scale: 0.3, rotation: 45, autoAlpha: 0, ease: 'power2' })
          .from(panel.querySelector('.line'), { scaleX: 0, transformOrigin: 'left center', ease: 'none' }, 0)
          .to(panel, { backgroundColor: colors[i + 1] }, 0);
      });

      const links = gsap.utils.toArray<HTMLAnchorElement>('nav.gsap-nav a');
      links.forEach((a) => {
        const element = document.querySelector<HTMLElement>(a.getAttribute('href')!);
        const linkST = ScrollTrigger.create({
          trigger: element,
          start: 'top top'
        });
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(a)
        });
        a.addEventListener('click', (e) => {
          e.preventDefault();
          gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: 'auto' });
        });
      });

      function setActive(link: HTMLAnchorElement) {
        links.forEach((el) => el.classList.remove('active'));
        link.classList.add('active');
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ProjectVersionBanner className="mx-auto mb-6 mt-4 max-w-3xl" />
      <div id="panel-1" className="gsap-panel">
        <span className="line"></span>
        <p>Pastel panels animate as you scroll.</p>
      </div>
      <div id="panel-2" className="gsap-panel">
        <span className="line"></span>
        <p>Each section pins and transitions colors smoothly.</p>
      </div>
      <div id="panel-3" className="gsap-panel">
        <span className="line"></span>
        <p>Animations are powered by GSAP ScrollTrigger.</p>
      </div>
      <div id="panel-4" className="gsap-panel">
        <span className="line"></span>
        <p>Navigation links stay synced with scroll position.</p>
      </div>
      <div id="panel-5" className="gsap-panel">
        <span className="line"></span>
        <p>Enjoy the smooth pastel transitions!</p>
      </div>

      <nav className="gsap-nav">
        <div><a href="#panel-1">Section one</a></div>
        <div><a href="#panel-2">Section two</a></div>
        <div><a href="#panel-3">Section three</a></div>
        <div><a href="#panel-4">Section four</a></div>
        <div><a href="#panel-5">Section five</a></div>
      </nav>
    </>
  );
}
