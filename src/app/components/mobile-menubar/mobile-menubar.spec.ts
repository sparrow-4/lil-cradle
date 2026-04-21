import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenubar } from './mobile-menubar';

describe('MobileMenubar', () => {
  let component: MobileMenubar;
  let fixture: ComponentFixture<MobileMenubar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenubar],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileMenubar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
