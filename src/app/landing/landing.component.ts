

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FormsModule } from '@angular/forms';
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, LottieComponent,FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {

   formData = {
    name: '',
    email: '',
    message: ''
  };
  words: string[] = ['Unlimited', 'Fast', 'Instant'];
  currentWord: string = this.words[0];
  index: number = 0;

  constructor(private router: Router) {}

  title = 'company';

  // Lottie animation options
  lottieOptions: AnimationOptions = {
    path: 'assets/animation/trail-loading.json', 
    loop: true,
    autoplay: true,
  };

  ngOnInit(): void {
    // Hero word change
    setInterval(() => {
      const span = document.querySelector('span.text-blue-400') as HTMLElement;
      if (span) span.style.opacity = '0';
      setTimeout(() => {
        this.index = (this.index + 1) % this.words.length;
        this.currentWord = this.words[this.index];
        if (span) span.style.opacity = '1';
      }, 500);
    }, 2500);
  }

  ngAfterViewInit() {
    // Stats count-up
    const counters = document.querySelectorAll('.count');
    const options = { threshold: 0.5 };

    const startCount = (el: Element) => {
      const targetAttr = (el as HTMLElement).getAttribute('data-target') || '0';
      const target = targetAttr.includes('%') 
        ? parseInt(targetAttr.replace('%', '')) 
        : parseInt(targetAttr);
      let count = 0;
      const increment = Math.ceil(target / 300);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          (el as HTMLElement).textContent = count.toString();
          requestAnimationFrame(updateCount);
        } else {
          (el as HTMLElement).textContent = targetAttr.includes('%') ? target + '%' : target + '+';
        }
      };
      updateCount();
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, options);

    counters.forEach(counter => observer.observe(counter));

    // GSAP scroll animations for sections
 gsap.utils.toArray<HTMLElement>('.fade-up').forEach((section) => {
  gsap.fromTo(section,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        
            toggleActions: 'play reverse play reverse',

      },
    }
  );
});


    // Horizontal tech scroll (like Honor page)
    const scrollTracks = document.querySelectorAll('.scroll-track');
    scrollTracks.forEach(track => {
      const content = track.querySelector<HTMLElement>('.scroll-content');
      if (!content) return;

      const width = content.scrollWidth / 2; // because duplicate
      gsap.to(content, {
        x: -width,
        duration: 30,
        ease: 'linear',
        repeat: -1,
        toggleActions: 'play reverse play reverse',

      });
    });
  }

  toAbout() {
    this.router.navigate(['/about']);
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  sendEmail() {
    emailjs.init('pxInjNnyjCaO8IaiZ'); // ⬅️ Replace with your EmailJS Public Key

    emailjs.send('service_9a6idhg', 'template_jqoicce', this.formData)
      .then(() => {
        alert('✅ Email sent successfully!');
        this.formData = { name: '', email: '', message: '' }; // reset form
      })
      .catch((error: any) => {
        console.error('❌ Email error:', error);
        alert('❌ Failed to send email. Please try again.');
      });
  }
}
