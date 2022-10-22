import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesOverviewComponent } from './entries-overview.component';

describe('EntriesOverviewComponent', () => {
  let component: EntriesOverviewComponent;
  let fixture: ComponentFixture<EntriesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntriesOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
