import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarrerasPage } from './carreras.page';

describe('CarrerasPage', () => {
  let component: CarrerasPage;
  let fixture: ComponentFixture<CarrerasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrerasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
