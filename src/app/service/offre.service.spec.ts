import { TestBed } from '@angular/core/testing';

import { OffreService } from './offre.service';
import { OffreComponent } from '../view/offre/offre.component';

describe('OffreService', () => {
  let service: OffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreService);
    declarations:[OffreComponent]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
