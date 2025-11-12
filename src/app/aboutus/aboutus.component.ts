import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [AppComponent, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
 formData = {
    name: '',
    email: '',
    message: ''
  };

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
