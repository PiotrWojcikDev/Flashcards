import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';
import { SingleSetComponent } from 'src/app/components/single-set/single-set.component';
import { FormsModule } from '@angular/forms';
import { AddSetModalComponent } from 'src/app/components/modals/set/add-set-modal/add-set-modal.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-sets-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NavbarComponent,
    SingleSetComponent, 
    AddSetModalComponent,
  ],
  templateUrl: './sets-list.component.html',
  styleUrls: ['./sets-list.component.css'],
  providers: [SetService]
})
export class SetsListComponent implements OnInit{
  listOfSets: Array<any> = [];
  filteredSets: Array<any> = [];
  filterText: string = '';
  constructor(public setService: SetService) {
    const userId = localStorage.getItem('userId') || "";
    this.getAllSetsByUserId(userId);
  }
  ngOnInit(): void {
  }

  getAllSetsByUserId(userId: string) {
    this.setService.getAllSetsByUserId(userId)
      .subscribe({
        next: (res) => {
          this.listOfSets = res.sort(
            (a: { setName: string; }, b: { setName: string; }) => a.setName.localeCompare(b.setName)
          );
          this.filteredSets = [...this.listOfSets];
        },
        error: (err) => {
          console.error('Failed to load sets', err);
        }
      });
  }

  filterSets() {
    this.filteredSets = this.listOfSets.filter(set => 
      set.setName && set.setName.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  editSet() {
    // logika do edycji zestawu
  }
  
  
  addSet() {
    this.setService.showAddSetModal = true;
  }

  refreshList() {
    const userId = localStorage.getItem('userId') || "";
    this.getAllSetsByUserId(userId);  // Załóżmy, że "1" to ID użytkownika
  }
}
