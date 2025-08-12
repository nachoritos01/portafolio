import { Injectable, signal, computed } from '@angular/core';
import { PersonalInfo } from '../interfaces/personal-info.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private personalInfo = signal<PersonalInfo>({
    name: 'Ignacio Navarrete Dzul',
    title: 'Desarrollador Sr. Frontend | Especialista en Angular',
    email: 'ignacio_navarrete_dzul@outlook.com',
    phone: '(999) 902 3895',
    location: 'Mérida, Yucatán, México',
    profileImage: '/profile-2.jpeg',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/ignacionavarrete-front-end-developer-angular/',
      github: 'https://github.com/nachoritos01',
      twitter: 'https://x.com/ignacionavarrete',
      instagram: 'https://www.instagram.com/nachoritos'
    },
    workMode: 'Remoto | Híbrido',
    availability: 'Disponible inmediatamente',
    experience: '8+ años'
  });

  // Computed signals for easy access
  info = computed(() => this.personalInfo());
  name = computed(() => this.personalInfo().name);
  title = computed(() => this.personalInfo().title);
  email = computed(() => this.personalInfo().email);
  phone = computed(() => this.personalInfo().phone);
  location = computed(() => this.personalInfo().location);
  profileImage = computed(() => this.personalInfo().profileImage);
  socialMedia = computed(() => this.personalInfo().socialMedia);
  workMode = computed(() => this.personalInfo().workMode);
  availability = computed(() => this.personalInfo().availability);
  experience = computed(() => this.personalInfo().experience);

  // Method to update personal info if needed
  updatePersonalInfo(newInfo: Partial<PersonalInfo>) {
    this.personalInfo.update(current => ({ ...current, ...newInfo }));
  }
}