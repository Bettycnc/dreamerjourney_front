import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { JourneyService } from '../../journey.service';

@Component({
  selector: 'app-journey',
  imports: [CommonModule, FormsModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  country: string = '';
  precision: string = '';
  selectedDuration: string = '';
  adventure: boolean = false;
  nature: boolean = false;
  city: boolean = false;
  farniente: boolean = false;
  culture: boolean = false;
  wellBeing: boolean = false;
  hiking: boolean = false;
  gastronomy: boolean = false;
  experience: string[] = [];
  ParticipantCounter: number = 1
  budget: number = 0
  generatedJourneyText: string = ''; 
  showGeneratedJourney: boolean = false;

  constructor(private journeyService: JourneyService) {}

  incrementCounter() {
    if(this.ParticipantCounter < 10){
      this.ParticipantCounter = this.ParticipantCounter + 1
    }
  }

  decrementCounter() {
    if(this.ParticipantCounter > 0){
      this.ParticipantCounter = this.ParticipantCounter - 1
    }
  }

  onDurationChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDuration = selectElement.value;
  }

  addAdventure() {
    this.adventure = !this.adventure;
  }
  
  addNature() {
    this.nature = !this.nature;
  }
  
  addCity() {
    this.city = !this.city;
  }
  
  addFarniente() {
    this.farniente = !this.farniente;
  }
  
  addCulture() {
    this.culture = !this.culture;
  }
  
  addWellBeing() {
    this.wellBeing = !this.wellBeing;
  }
  
  addHiking() {
    this.hiking = !this.hiking;
  }
  
  addGastronomy() {
    this.gastronomy = !this.gastronomy;
  }

  CreateJourney() {
    this.experience = []; 

    if (this.adventure) this.experience.push('adventure');
    if (this.nature) this.experience.push('nature');
    if (this.city) this.experience.push('city');
    if (this.farniente) this.experience.push('farniente');
    if (this.culture) this.experience.push('culture');
    if (this.wellBeing) this.experience.push('wellBeing');
    if (this.hiking) this.experience.push('hiking');
    if (this.gastronomy) this.experience.push('gastronomy');

    this.journeyService.createJourney({
      country: this.country,
      experience: this.experience,
      duration: this.selectedDuration, 
      participant: this.ParticipantCounter,
      budget: this.budget,
      precision: this.precision }).subscribe({
        next: (response) => {
          this.generatedJourneyText = response.content; // <-- récupérer le texte ici
          this.showGeneratedJourney = true;
        },
        error: (error) => {
          console.error('Erreur lors de la génération du voyage', error);
          this.showGeneratedJourney = false;
        }
      });
  }
}
