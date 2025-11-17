import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-serives',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './serives.component.html',
  styleUrl: './serives.component.css'
})
export class SerivesComponent {

  // ✅ Form data object for binding
  formData = {
    name: '',
    email: '',
    message: ''
  };
mobileMenuOpen = false;

  // ✅ Scroll to section method (your original one)
scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    // Scroll smoothly to the element
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.mobileMenuOpen= false;
    // Remove hash from URL without reloading
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}





  // ✅ Send Email using EmailJS
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

