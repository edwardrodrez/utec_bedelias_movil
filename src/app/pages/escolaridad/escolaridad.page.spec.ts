import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolaridadPage } from './escolaridad.page';

describe('EscolaridadPage', () => {
  let component: EscolaridadPage;
  let fixture: ComponentFixture<EscolaridadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolaridadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscolaridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
